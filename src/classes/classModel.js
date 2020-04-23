import db from '../config/db';

class model 
{
    constructor(table)
    {
        this.db = db;
        this.table = table;
        this.tableConn=this.db(this.table)
        // this.udata=false
        // this.createTable
    }

    getConn(tableName){
        return this.db(tableName)
    }

    setUdata(udata){
        this.udata=udata.payload;
    }

    async createSchemaTable(){
        return true
    }

    async getAll(obj)
    {
        const {limit, offset, filter, sort}= obj
        let x = this.paging(limit, offset, filter, sort);
        return await x
    }

    async getById(id){
        let x = this.db(this.table).where({'id':id });
        this.processSelectPaging(x)
        return await x
    }
    
    async insert(data){
        // this.cekLeveAccess()
        return await this.doInsert(data)
    }
    
    async doInsert(data)
    {
        let obj = await this.db(this.table).insert(data);
        return obj;
    }

    async update(where, update){
        // this.cekLeveAccess()
        return this.doUpdate(where, update)
    }
    
    async doUpdate(where, update){
        return await this.db(this.table).where(where).update(update);
    }

    processSelectPaging(instance){
        
    }

    cekLevelAccess(){
        if(this.udata.level == this.adminLevel) throw new Error('User has no privileges to add/edit this data');        
    }

    convParams(body){
        return body;
    }

    async paging(limit=0, offset=0, filter=false, order=false){
        let x = this.db(this.table).limit(parseInt(limit)).offset(parseInt(offset))  
        // this.processSelectPaging(x)      
        if(filter)x.where(filter)
        if(order)x.orderBy(order)

        return await x
    }

}

module.exports = model;
