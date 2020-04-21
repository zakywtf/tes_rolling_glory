import {Router} from 'express';
import {signer} from '../lib/signer';
import handleRequest from '../lib/ctrlHandler';

let router = Router()
const model = new signer()

router.post('/login', async(req, res)=>{
    handleRequest(req, res, async(body)=>{
        return await model.sign(body)
    })
})

router.post('/signup', async(req, res)=>{
    handleRequest(req, res, async(body)=>{
        return await model.signup(body)
    })
})

module.exports=router