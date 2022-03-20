<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>专家团队</p>
    <van-tabs color="#0080ff">
      <van-tab title="专家介绍">
        <ul class="doctor-list">
          <li v-for="item in expertsList" :key="item.id" style="overflow: hidden;">
            <img :src="item.pic" style="transform: scaleX(1.3)" alt="" @click="$router.push({name:'doctorInfo',params:{id:item.id}})">
            <h3 style="padding-top: 0.5rem">{{ item.dockerName }}</h3>
            <h3 style="padding-top: 0.2rem">{{ item.dockerTit }}</h3>
          </li>
        </ul>
        <van-pagination v-model="expertsQuery.pageNum"  @change="getExpertsList" :items-per-page="expertsQuery.pageSize"  mode="simple" :total-items="total" />
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "doctorTeam",
  data() {
    return {
      expertsQuery:{
        pageNum: 1,
        pageSize: 6,
        departmentInfoId: null
      },
    }
  },
  mounted() {
    this.getExpertsList()
  },
  methods:{
    getExpertsList(pages = 1){
      this.expertsQuery.pageNum = pages
      this.$store.dispatch('experts/getExpertsList',this.expertsQuery)
    }
  },
  computed:{
    ...mapState('experts',['expertsList','total'])
  }


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
  .doctor-list {
    display: flex;
    flex-wrap: wrap;
    li {
      h3 {
        &:not(:nth-of-type(1)) {
          color: #848484;
        }
      }
      height: 6.6rem;
      img{
        width: 3.333rem;
        height: 4.267rem;
        margin: 0 auto;
      }
      width: 50%;
      text-align: center;
      h3{
        line-height: 0.4rem;
        font-size: 0.4rem;
        margin-bottom: 0.067rem;
      }
    }
  }
}
/deep/.van-tabs__wrap{
  margin-bottom: 0.8rem;
}
/deep/.van-tabs__line{
  background-color: #78c3ae !important;
}
//.news-list {
//  padding: 0 50px;
//  li {
//    margin-bottom: 30px;
//    h1{
//      font-weight: 400;
//      white-space: nowrap;
//      text-overflow: ellipsis;
//      overflow: hidden;
//    }
//    h5{
//      margin-top: 6px;
//      font-size: 18px;
//      color: #848484;
//    }
//    p {
//      margin-top: 15px;
//      font-size: 28px;
//      color: #848484;
//      text-overflow: -o-ellipsis-lastline;
//      overflow: hidden;
//      display: -webkit-box;
//      -webkit-line-clamp: 2;
//      line-clamp: 2;
//      -webkit-box-orient: vertical;
//    }
//  }
//}
</style>

