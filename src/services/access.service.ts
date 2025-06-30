import shopModel from "../models/shop.model";
import { hash, compare } from "bcrypt";
import { generateKeyPairSync } from "crypto";
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "../utils/authUtils";
import GetInfoData from "../utils/getInfo";
import { AuthFailureError, BadRequestError } from "../helpers/error.response";
import ShopService from "./shop.service";
import keytokenModel from "../models/keytoken.model";

const RoleShop = {
  SHOP: "001",
  WRITE: "002",
  EDITOR: "003",
  ADMIN: "004",
};

/// Nen bo sung Transaction

class AccessService {
  public static async login(
    email: string,
    password: string
  ) {
    const findShop = await ShopService.findByEmail(email);
    if (!findShop) throw new BadRequestError("Shop is not registered");

    const comparePassword = await compare(password, findShop.password);
    if (!comparePassword) throw new AuthFailureError(`Authentication error`);

    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });

    
    // const publicKeyObject = createPublicKey(publicKeyString);
    const tokens = await createTokenPair(
      { userId: findShop._id, email },
      publicKey,
      privateKey
    );
    if(!tokens) throw new BadRequestError('Error')
    await KeyTokenService.createToken({
      user: findShop._id,
      publickey: publicKey,
      refreshToken: tokens.refreshToken
    });
    return {
      shop: GetInfoData.getFromFields(["_id", "name", "email"], findShop),
      tokens
    }

  }

  public static async signUp(name: string, email: string, password: string) {
    const holdelShop = await shopModel.findOne({ email }).lean();
    if (holdelShop) {
      throw new BadRequestError("Error shop already registered!");
    }
    const passwordHash = await hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });
    if (newShop) {
      const { publicKey, privateKey } = generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
      
      // const publicKeyObject = createPublicKey(publicKeyString);
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      if(!tokens) throw new BadRequestError('Error')

      await KeyTokenService.createToken({
        user: newShop._id,
        publickey: publicKey,
        refreshToken: tokens.refreshToken
      });
      return {
        shop: GetInfoData.getFromFields(["_id", "name", "email"], newShop),
        tokens,
      };
    }
  }
  public static async logout(keyStore: any) {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id)
    console.log(delKey)
    return delKey
  }
}

export default AccessService;
