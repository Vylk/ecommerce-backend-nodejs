import mongoose from "mongoose";


class MongoDB{
    private url: string;
    private static instance: MongoDB;
    private constructor(url: string) {
        this.url = url
    }
    
    public static async connect(url: string): Promise<MongoDB>{
        if(!MongoDB.instance){
            MongoDB.instance = new MongoDB(url)
            await mongoose.connect(url)
            console.log("MongoDb connected")
            
        }
        return MongoDB.instance
    }

    public static async disconnect(): Promise<void>{
        await mongoose.disconnect()
        console.log("MongoDB closed")
    }
}

export default MongoDB