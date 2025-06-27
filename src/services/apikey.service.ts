import apikeyModel from "../models/apikey.model";

class ApiKey {
    public static async findById(key: string){
        const objKey = await apikeyModel.findOne({key, status: true}).lean()
        return objKey
    }
}
export default ApiKey