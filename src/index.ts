import express from 'express';
import cors from 'cors';
import {  
    createUserRouter, 
    createClientRouter,
    createAccountRouter
} from './routes/routes';
import { createServer } from 'node:http';
import { UserModel } from './models/user';
import { ClientModel } from './models/client';
import { AccountModel } from './models/account';



const app = express();
const server = createServer(app)

const PORT = process.env.PORT ?? 4000

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

const userModel = new UserModel();
const clientModel = new ClientModel()
const accountModel = new AccountModel()

const userRouter = createUserRouter({ userModel: userModel });
const clientRouter = createClientRouter({ clientModel: clientModel });
const accountRouter = createAccountRouter({ accountModel: accountModel });

app.use(express.json())
app.disable('x-powered-by');

app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/account', accountRouter);

server.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`)
})