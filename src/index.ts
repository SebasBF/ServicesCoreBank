import express from 'express';
import cors from 'cors';
import {  
    createUserRouter, 
    createClientRouter,
    createAccountRouter,
    createTransactionRouter,
    createLoansRouter,
    createTransferRouter
} 
from './routes/routes';
import { createServer } from 'node:http';
import { UserModel } from './models/user';
import { ClientModel } from './models/client';
import { AccountModel } from './models/account';
import { TransactionModel } from './models/transactions';
import { LoansModel } from './models/loans';
import { TransferModel } from './models/transfers';



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
const transactionModel = new TransactionModel()
const loansModel = new LoansModel()
const transferModel = new TransferModel()

const userRouter = createUserRouter({ userModel: userModel });
const clientRouter = createClientRouter({ clientModel: clientModel });
const accountRouter = createAccountRouter({ accountModel: accountModel });
const transactionRouter = createTransactionRouter({ transactionModel: transactionModel });
const loansRouter = createLoansRouter({ loansModel: loansModel });
const transferRouter = createTransferRouter({ transferModel: transferModel });

app.use(express.json())
app.disable('x-powered-by');

app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/account', accountRouter);
app.use('/transactions', transactionRouter);
app.use('/loans', loansRouter);
app.use('/transfer', transferRouter);

server.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`)
})