// 对 axios 进行二次封装
import axios from "axios";
import Vue from 'vue';
import {Toast} from 'vant';

Vue.use(Toast);
// 1, 利用axios对象的方法 create 去创造一个axios实例
//2,request 就是axios, 只不过稍微配置一下
let loadingInstance = null
const requests = axios.create({
    //配置对象
    //基础路径.发送请求时 路径当中会出现 api
    baseURL: '/erupt-api',
    //代表 请求超时时间
    timeout: 5000
});

//请求拦截器
requests.interceptors.request.use((config) => {
    //进度条开始
    loadingInstance = Toast.loading({
        message: '加载中...',
        forbidClick: true
    })
    return config;
});

// 添加响应拦截器
requests.interceptors.response.use((res) => {
    // 对响应数据做点什么
    //加载取消
    loadingInstance.clear()
    return res.data;
}, (error) => {
    // 对响应错误做点什么
    Toast.fail({
        message:'网络错误',
        duration:2000
    })
    return Promise.reject(error);
});

export default requests
