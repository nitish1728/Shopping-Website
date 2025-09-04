const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        favourites:[
            {
                    type:Schema.Types.ObjectId, ref:"Product"
            }
        ],
        cart:[
            {
                product:{
                    type:Schema.Types.ObjectId,ref:"Product"
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],

        orders:[
            {
                orderid:{
                    type:String,
                    required:true
                },
                products:[
                    {
                        product:{
                            type:Schema.Types.ObjectId,ref:"Product"
                        },
                        quantity:{
                            type:Number,
                            default:1
                        }
                    }
                ],
                totalNumber:Number,
                status:{type:String,default:"Pending"},
                createdAt:{type:Date,default:Date.now}
            }
        ]
    }
)

module.exports=mongoose.model("User",userSchema)