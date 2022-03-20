import {reqDepartmentList} from "@/api";

const actions ={
    async getDepartmentList({commit},data){
      const result = await reqDepartmentList(data)
        if(result.code === 200){
            commit('GETDEPARTMENT',result.data)
        }
    }
}

const mutations ={
    GETDEPARTMENT(state,data){
        state.departmentList = data.records
        state.total = data.total
    }
}

const state = {
    departmentList: [],
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
