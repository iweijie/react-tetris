/**
 *作者: weijie
 *功能描述: axios请求数据配置文件
 *参数说明:
 *时间: 2018/4/2 14:25
 */
import axios from 'axios'
import {getLoginmsg, setCookie} from './baseTool'
import {message} from 'antd'
import history from "util/history"

axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"


// //修改请求配置
// axios.interceptors.request.use();

// //修改响应配置
axios.interceptors.response.use(response => {
    var data = response.data
    if(response.status == 200 && data && data.state == 1){
        return data
    }
    if(response.status == 200 && data && data.state == 2){
        history.replace("/404")
    }
    if(response.status == 200 && data && data.state == 0){
        if(!data.noTip){
            message.error(data.msg)
        }
        return data
    }
},(err)=>{
    throw err
});
export default axios