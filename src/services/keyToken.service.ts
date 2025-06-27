import keytokenModel from "../models/keytoken.model";
import { Types } from "mongoose";

interface TokenParams {
  user: Types.ObjectId;
  publickey: string;
}

class KeyTokenService {
  public static async createToken({ user, publickey }: TokenParams){
    try {
      const publicKeyString = publickey.toString();
      const tokens = await keytokenModel.create({
        user: user,
        publicKey: publicKeyString,
      });
      return tokens ? tokens.publicKey : null
    } catch (error) {
      console.log(error)
    }
  }
}

export default KeyTokenService