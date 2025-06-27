import shopModel from "../models/shop.model";
import { hash } from "bcrypt";
import { createPublicKey, generateKeyPairSync, KeyObject } from "crypto";
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "../utils/authUtils";
import GetInfoData from "../utils/getInfo";
import { BadRequestError } from "../helpers/error.response";

const RoleShop = {
  SHOP: "001",
  WRITE: "002",
  EDITOR: "003",
  ADMIN: "004",
};

/// Nen bo sung Transaction

class AccessService {
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

      const publicKeyString = await KeyTokenService.createToken({
        user: newShop._id,
        publickey: publicKey,
      });
      if (!publicKeyString) {
        throw new BadRequestError("Publickey Error!");
      }
      const publicKeyObject = createPublicKey(publicKeyString);
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKeyObject,
        privateKey
      );
      return {
        shop: GetInfoData.getFromFields(["_id", "name", "email"], newShop),
        tokens,
      };
    }
  }
}

export default AccessService;
