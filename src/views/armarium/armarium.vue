<template>
  <div class="con wp">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>医疗设备</p>
    <div class="department-con">
      <div class="departmentcon-item">
        <h1>医疗设备</h1>
        <ul>
          <li v-for="item in medicalEquipmentList">
            <img :src="item.pic" alt="">
            <p style="text-align: center;font-size: 0.4rem; padding-top: 0.133rem">{{ item.medicalName }}</p>
          </li>
        </ul>
      </div>
    </div>
    <van-pagination v-model="armariumQuery.pageNum" @change="getMedicalEquipment" mode="simple" :total-items="total" :items-per-page="armariumQuery.pageSize"/>

  </div>
</template>

<script>

import {reqMedicalEquipment} from "@/api";

export default {
  name: "armarium",
  data() {
    return {
      medicalEquipmentList: [],
      armariumQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total:0
    }
  },
  mounted() {
    this.getMedicalEquipment()
  },
  methods: {
    // 医疗器械
    async getMedicalEquipment() {
      const result = await reqMedicalEquipment(this.armariumQuery)
      if (result.code === 200) {
        this.medicalEquipmentList = result.data.records
        this.total = result.data.total
        window.scrollTo(0,0)
      }
    },
  },
  computed: {}

}
</script>

<style scoped lang="less">
.con {
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
    .departmentcon-item {
      h1 {
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
        padding-top: 0.667rem;

        li {
          width: 45%;
          height: 3rem;
          margin-bottom: 1.5rem;
          margin-right: 0.8rem;

          &:nth-child(2n) {
            margin-right: 0;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
