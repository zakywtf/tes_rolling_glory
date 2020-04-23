import { Router } from 'express'
import handleRequest from '../lib/ctrlHandler'

function controller(model) {
    let router = Router();
    router.get('/', async(req,res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            return await model.getAll(body)
        })
    })
    
    router.get('/detail/:id', async(req, res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            return await model.getById(req.params.id)
        })
    })
    
    router.post('/',async(req, res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            await model.insert(body)
            return true
        })
    })
    
    router.post('/update/:id',async(req, res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            await model.update({id: req.params.id}, model.convertParam(body))
            return true
        })
    })

    router.post('/delete/:id',async(req, res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            await model.delete({id: req.params.id}, model.convertParamDeleted(body))
            return true
        })
    })
    
    router.get('/paging/:page/:perPage',async(req,res)=>{
        handleRequest(req, res, async (body)=>{
            model.setUdata(res.locals && res.locals.udata)
            // return await model.paging(req.params.limit, req.params.offset, body.filter, body.order)
            const {page, perPage}=req.params;
            return await model.paging(perPage, (((page-1) * perPage)), {}, {createdAt:-1});
        })
    })

    return router;
}

module.exports = {
    controller:controller
}