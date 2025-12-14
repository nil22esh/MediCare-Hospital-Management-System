import app from "./app.js";
import cloudinary from "./configs/cloudinary.js";
import mongoConnection from "./configs/mongoDB.js";

const port = process.env.PORT || 3000;
const env = process.env.ENV || "development";

// database connection
mongoConnection();
// connect to cloudinary
cloudinary;

app.listen(port, () => {
  console.log(`${env} Server is running on port ${port}`);
});
