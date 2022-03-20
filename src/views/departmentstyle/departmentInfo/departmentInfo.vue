<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>科室详情</p>
    <div class="department-con">
      <div class="departmentcon-title">
        <h1>{{ departmentInfo.departmentName }}</h1>
        <div class="swiper departmentFengmian" style="position: relative">
          <img src="@/assets/images/departmentInfo.jpg" alt="">
          <p style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);font-size: 0.5rem;color: #666">
            {{ departmentInfo.departmentName }}</p>
        </div>
        <div class="text-info">
          <div v-html="departmentInfo.departmentContent"></div>
        </div>
      </div>
      <div class="doctor-list">
        <h1>相关专家</h1>
        <div class="ly_experts_carousel">
          <div class="ly_experts_box">
            <div class="swiper-container" ref="caseSwiper" style="height: 100%">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in expertsList" :key="item.id"
                     @click="$router.push({path:`/doctorInfo/${item.id}`})"
                     style="width:3.55rem; padding: 0 0.2rem;box-sizing: border-box;">
                  <div class="ly_swiper_image" style="overflow: hidden;">
                    <img style="transform: scaleX(1.4)" :src="item.pic" alt="">
                  </div>
                  <p>{{ item.dockerName }}</p>
                  <p>{{ item.dockerTit }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqDepartmentDetail, reqExpertsStyleList} from "@/api";
import "swiper/css/swiper.css";
import Swiper from "swiper";

export default {
  name: "departmentInfo",
  data() {
    return {
      departmentInfo: {},
      expertsList: []
    }
  },
  mounted() {
    this.getDepartmentInfo(this.$route.query.id)
    this.getDepartmentDoctor(this.$route.query.id)
  },
  methods: {
    // 科室信息
    async getDepartmentInfo(id) {
      const result = await reqDepartmentDetail(id)
      if (result.code === 200) {
        this.departmentInfo = result.data
      }
    },
    // 医生信息
    async getDepartmentDoctor(id) {
      let query = {
        pageNum: 1,
        pageSize: 10,
        departmentInfoId: id
      }
      const result = await reqExpertsStyleList(query)
      if (result.data.records.length > 0) {
        this.expertsList = result.data.records
      }else {
          query.departmentInfoId = null
          const result1 = await reqExpertsStyleList(query)
          this.expertsList = result1.data.records
      }
    }

    // 全部医生

  },
  watch: {
    expertsList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.caseSwiper, {
          slidesPerView: 2,
          autoplay: {
            delay: 2000,
            disableOnInteraction: true,
          },
        });
      })
    }
  }
}
</script>

<style scoped lang="less">
.con {
  padding: 25px;

  .title {
    width: 357px;
    height: 0.4rem;
    font-size: 0.4rem;
    color: #848484;
    line-height: 0.4rem;
    margin-bottom: 0.533rem;
  }

  .department-con {
    .departmentcon-title {
      h1 {
        display: block;
        height: 1.333rem;
        line-height: 1.333rem;
        font-size: 0.453rem;
        font-weight: bold;
      }

      .swiper {
        height: 4rem;
        background-color: #848484;
      }

      .departmentFengmian {
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .text-info {
        color: #848484;
        font-size: 0.4rem;
        line-height: 0.667rem;
      }
    }

    .doctor-list {
      h1 {
        display: block;
        height: 1.333rem;
        line-height: 1.333rem;
        font-size: 0.453rem;
        font-weight: bold;
      }

      .ly_experts_carousel {
        margin: 0 auto;
        height: 7.6rem;

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
  }
}
</style>
