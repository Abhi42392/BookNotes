import mongoose from 'mongoose'

const notesSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
    notes:{type:String,default:""},
    lastRead:{type:Number,default:Date.now},
    ebook:{type:Array,default:[]},
})

const notesModel=mongoose.models.notes||mongoose.model('notes',notesSchema);

export default notesModel