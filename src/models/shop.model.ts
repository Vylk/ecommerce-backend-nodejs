import { Schema, model} from "mongoose";


// Declare the Schema of the Mongo model
const DOCUMENT_NAME = `Shop`
const COLLECTION_NAME = `Shops`

var shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required:true,
        index:true,
    },
    email:{
        type:String,
        trim: true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: [
            'active',
            'inactive'
        ],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
},
{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
export default model(DOCUMENT_NAME, shopSchema)