import cmd from '../classes/classModel';
import moment from 'moment';

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
            throw new Error('This level cannot create data!')
        }
    }

}

module.exports=giftsModel