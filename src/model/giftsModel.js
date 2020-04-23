import cmd from '../classes/classModel';
import redeemModel from './redeemsModel';
import moment from 'moment';

const REDEEM = new redeemModel()

class giftsModel extends cmd {
    constructor(){
        super('gifts')
        this.level = 1
        this.udata
    }

    async insert(obj){
        if(this.udata.level == this.level){
            obj.created_by = this.udata.id
            obj.created_at = moment().format('YYYY-MM-DD')
            await this.tableConn.insert(obj)
            return true
            // console.log({obj:obj.created_at});
            
        }else{
            throw new Error('User has no privileges to add/edit this data!')
        }
    }

    async redeem(obj, id){
        var gData = await this.getById(id)
        console.log({gData});
        if(gData[0].stock > 0){
            var stck = gData[0].stock - obj.amount
            await this.reStock({id:id}, {stock:stck})
            var rData = this.projection(id, obj.amount, this.udata)
            await REDEEM.insert(rData)

            return true
        }else{
            throw new Error('Sold out!')
        }
    }

    async reStock(where, update){
        return await this.tableConn.where(where).update(update);
    }

    projection(giftId, amount, udata){        
        var x = {
            'gift_id':giftId,
            'user_id':udata.id,
            'amount':amount,
            'created_at':moment().format('YYYY-MM-DD')
        }

        return x
    }

}

module.exports=giftsModel