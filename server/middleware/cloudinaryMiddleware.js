const cloudinary = require('../config/cloudinary.config');

const uploadToCloudinary = (folder = "blogs")=>{
    return async (req,res,next) =>{
        try{
            
            const imageData = req.file;
            // console.log("cloudinary : ",imageData);
            if(!imageData) return next();
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder:folder,
                    resource_type:'image',
                },
                (error,result)=>{
                    if(error){
                        console.log("upload error : ",error);
                        return res.status(500).json({message: "cloudinary upload failed"});
                    }

                    req.cloudinaryImage = {
                        url: result.secure_url,
                        public_id: result.public_id,
                    };

                    next();
                }
            );
            upload.end(imageData.buffer);
        }catch(err){
            res.status(500).json({ message: "Image upload failed" });
        }
    }
}

module.exports = uploadToCloudinary;