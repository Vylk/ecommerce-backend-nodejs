import {Schema, model} from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = `Key`
const COLLECTION_NAME = `Keys`

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true,
        unique:true,
    },
    refreshTokensUsed:{
        type:Array,
        default: []
    },
    refreshToken: {
        type: String,
        require: true
    }
    
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema);