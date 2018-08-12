/**
 *作者: weijie
 *功能描述: 菜单数据
 *参数说明:
 *时间: 2018/4/16 10:52
 */
import {
    combineReducers
} from 'redux'
import map from "./map"
import controlReducer from "./controlReducer"

const rootReducer = combineReducers({
    ...map,
    ...controlReducer,
})

export default rootReducer