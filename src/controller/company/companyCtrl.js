import {controller} from '../../classes/classController';
import m from '../../model/company/companyModel'

let model = new m()
let rtr = controller(model)

module.exports = rtr