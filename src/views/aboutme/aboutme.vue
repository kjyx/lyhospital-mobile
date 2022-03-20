<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>关于我们</p>
    <van-tabs color="#0080ff">
      <van-tab title="关于我们">
        <div>
          <p style="text-align: center; font-weight: 800; font-size: 18px;padding-bottom: 10px">鹿邑心脑血管医院</p>
          <div style="line-height: 23px;  font-size: 0.4rem;" v-for="item in aboutMe" :key="item.id">
            <p v-html="item.content"></p>
          </div>
        </div>
      </van-tab>
      <van-tab title="荣誉资质">
        <ul class="yuanrongList">
          <li>
            <img src="./images/c0001.png">
          </li>
          <li>
            <img src="./images/0002.png">
          </li>
          <li>
            <img src="./images/0003.png">
          </li>
          <li>
            <img src="./images/0004.png">
          </li>
          <li>
            <img src="./images/0005.png">
          </li>
          <li>
            <img src="./images/0006.png">
          </li>
        </ul>
      </van-tab>

      <van-tab title="院长致辞">
        <img src="@/assets/images/yuanzhang.jpg" alt="" style="display:block;width: 4rem;height: auto;float: right;padding: 0 0 0.133rem 0.2rem">
        <p style="font-size: 0.4rem; text-indent: 2em; line-height: 0.65rem;">我院是一家集医疗、康复、体检、养老、护理为一体，以心脑血管疾病为主的非营利性专科医院。 随着生活水平的提高，老龄化的增长，全国每年死于心脑血管疾病的人数高达3500万人，居各种疾病死因首位。心脑血管疾病具有“发病率高、致残率高、死亡率高、复发率高，并发症多”的特点，并有年轻化的趋势。于2008年成立了鹿邑心脑血管医院，建院以来治愈数万名患者，近者周边县市，远者来自新疆、内蒙、包头、广州、山东等全国各地患者。 2016年初我们新病房楼投入使用和环境改善，楼内宾馆式装修，豪华而时尚；引进有上百种大型医疗设备；建有层流净化手术室、层流净化产房、层流净化消毒供应室、层流净化重症监护室等设施；并与商丘市第一人民医院技术协作。温馨的就医环境，精湛的医疗技术、检查设备，使医院的发展再上新台阶。 大医精诚，大爱无疆；救死扶伤，责无旁贷。在今后的工作中，我们将不负党和政府重托，认真履行保障人民群众身心健康的职责，让仁爱之光温暖每位患者，使患者生命焕发出精彩华章! 我坚信：沐浴着医改春风，以住院疗养楼投入使用为新起点，全院职工精诚团结，共襄发展，鹿邑心脑血管医院的明天一定会更加灿烂辉煌! 在此恭祝大家身心健康、万事如意、阖家幸福!</p>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import {reqAboutMe} from "@/api";

export default {
  name: "aboutme",
  data(){
    return{
      aboutMe:[]
    }
  },
  mounted() {
    this.getAboutMe()
  },
  methods:{
    // 关于我们
    async getAboutMe() {
      let query = {
        pageNum: 1,
        pageSize: 10,
        typeId: null
      }
      const result = await reqAboutMe(query)
      if(result.code === 200){
        this.aboutMe = result.data.records
      }
    }
  }
}
</script>

<style scoped lang="less">
.yuanrongList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 45%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      display: block;
      width: 100%;
      height: auto;
      background-color: #1674B3;
    }
    p {
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
.con {
  padding: 5.333333vw;
}
.title {
  height: 29px;
  font-size: 0.4rem;
  font-family: SimHei;
  color: #848484;
  line-height: 1rem;
  margin-bottom: 0.533rem;
}
.van-tabs {
}
/deep/ .van-tab__pane {
  padding-top: 20px;
}
.news-list {
  li {
    margin-bottom: 30px;
    h1{
      font-weight: 400;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    h5{
      margin-top: 6px;
      font-size: 18px;
      color: #848484;
    }
    p {
      margin-top: 15px;
      font-size: 28px;
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
/deep/.van-tabs__line{
  background-color: #78c3ae !important;
}
</style>
