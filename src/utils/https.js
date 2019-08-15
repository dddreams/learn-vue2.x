import axios from 'axios'
import router from '../router'
import qs from 'qs'
import { utils } from '@/utils/utils'
import { storage } from '@/utils/storage'

axios.defaults.timeout = 15000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 默认false 会导致后台接收到的同一用户的不同请求sessionid都不同,需要改为true
// axios.defaults.withCredentials=true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    config.headers.Authorization = storage.getStore(storage.token_type) + ' ' + storage.getStore(storage.access_token)
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((response) =>{
    if(response.status !== 200){
        router.push('error')
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

// 参数加密
function dealParam(param){
    // 参数加密key
    let SECRET_KEY = '4e92604801cc4d11';
    let obj={};
    for(let prop in param) {
        if(param[prop]){
            obj[prop]= utils.encryptText(param[prop],SECRET_KEY);
        }else{
            obj[prop]= '';
        }
    }
    return param;
}

export const http = {
    post(url, param) {
        return new Promise((resolve, reject) => {
            axios.post(url,dealParam(param))
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params:dealParam(param)})
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

