import jsonp from '../common/jsonp'
import { commonParams, options } from './config'
import axios from "axios";
import router from '../router/index'
import store from '../store/index'

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams,{
        platform:'h5',
        uin:0,
        needNewCode:1,
    });
    return jsonp(url, data, options);
}


axios.interceptors.response.use(
    response => {
        // console.log(response.status)
        // return response;
        console.log(store.state)
         router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data) 
    });

export function getDiscList() {
    const url = '/api/getDiscList'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json' 
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        if(res.data.code == 0){
            return Promise.resolve(res.data)
        }
        
    })
}

