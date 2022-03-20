<template>
  <div class="con wp">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>新闻详情</p>
    <div>
      <h3 class="biaoti">{{infoList.newsTitle}}</h3>
      <h3 class="creattime">{{filters1.formatTimer(infoList.createDate)}}</h3>
      <div v-html="infoList.newsContent"></div>
      <van-button type="info" @click="$router.back()" style="width: 100%; margin-top: 30px;border-radius: 20px;background-color: #78c3ae; border-color: #78c3ae;">返回</van-button>
    </div>
  </div>
</template>

<script>
import {reqNewsInfo} from "@/api";

export default {
  name: "newsInfo",
  data() {
    return {
      infoList:{},
      filters1: {
        formatTimer: (value) => {
          let date = new Date(value);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? "0" + MM : MM;
          let d = date.getDay();
          d = d < 10 ? "0" + d :d
          return y + "-" + MM + '-' + d;
        }
      },
    }
  },
  methods:{
    async loadNewsInfo() {
      const res = await  reqNewsInfo(this.$route.query.id)
      this.infoList = res.data
      console.log(res)
    }
  },
  mounted() {
    this.loadNewsInfo()
  }
}
</script>

<style scoped lang="less">
.con{
  padding: 0.533rem;
}
.title {
  width: 357px;
  height: 0.4rem;
  font-size: 0.4rem;
  color: #848484;
  line-height: 0.4rem;
  margin-bottom: 0.533rem;
}
.biaoti{
  margin-bottom: 0.267rem;
  font-size: 0.427rem;
}
.creattime{
  font-size: 0.213rem;
  margin-bottom: 0.2rem;
  color: #848484;
}
</style>
