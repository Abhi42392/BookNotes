import express from "express"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import connectCloudinary from "./config/cluodinary.js";
import notesRouter from "./routes/notesRouter.js";
const app = express();
const PORT=4000||process.env.PORT

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use("/api/user",userRouter);
app.use("/api/notes",notesRouter)

app.get("/", async (req, res) => {
   res.send("API working")
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
