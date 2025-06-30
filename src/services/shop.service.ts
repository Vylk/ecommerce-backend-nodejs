import shopModel from "../models/shop.model";

class ShopService {
    public static async findByEmail (email: string, selected = {email: 1, password: 1, name: 1, status: 1, roles: 1}){
            return await shopModel.findOne({email}).select(selected).lean()
    }
}

export default ShopService