<template>
  <div class="ly-box">
    <!--    轮播图-->
    <div class="ly-banner">
      <van-swipe class="my-swipe" :autoplay="3000" width="100%" height="100%" indicator-color="white">
        <van-swipe-item v-for="item in swiperList" :key="item.id" >
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    按钮-->
    <div class="ly_guide_order wp">
      <div class="ly-guide equal" @click="$router.push({path:'/consultation'})">
        <img src="@/assets/images/yuyue.png" alt="">
        <span>在线预约</span>
      </div>
      <div class="ly_order equal" @click="$router.push({path:'/contactme'})">
        <img src="@/assets/images/ditu.png" alt="">
        <span>来院地图</span>
      </div>
    </div>
    <!--    医院公告 学术动态-->
    <div class="ly_notice_dynamic wp">
      <div class="ly_news_title">
        <img src="@/assets/images/05.png" alt="">
        <span :class="{active: current === 3}" @click="getNewsList(3)">医院公告</span>
        <span :class="{active: current === 6}" @click="getNewsList(6)">学术动态</span>
        <span @click="$router.push({path:'/news'})">更多+</span>
      </div>
      <div class="ly_news_image" @click="$router.push({path:`/newsInfo?id=${newsListOne.id}`})">
        <img style="width: 100%;height: 100%;" :src="newsListOne.pic" alt="">
        <div class="ly_image_title">
          <p class="one-txt-cut">{{ newsListOne.title }}</p>
        </div>
      </div>
      <div class="ly_news_list">
        <ul>
          <li v-for="item in newsList" :key="item.id"  @click="$router.push({path:`/newsInfo?id=${item.id}`})">
            <p class="one-txt-cut">{{ item.newsTitle }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!--    医院简介-->
    <div class="ly_about wp">
      <div class="ly_title">
        <img src="@/assets/images/05.png" alt="">
        <span>医院简介</span>
        <span @click="$router.push({path:'/aboutme'})">更多+</span>
      </div>
      <div class="ly_about_content">
        <div class="ly_about_image">
          <img src="@/assets/images/07.png" alt="">
        </div>
        <div class="ly_about_introduce" v-for="item in aboutMe" :key="item.id">
          <p class="txt-cuta" v-html="item.content"></p>
        </div>
      </div>
    </div>
    <!--    专家风采-->
    <div class="ly_experts_style wp">
      <div class="ly_title">
        <img src="@/assets/images/05.png" alt="">
        <span>专家风采</span>
        <span @click="$router.push({path:'/expertsstyle'})">更多+</span>
      </div>
      <div class="ly_experts_carousel">
        <div class="ly_experts_box">
          <div class="swiper-container" ref="caseSwiper" style="height: 100%">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in expertsList" :key="item.id" @click="$router.push({path:`/doctorInfo/${item.id}`})" style="width:3.55rem; padding: 0 0.2rem;box-sizing: border-box;">
                <div class="ly_swiper_image" style="overflow: hidden">
                  <img :src="item.pic" alt="" style="transform: scaleX(1.7)">
                </div>
                <p>{{item.dockerName}}</p>
                <p>{{item.dockerTit}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    科室信息-->
    <div class="ly_department_box wp">
      <div class="ly_title">
        <img src="@/assets/images/05.png" alt="">
        <span>科室信息</span>
        <span @click="$router.push({path:'/departmentstyle'})">更多+</span>
      </div>
      <div class="ly_department_content">
        <ul>
          <li v-for="item in departmentList" :key="item.id" @click="$router.push({path:`/departmentInfo?id=${item.id}`})">
            <p>{{item.departmentName}}</p>
          </li>
        </ul>
      </div>
    </div>
<!--    医疗设备-->
    <div class="ly_equipment_box wp"  style="margin-bottom: 0.7rem">
      <div class="ly_title">
        <img src="@/assets/images/05.png" alt="">
        <span>医疗设备</span>
        <span @click="$router.push({path:'/armarium'})">更多+</span>
      </div>
      <div class="ly_equipment_swiper">
        <div class="swiper-container" ref="equipment" style="height: 100%">
          <div class="swiper-wrapper">
            <div class="swiper-slide" style=" padding: 0 0.2rem;box-sizing: border-box;" v-for="item in medicalEquipmentList" :key="item.id">
              <div class="ly_swiper_image">
                <div class="image" style="width: 4.013rem;height: 4.013rem">
                  <img :src="item.pic" alt="" style="width: 100%;height: 100%;">
                </div>
                <p style="text-align: center; padding-top: 0.267rem;font-size: 0.4rem;">{{item.medicalName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import {reqAboutMe, reqMedicalEquipment, reqSwiperList} from "@/api";
export default {
  name: 'home',
  data() {
    return {
      current: 3,
      swiperList:[],
      medicalEquipmentList:[],
      aboutMe:[]
    }
  },
  mounted() {
    this.getNewsList(3)
    this.getExpertsList()
    this.getDepartmentList()
    this.getSWiperList()
    this.getMedicalEquipment()
    this.getAboutMe()
  },
  methods: {
    // 新闻
    async getNewsList(id) {
      this.current = id
      let query = {
        typeId: id,
        pageNum: 1,
        pageSize: 5
      }
      await this.$store.dispatch('news/getNewsList', query)
    },
    // 专家
   async getExpertsList(){
      let query = {
        pageNum: 1,
        pageSize: 10,
        departmentInfoId: null
      }
     await this.$store.dispatch('experts/getExpertsList',query)
    },
    // 科室
    async getDepartmentList(){
      let query = {
        pageNum: 1,
        pageSize: 12
      }
     await this.$store.dispatch('department/getDepartmentList', query)
    },
    // 轮播图
    async getSWiperList(){
      let query = {
        pageNum: 1,
        typeId: 1,
        pageSize: 10
      }
      const result = await reqSwiperList(query)
      this.swiperList = result.data.records
    },
    // 医疗器械
    async getMedicalEquipment(){
      let query = {
        pageNum:1,
        pageSize:10
      }
     const result = await reqMedicalEquipment(query)
      if (result.code === 200) {
        this.medicalEquipmentList = result.data.records
      }
    },
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
  },
  computed: {
    ...mapState('news', ['newsList']),
    ...mapState('experts',['expertsList']),
    ...mapState('department',['departmentList']),
    newsListOne() {
      let newsListObj = {}
      this.newsList.filter((item, index) => {
        if (index === 0) {
          newsListObj.title = item.newsTitle
          newsListObj.pic = item.pic
          newsListObj.id = item.id
        }
      })
      return newsListObj
    }
  },

  watch:{
    expertsList(){
      this.$nextTick(()=>{
        new Swiper(this.$refs.caseSwiper, {
          // centeredSlides: true,
          loop: true, // 循环模式选项
          slidesPerView: 2,
          autoplay: {
            delay: 2000,
            disableOnInteraction: true,
          },
        });
      })
    },
    medicalEquipmentList(){
      this.$nextTick(()=>{
        new Swiper(this.$refs.equipment, {
          // centeredSlides: true,
          loop: true, // 循环模式选项
          // 如果需要分页器
          slidesPerView: 2,
          autoplay: {
            delay: 5000,
            disableOnInteraction: true,
          },
        });

      })
    }
  }
}
</script>

<style scoped lang="less">
.ly-box {
  .ly-banner {
    width: 9.533rem;
    height: 5.6rem;
    margin: 0 auto 0.667rem auto;

    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      //background-color: #39a9ed;
    }
  }

  .ly_guide_order {
    width: 8.933rem;
    height: 2.267rem;
    //background-color: pink;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 1rem;

    .ly-guide {
      margin-right: 0.333rem;
    }

    .ly_order {
    }

    .equal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 15%);
      border-radius: 5px;

      img {
        width: 0.867rem;
        padding-bottom: 0.267rem;
      }

      span {
        text-align: center;
        font-size: 0.4rem;
        font-weight: 600;
      }
    }
  }

  .ly_notice_dynamic {
    margin-bottom: 0.293rem;

    .ly_news_title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 0.133rem;
      text-align: center;
      margin-bottom: 0.267rem;

      img {
        width: 0.733rem;
        margin-right: 0.4rem;
        padding-left: 0.267rem;
      }

      span {
        flex: 1;
        font-size: 0.5rem;
        font-weight: 600;
        margin-right: 0.4rem;

        &:nth-child(4) {
          margin: 0;
          text-align: right;
          font-size: 0.267rem;
          color: #ccc;
        }
      }
    }

    .ly_news_image {
      position: relative;
      height: 5.76rem;
      //background-color: pink;
      margin-bottom: 0.227rem;

      img {

      }

      .ly_image_title {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1.2rem;
        background-color: #009DA0;
        line-height: 1.2rem;
        padding: 0 0.133rem;
        box-sizing: border-box;
        color: white;
        font-size: 0.4rem;
      }
    }

    .ly_news_list {
      height: 5rem;
      //background-color: pink;
      ul {
        display: flex;
        flex-direction: column;
        height: 100%;

        li {
          flex: 1;
          list-style-type: circle;
          margin-left: 0.533rem;
          line-height: 30px;

          &::marker {
            color: #FFA70F;
          }

          p {
            font-size: 0.4rem;
          }
        }
      }
    }
  }

  .ly_about {
    margin-bottom: 0.293rem;

    .ly_about_content {
      height: 8.8rem;
      background-color: #f8f3f3;

      .ly_about_image {
        height: 4.667rem;
        padding: 0.267rem 0.133rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .ly_about_introduce {
        width: 8.5rem;
        height: 3rem;
        //background-color: pink;
        margin: 0.144rem auto 0 auto;
        overflow: hidden;
        .txt-cuta {
          height: 100%;
          font-size: 0.267rem;
        }
      }
    }
  }

  .ly_experts_style {
    .ly_experts_carousel {
      margin: 0 auto;
      height: 7.6rem;
      //background-color: pink;
      .ly_experts_box {
        width: 8.5rem;
        height: 100%;
        margin: 0 auto;

        .ly_swiper_image {
          height: 5rem;

          img {
            height: 100%;
          }
        }
        p {
          text-align: center;
          padding-top: 0.3rem;
          font-size: 0.35rem;
          &:nth-child(2) {
            color: #119597;
          }
        }
      }
    }
  }

  .ly_department_box {
    .ly_department_content {
      width: 8.5rem;
      height: 7.333rem;
      margin: 0 auto;
      //background-color: pink;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 100%;
        height: 100%;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.667rem;
          height: 1.267rem;
          margin-bottom: 0.4rem;
          margin-right: 0.15rem;
          border: 1px solid #ccc;
          &:nth-child(3n) {
            margin-right: 0;
          }

          p {
            font-size: 0.3rem;
            color: #848484;
            letter-spacing: 0.013rem;
          }
        }
      }
    }
  }
}


.active {
  color: #009EA1;
}

.ly_title {
  display: flex;
  align-items: center;
  height: 0.933rem;
  //background-color: pink;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0.467rem;

  img {
    width: 0.72rem;
    margin-right: 0.4rem;
  }

  span {
    flex: 1;
    font-size: 0.5rem;
    font-weight: 600;
    color: #666;

    &:nth-child(3) {
      text-align: right;
      font-size: 0.267rem;
      color: #ccc;
    }
  }
}
/deep/.my-swipe{
  height: 100%;
}
</style>
