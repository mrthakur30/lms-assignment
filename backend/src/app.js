import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./utils/errorHandler.js";
import bookRoutes from "./routes/bookRoutes.js"
import membershipRoutes from "./routes/membershipRoutes.js"
import transactionRoutes from "./routes/tansactionRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "API is running"
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler);

export { app }