import xpress from 'express'
import dotenv from 'dotenv'
import { knex } from './config/db';
import bodyParser from 'body-parser'
import validateToken from './lib/validateToken';
import moment from 'moment';
import ac from './controller/authCtrl';
import uc from './controller/usersCtrl';
import gc from './controller/giftsCtrl';
import rdc from './controller/redeemsCtrl';
import rvc from './controller/reviewsCtrl';

let app = xpress()
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', async(req, res)=>{
  try{
    let users = await knex('users');
    console.log({knex, users});
  }catch(error){
    console.log({error});
    
  }
  // res.json(users)
})

app.use('/auth', ac)

app.use('/api/v1/', validateToken)

app.use('/api/v1/user', uc)
app.use('/api/v1/gift', gc)
app.use('/api/v1/redeem', rdc)
app.use('/api/v1/review', rvc)
// connectDb().then(async () => {
    app.listen(process.env.PORT, '127.0.0.1', () =>
      console.log(`Server connet on port ${process.env.PORT}`),
    );
// });