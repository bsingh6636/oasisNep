import { Updates, WhatsNewVideo } from "../models/WhatsNewVideo.schema.js";
import { asyncErrorHandler } from "../utils/asynchandler.js";

export const whatsNewVideo = asyncErrorHandler( async(req,res) =>{
    const {Name , Platform , TrailerLink } = req.body;
    if(!Name ||!Platform ||!TrailerLink){
        return res.status(400).json({sucess:true , message : "ALl fields required"})
    }
   try {
     const item = await WhatsNewVideo.findOneAndUpdate(
         {Name},
         {Name , Platform , TrailerLink},
         {new:true , upsert : true}
     )
     res.status(200).json({ success: true, item , messagge:"Item updated sucessfully" });
   } catch (error) {
     return res.status(400).json({sucess:false , error})
   }
})

export const deleteVideoByName = asyncErrorHandler( async ( req, res) =>{
    const { Name } = req.body ; 
    if(!Name){
        return res.status(400).json({ success: false, message: 'Name is required' });
    }
  try {
      const result = await WhatsNewVideo.findOneAndDelete({Name})
      if(!result){
          return res.status(400).json({ success: false, message: 'Item not found' });
      }
      res.status(200).json({ success: true, message: 'Item deleted successfully' })
  } catch (error) {
    return res.status(400).json({sucess:false , error})
  }
})

export const viewAllWhatsNewVideo = asyncErrorHandler ( async ( req , res) =>{
    try {
        const items = await WhatsNewVideo.find({})
      return  res.status(200).json({success : true , items})
    } catch (error) {
        return res.status(400).json({success:false , error})
    }
})

export const viewAllUpdates = asyncErrorHandler( async (req , res ,next)=>{
  try {
    const items = await Updates.find({})
    return res.status(200).json({sucess:true ,data:items})
  } catch (err) {
    return res.status(400).json({success:false , err , message:'failed to fetch updates'})
  }
})

export const AddNewUpdates = asyncErrorHandler(async (req, res) => {
  const { Title, Description, ImageUrl } = req.body;  // Corrected 'Descsitption' to 'Description'
  
  // Check for missing description
  if (!Description) {
    return res.status(400).json({ success: false, message: "Description missing" });  // Corrected 'sucess' to 'success' and 'messagge' to 'message'
  }
  
  try {
    const item = await Updates.Create({ Title, Description, ImageUrl });
    res.status(200).json({ success: true, item, message: "Item updated successfully" });  // Corrected 'messagge' to 'message'
  } catch (error) {
    return res.status(400).json({ success: false, error });  // Corrected 'sucess' to 'success'
  }
});





