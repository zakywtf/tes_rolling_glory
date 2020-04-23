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
}

module.exports=reviewsModel