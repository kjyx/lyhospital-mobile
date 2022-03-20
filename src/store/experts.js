import {reqExpertsStyleList} from "@/api";
const actions ={
    // 专家列表
    async getExpertsList({commit},data){
      const result = await reqExpertsStyleList(data)
        if(result.code === 200){
            commit('GETEXPERTSLIST',result.data)
        }
    }
}

const mutations ={
    GETEXPERTSLIST(state,data){
        state.expertsList = data.records
        state.total = data.total
    }
}

const state = {
    expertsList:[],
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
