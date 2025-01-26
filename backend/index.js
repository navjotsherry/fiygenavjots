import express from 'express'
import {PrismaClient} from '@prisma/client'
import {ErrorHandlerMid} from './middleware/ErrorHandlerMid.js'
import formBuilderRoutes from './routers/formBuilderRoutes.js'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'


// Handling Uncaught Exception
process.on("uncaughtException",()=>{
  console.log("Closing the Server due to Uncaught Exception")
  process.exit(1)
})


export const prisma = new PrismaClient();
const app = express();

app.use(cors({
    origin: '*', // Frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Include cookies if needed
  }
));

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//API Routes
app.use('/api',formBuilderRoutes)
app.use('',userRouter)
app.use(ErrorHandlerMid)

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Unhandled Promise Rejection Error Handler 
process.on('unhandledRejection', err =>{
  console.log(err.message)
  console.log("Shutting down the server due to Unhandled Promise rejection")
  server.close(()=>{
      process.exit(1)
  })
})