import keytokenModel from "../models/keytoken.model";
import { Types } from "mongoose";

interface TokenParams {
  user: Types.ObjectId;
  publickey: string;
  refreshToken: string
}

class KeyTokenService {
  public static async createToken({ user, publickey, refreshToken }: TokenParams){
    try {
      const filter = {user: user}
      const update =  {publicKey: publickey, refreshTokenUsed: [], refreshToken}
      const options = {upsert: true, new: true}

      const tokens = await keytokenModel.findOneAndUpdate(filter,update,options)
      return tokens
    } catch (error) {
      console.log(error)
    }
  }
  public static async findById(userId: string){
    return await keytokenModel.findOne({user: new Types.ObjectId(userId)}).lean()
  }
  public static async removeKeyById(id: Types.ObjectId){
    return await keytokenModel.deleteOne(id)
  }
}

export default KeyTokenService