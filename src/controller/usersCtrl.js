import {controller} from '../classes/classController';
import m from '../model/usersModel'
import handleRequest from '../lib/ctrlHandler';

let model = new m()
let rtr = controller(model)

rtr.post('/signup',(req,res)=>{
    handleRequest(req, res, async (body)=>{
        return await model.signup(body)
    });
})

module.exports = rtr