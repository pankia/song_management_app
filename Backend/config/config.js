import dotenv from "dotenv";
dotenv.config();


const config = {
    port: process.env.PORT || 3000, 
    mongodbURI: process.env.MONGODB_URI,
};

export default config