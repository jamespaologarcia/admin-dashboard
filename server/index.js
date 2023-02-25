import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


//Data imports

import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from './models/AffiliateStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat,dataAffiliateStat } from "./data/index.js";

/*Config*/


dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
//To make API calls from another server
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//Routes
//Represents routes for the pages which make up the modules of the application. 
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


//Mongoose setup
//process.env allows us to access our variables in the .env file. 
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
    //Data MigrationOnly add data one time
   // User.insertMany(dataUser);
   //Product.insertMany(dataProduct);
   //ProductStat.insertMany(dataProductStat);
   //Transaction.insertMany(dataTransaction);
  // OverallStat.insertMany(dataOverallStat);
  //AffiliateStat.insertMany(dataAffiliateStat);
}).catch((error => console.log(`${error} Did not connect`)));