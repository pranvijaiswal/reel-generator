import mongoose, { Schema ,model,models} from "mongoose";

export const vidimension ={
    width : 1080,
    height : 1920,
} as const


export interface Ivideo {
    _id? : mongoose.Types.ObjectId;
    title:String;
    description : string;
    vidurl : string;
    thumbnailurl: string;
    controls? : boolean
    transformation?: {
        height : number;
        width : number;
        quality?: number
    }
}

const vidschema = new Schema<Ivideo>(
    {
        title :{type : String , required : true},
        description :{type : String , required : true},
        vidurl :{type : String , required : true},
       thumbnailurl :{type : String , required : true},
        controls :{type : Boolean , required : true},
        transformation :{
       height :{type : Number , default : vidimension.height},
        width :{type : Number , default : vidimension.width},
       quality :{type : Number , min: 1, max : 100}
        
        }

    }, { timestamps : true}
)

const Video = models?.Video || model<Ivideo>("Video", vidschema)
export default Video;
