import {controller} from '../classes/classController';
import m from '../model/giftsModel'
import handleRequest from '../lib/ctrlHandler';

let model = new m()
let rtr = controller(model)

module.exports = rtr