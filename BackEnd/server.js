import express from "express"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
const app = express();
const PORT=4000||process.env.PORT

connectDB()
app.get("/", async (req, res) => {
   res.send("API working")
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
