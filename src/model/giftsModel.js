import cmd from '../classes/classModel';
import redeemModel from './redeemsModel';
import reviewModel from './reviewsModel';
import moment from 'moment';

const REDEEM = new redeemModel()
const RATING = new reviewModel()

class giftsModel extends cmd {
    constructor(){
        super('gifts')
        this.level = 1
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
            var rData = this.redeemProjection(id, obj.amount, this.udata)
            await REDEEM.insert(rData)

            return true
        }else{
            throw new Error('Sold out!')
        }
    }

    async reStock(where, update){
        return await this.tableConn.where(where).update(update);
    }

    redeemProjection(giftId, amount, udata){        
        var x = {
            'gift_id':giftId,
            'user_id':udata.id,
            'amount':amount,
            'created_at':moment().format('YYYY-MM-DD')
        }

        return x
    }

    async rating(obj, id){
        var cRating = await RATING.checkRating(id, this.udata.id)
        var rtData = this.ratingProjection(obj, id, this.udata)
        console.log({cRating});
        if(cRating.length == 0){
            await RATING.insert(rtData)
            return true
        }else{
            await RATING.updateRating(id, this.udata.id, obj)
            return true
        }
    }

    ratingProjection(obj, id, udata){
        var x = {
            'user_id':udata.id,
            'gift_id':id,
            'rating':obj.rating,
            'review':obj.review,
            'created_at':moment().format('YYYY-MM-DD')
        }

        return x
    }


}

module.exports=giftsModel