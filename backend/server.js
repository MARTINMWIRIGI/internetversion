import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello from backend!")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
import submissionsRouter from "./routes/submissions.js"

app.use("/submissions", submissionsRouter)