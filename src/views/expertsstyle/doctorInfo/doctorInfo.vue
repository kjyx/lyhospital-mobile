<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>专家介绍</p>
    <div class="newInfo-box">
      <div class="top">
        <img
            class="img"
            referrerpolicy="no-referrer"
            :src="doctorInfo.pic"
         />
        <h3>{{doctorInfo.dockerName}}</h3>
        <h4>{{doctorInfo.dockerTit}}</h4>
      </div>
      <div class="context" v-html="doctorInfo.dockerContent">
      </div>
    </div>
  </div>
</template>

<script>
import {reqExpertsStyleInfo} from "@/api";
export default {
  name: "doctorInfo",
  data(){
    return{
      doctorInfo:{}
    }
  },
  mounted() {
    this.getDoctorInfo(this.$route.params.id)
  },
  methods:{
   async getDoctorInfo(id){
      const result = await reqExpertsStyleInfo(id)
     if(result.code === 200){
       this.doctorInfo = result.data
     }
    }
  },
}
</script>

<style scoped lang="less">
.con{
  padding: 0.533rem;
  .title {
    width: 357px;
    height: 0.4rem;
    font-size: 0.4rem;
    color: #848484;
    line-height: 0.4rem;
    margin-bottom: 0.533rem;
  }
  .newInfo-box{
    display: flex;
    flex-direction: column;
    .top{
      padding: 16.13vw 23.2vw 0;
      margin-bottom: 10px;
      h3{
        margin-top: 0.667rem;
        margin-bottom: 0.4rem;
        height: 0.373rem;
        font-size: 0.4rem;
        color: #292929;
        text-align: center;
      }
      h4{
        height: 0.32rem;
        font-size: 0.333rem;
        color: #848484;
        line-height: 35px;
        margin-bottom:1rem;
        text-align: center;
      }
    }
    .context{
      font-size: 0.4rem;
      color: #848484;
      line-height: 40px;
    }
  }
  .img {
    width: 42.4vw;
    height: 42.54vw;
  }
}
</style>
