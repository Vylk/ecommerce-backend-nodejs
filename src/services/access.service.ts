import shopModel from "../models/shop.model";
import { hash } from "bcrypt";
import { createPublicKey, generateKeyPairSync, KeyObject } from "crypto";
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "../utils/authUtils";
import GetInfoData  from "../utils/getInfo";

const RoleShop = {
  SHOP: "001",
  WRITE: "002",
  EDITOR: "003",
  ADMIN: "004",
};


/// Nen bo sung Transaction

class AccessService {
  public static async signUp(name: string, email: string, password: string) {
    try {
      const holdelShop = await shopModel.findOne({ email }).lean();
      if (holdelShop) {
        return {
          code: "xxx",
          message: "Shop already registered",
        };
      }
      const passwordHash = await hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // Create private and public key
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding : {
            type: 'pkcs1',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          }
        });

        const publicKeyString = await KeyTokenService.createToken({user: newShop._id, publickey: publicKey})
        if(!publicKeyString){
            return {
                code: 'xxx',
                message: 'publicKey error'
            }
        }
        const publicKeyObject = createPublicKey(publicKeyString)
        const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyObject, privateKey)
        return {
            code: 201,
            metadata : {
                shop: GetInfoData.getFromFields(['_id','name','email'],newShop),
                tokens
            }
          }
      }
      
    } catch (error) {
      console.log(error);
      return {
        code: "xxx",
        message: error,
        status: "error",
      };
    }
  }
}

export default AccessService;
