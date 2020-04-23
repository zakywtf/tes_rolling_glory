import cmd from '../classes/classModel';

class reviewsModel extends cmd {
    constructor(){
        super('reviews')
    }

    async checkRating(giftId, userId){
        return await this.tableConn.where({gift_id:giftId}).andWhere({user_id:userId})
    }

    async updateRating(giftId, userId, obj){
        return await this.tableConn.where({gift_id:giftId}).andWhere({user_id:userId}).update({rating:obj.rating, review:obj.review})
    }

    async getRating(giftId){
        var x = await this.tableConn.where({gift_id:giftId})
        console.log({giftId,x});
        
        return await this.totalRating(x)
    }

    async totalRating(datas){
        var tRating=0
        for (let i = 0; i < datas.length; i++) {
            var e = datas[i];
            tRating += e.rating
        }
        console.log({tRating});
        
        var x = {
            "rating":tRating/datas.length || 0,
            "reviews":datas.length
        }

        return x
    }
}

module.exports=reviewsModel