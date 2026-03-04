import express from 'express'; 

import homeRouter from './routes/homeRouter.js';
const app = express();

app.use(homeRouter);

app.listen(3000);