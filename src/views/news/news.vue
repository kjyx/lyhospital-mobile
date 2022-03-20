<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>新闻中心</p>
    <van-tabs color="#0080ff" @click="changeNews">
      <van-tab v-for="item in newsNameList" :title="item.title" :key="item.id">
      </van-tab>
    </van-tabs>
    <ul class="news-list" style="margin-top: 0.267rem" >
      <li v-for="item in newsList" :key="item.id" @click="$router.push({path:`/newsInfo?id=${item.id}`})">
        <h3>{{ item.newsTitle }}</h3>
        <h5>{{ item.createDate.slice(0,10)}}</h5>
        <p>{{ item.newsDescription }}</p>
      </li>
    </ul>
    <van-pagination v-model="query.pageNum"  @change="newsChange"  mode="simple" :total-items="total" :items-per-page="query.pageSize" />
  </div>
</template>

<script>

import {mapState} from "vuex";
export default {
  name: "news",
  data() {
    return {
      newsNameList:[
        {
          title:'全部新闻',
          id:null,
        },
        {
          title:'学术动态',
          id:6,
        },
        {
          title:'医院通告',
          id:3,
        },
      ],
      query:{
        typeId: null,
        pageNum: 1,
        pageSize: 6
      },

    }
  },
  mounted() {
    this.changeNews(0)
  },
  methods:{
    async changeNews(id){
      console.log(id)
      switch (id){
        case 0: {
          this.query.typeId = null
          this.query.pageNum = 1
          break
        }
        case 1: {
          this.query.typeId = 6
          this.query.pageNum = 1
          break
        }
        case 2: {
          this.query.typeId = 3
          this.query.pageNum = 1
        }
      }
     await this.$store.dispatch('news/getNewsList',this.query)
    },
    newsChange(pagenum){
      this.query.pageNum = pagenum
      this.changeNews()
    }

  },
  computed:{
    ...mapState('news',['newsList',"total"])
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
.news-list {
  li {
    margin-bottom: 0.4rem;
    h1{
      font-weight: 400;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    h5{
      margin-top: 0.08rem;
      font-size: 0.24rem;
      color: #848484;
    }
    p {
      margin-top: 0.2rem;
      font-size: 0.373rem;
      color: #848484;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.van-tabs__nav {
  margin-bottom: 20px;
}
/deep/.van-tabs__line{
  background-color: #78c3ae !important;
}
</style>
