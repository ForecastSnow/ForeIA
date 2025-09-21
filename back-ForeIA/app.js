import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { iaController } from "./src/controllers/iaController.js";
import { connectDataBase } from "./src/config/mongoDB/dbConnect.js"
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { userController } from "./src/controllers/userController.js";
import { loginController } from "./src/controllers/loginController.js";
import { chatController } from "./src/controllers/chatController.js";

connectDataBase();

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/", userController);

app.use("/api/", loginController);

app.use("/api/", iaController);

app.use("/api/", chatController);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening`)
})