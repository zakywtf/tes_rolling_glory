import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import model from '../classes/classModel'
import {createSession} from '../lib/sessionHandler';
import db from '../config/db';

class signer extends model {
    constructor(){
        super("users")
    }

    async sign(body){
        let user = await this.checkUser(body)
        console.log({body, user});
        
        if(user){
            let payload = await this.createPayload(user)
            console.log({payload});
            
            if(bcrypt.compareSync(body.password+body.username+process.env.SALT, user.password)) {
                var token = await this.createToken(payload)
                return await createSession(token)
            }else{
                throw new Error('Wrong password!')
            }
        }else{
            throw new Error('User not found!')
        }
    }

    async signup(body){
        // let user = await this.checkUser(body)
        // console.log({user});
        
        body.password = bcrypt.hashSync(body.password+body.username+process.env.SALT, 10)
        body.level = '2'
        await this.tableConn.insert(body)
        return true
    }

    async createToken(payload){
        return new Promise((resolve,rej)=>{
            jwt.sign({ payload }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h'}, function(err, token) {
                if (err) {
                    rej(err)
                }
                else { 
                    resolve(token)
                 }
            })   
        })
    }

    async checkUser(body){
        // var user = await this.tableConn.where({username:body.username})
        var user = await db('users').where({username:body.username})
        console.log({user});
        
        return user[0]
    }

    async createPayload(user){
        return {
            id:user.id, 
            username:user.username,
            firstName:user.first_name,
            lastName:user.last_name,
            address:user.address,
            telp:user.telp,
            level:user.level,
            email:user.email
        }
    }

}

module.exports={
    signer
}