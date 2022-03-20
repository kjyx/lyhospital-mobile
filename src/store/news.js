import {reqNewsList} from "@/api";

const actions ={
    async getNewsList({commit},data) {
        const result = await reqNewsList(data)
        console.log(result)
        if(result.code === 200){
            commit('GETNEWSLIST',result.data)
        }
    }
}

const mutations ={
    GETNEWSLIST(state,data){
        state.newsList = data.records || []
        state.total = data.total
    }
}

const state = {
    newsList:[],
    total:0
}


const getters = {
}

export default {
    namespaced:true, // 命名空间
    actions,
    mutations,
    state,
    getters
}
