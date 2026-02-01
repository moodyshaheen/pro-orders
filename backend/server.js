import express from "express" // importing express framework for building server
import cors from "cors" // importing cors to handle cross-origin requests because frontend and backend are on different ports
import { connectDb } from "./config/db.js" // importing database connection function because we need to connect to database
import proRouter from "./routes/routePro.js"
import userRouter from "./routes/routeUser.js"
import 'dotenv/config' // importing dotenv config file because we are using env variables
import cartRoute from "./routes/routeCart.js"
import orderRoute from "./routes/routeOrder.js"
import { seedDatabase } from "./seedData.js"



// app config
const app = express()
const port = 4000


// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDb()

// Seed database with sample data (only if DB is connected)
setTimeout(() => {
    // Give DB time to connect before seeding
    seedDatabase()
}, 2000)

// api endpoints
app.use("/api/product", proRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ModernStore API Working - Updated Version",
        version: "2.0.0",
        timestamp: new Date().toISOString()
    });
})


app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
})
//mongodb+srv://moshaheen616_db_user:741456@cluster0.fexkcly.mongodb.net/?
