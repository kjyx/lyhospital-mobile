<template>
  <div class="con wp">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>科室列表</p>
    <div class="department-con">
      <div class="departmentcon-item">
        <h1>全部科室</h1>
        <ul>
          <li @click="$router.push({path:`/departmentInfo?id=${item.id}`})" v-for="item in departmentList" :key="item.id"><div class="box">{{item.departmentName}}</div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "departmentstyle",
  data() {
    return {

    }
  },
  mounted() {
    this.getDepartment()
  },
  methods:{
    async getDepartment(){
      let query = {
        pageNum:1,
        pageSize:50
      }
      await this.$store.dispatch('department/getDepartmentList',query)
    }
  },
  computed:{
    ...mapState('department',['departmentList'])
  }

}
</script>

<style scoped lang="less">
.con{
  padding: 25px 0;
  .title {
    width: 357px;
    height: 0.4rem;
    font-size: 0.4rem;
    color: #848484;
    line-height: 0.4rem;
    margin-bottom: 0.533rem;
  }
  .department-con {
    .departmentcon-item{
      h1{
        padding-left: 0.267rem;
        display: block;
        height: 1.333rem;
        line-height: 1.333rem;
        border-bottom: 1px solid #ccc;
        font-size: 0.453rem;
        font-weight: bold;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-top: 0.667rem;
        li{
          width: 45%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.667rem;
          margin-right: 0.8rem;
          &:nth-child(2n){
            margin-right: 0;
          }
          .box{
            text-align: center;
            line-height: 1.173rem;
            font-size: 0.4rem;
            width: 274px;
            height: 1.173rem;
            background: #78c3ae;
            opacity: 1;
            color: white;
          }
        }
      }
    }
  }
}
</style>
