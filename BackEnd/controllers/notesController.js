import notesModel from '../models/notesModel.js'
import axios from 'axios'
import { exec } from "child_process"
import fs from "fs"
import userModel from '../models/userModel.js'

const addNotes=async(req,res)=>{
    const{title,author,userId}=req.body;
    try{
        if(!title||!author){
            return res.json({success:false,message:"Insufficient information"})
        }
        const book=await notesModel.find({title:title,author:author});
        if(book.length>0){
            return res.json({success:false,message:"Book already exists"})
        }
        const bookInfo=await axios.get(`https://openlibrary.org/search.json?title=${title}&author=${author}`)
        if(!bookInfo.data||bookInfo.data.docs.length==0){
            return res.json({success:false,message:"Enter title and author name clearly"})
        }
        const cover_i=bookInfo.data.docs[0].cover_i;
        let bookCover='';
        if(cover_i){
            bookCover=`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
        }else{
            bookCover=`https://dummyimage.com/600x600/2C3E50/fff&text=${title}`
        }
        const newNotes=await notesModel.insertOne({title,author,userId,image:bookCover});
        await newNotes.save();
        return res.json({success:true,message:"Book added"})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:"Something went wrong"})
    }
}

const allNotes=async(req,res)=>{
    const{userId}=req.body;
    try{
        const notesData=await notesModel.find({userId});
        return res.json({success:true,message:notesData});
    }catch(err){
        console.log(err);
        return res.json({success:false,message:"Something went wrong"})
    }
}

const saveNotes=async(req,res)=>{
    const{id,notes}=req.body;
    try{
        const date=Date.now();
        const note=await notesModel.findByIdAndUpdate(id,{notes,lastRead:date});
        return res.json({success:true,message:note});
    }catch(err){
        console.log(err)
        return res.json({success:false,message:"failed update notes"});
    }
}

const getNotes=async(req,res)=>{
    const{id}=req.body;
    try{
        const notes=await notesModel.findById(id);
        return res.json({success:true,message:notes});
    }catch(err){
        return res.json({success:false,message:"failed update notes"});
    }
    }

    const uploadEbook=async(req,res)=> {
        try {
            const id=req.body.id;
            const pdfPath = req.file.path;
            
            exec(`python python/HighlightExtract.py "${pdfPath}"`, async (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    return res.status(500).json({ error: "Failed to extract highlights" });
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return res.status(500).json({ error: "Python script error" });
                }
        
                let highlights;
                try {
                    highlights = JSON.parse(stdout);
                } catch (parseError) {
                    console.error("JSON Parsing Error:", parseError.message);
                    return res.status(500).json({ error: "Invalid JSON output from Python script" });
                }
        
                // Save highlights to JSON file asynchronously
                fs.writeFile("highlights.json", JSON.stringify(highlights, null, 4), (err) => {
                    if (err) console.error("File Write Error:", err);
                });
        
                try {
                    await notesModel.findByIdAndUpdate(id, { ebook: highlights });
                    res.json({ success: true, message: "E-Book added successfully" });
                } catch (dbError) {
                    console.error("Database Update Error:", dbError.message);
                    res.status(500).json({ error: "Failed to update database" });
                }
            });
            
        } catch (err) {
            console.error("Error:", err);
            return res.json({ success: false, message: "Failed to extract notes" });
        }
    }

export {addNotes,allNotes,saveNotes,getNotes,uploadEbook}