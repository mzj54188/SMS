/* 
    在这个函数里面 封装axios
*/
// 引入axios
import axios from 'axios';
// 引入qs
import qs from 'qs';

// 设置默认请求服务器根目录
axios.defaults.baseURL = 'http://172.16.9.40:777';

// // 写一个axios的请求拦截器 （在axios请求发送之前 搞点事情）
// axios.interceptors.request.use((config) => {
//     // 获取token
//     const token = window.localStorage.getItem('token');
//     // 在请求头中携带token
//     config.headers.authorization = `Bearer ${token}` 
//     return config;
// })

// 封装get方法 和 post方法
export default {
    get (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    post (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}