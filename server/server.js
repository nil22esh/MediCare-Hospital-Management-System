import app from "./app.js";
import cloudinary from "./configs/cloudinary.js";
import mongoConnection from "./configs/mongoDB.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 3000;
const env = process.env.ENV || "development";

// database connection
mongoConnection();
// connect to cloudinary
cloudinary;

app.listen(port, () => {
  logger.info(`${env} Server is running on port ${port}`);
});
