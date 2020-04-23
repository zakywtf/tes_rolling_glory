import {controller} from '../classes/classController';
import m from '../model/giftsModel'
import handleRequest from '../lib/ctrlHandler';

let model = new m()
let rtr = controller(model)

rtr.post('/:id/redeem',(req,res)=>{
    handleRequest(req, res, async (body)=>{
        model.setUdata(res.locals && res.locals.udata)
        const{id} =req.params
        return await model.redeem(body, id)
    });
})

module.exports = rtr