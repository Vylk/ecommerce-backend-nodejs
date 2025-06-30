import jwt from "jsonwebtoken";
import { asyncHandlerError } from "../helpers/async_handler_error";
import { Request, Response, NextFunction } from "express";
import { AuthFailureError, NotFoundError } from "../helpers/error.response";
import KeyTokenService from "../services/keyToken.service";

const createTokenPair = async (
  payload: any,
  publicKey: string,
  privateKey: string
) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    // const accessToken = await V4.sign(payload,privateKey, {
    //     expiresIn: '2 days'
    // })
    // const refreshToken = await V4.sign(payload, privateKey, {
    //     expiresIn: '7 days'
    // })
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("error verify", err);
      } else {
        console.log("Decode", decode);
      }
    });
    // const decode = await V4.verify(accessToken, publicKey)
    // if(decode){
    //     console.log('Decode', decode)
    // }
    // console.log(accessToken)
    return { accessToken, refreshToken };
  } catch (error) {}
};

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const authentication = asyncHandlerError(
  async (req: Request, res: Response, next: Function) => {
    const userId = req.headers[HEADER.CLIENT_ID]?.toString();
    if (!userId) throw new AuthFailureError("Invalid Request");

    const keyStore = await KeyTokenService.findById(userId);
    if (!keyStore) throw new NotFoundError("Not Found keyStore");
    // console.log(`KeyStore`,keyStore)
    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    // console.log(`AccessToken`,accessToken)
    if (!accessToken) throw new AuthFailureError("Invalid Request");

    try{
        const decodeUser = jwt.verify(accessToken, keyStore.publicKey)
        if(typeof decodeUser === 'object' && decodeUser != null && 'userId' in decodeUser){
            if(userId != decodeUser.userId) throw new AuthFailureError('Invalid UserId')
            req.keyStore = keyStore
            next()
        }
    } catch(err){
        throw err
    }
  }
);
export { createTokenPair,authentication };
