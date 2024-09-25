import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.Schema.js";

export const Auth = async (req,res,next) =>{
    const token = req.cookies.adminToken;
    console.log("token" , token)
    if(!token){
        return res.status(400).json({sucess:false , message :'Not authenciated Admin'} )
    }

   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 
     // Find the admin in the database
     const admin = await Admin.findById(decoded.admin.id).select('-password');
 
     if (!admin) {
         return res.status(400).json({ success: false, message: 'Token not verified' });
     }
     delete admin.password
      res.status(200).json({ success: true , admin });
      next ;
   } catch (error) {
    
    return res.status(400).json({ success:false , message : error.name})
   }

}