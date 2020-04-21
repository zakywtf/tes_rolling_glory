import bcrypt from 'bcryptjs';
import cmd from '../classes/classModel';

class usersModel extends cmd {
    constructor(){
        super('users')
    }

}

module.exports=usersModel