<template>
  <header>
    <div class="beader_box wp">
      <div class="header_logo" @click="$router.push({path:'/home'})">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div class="header_btn" @click="showPopup">
        <img src="@/assets/images/02.png" alt="">
      </div>
      <van-popup
          position="right"
          v-model="show"
          :closeable=true
          style="height: 100%;width: 70%;background-color: #78c3ae;"
      >
        <div class="popup_box">
          <ul>
            <li @click="$router.push({path:'/'}); show = false">
              <p>首页</p>
            </li>
            <li @click="$router.push({path:'/aboutme'}); show = false">
              <p>关于我们</p>
            </li>
            <li @click="$router.push({path:'/expertsstyle'}); show = false">
              <p>医生风采</p>
            </li>
            <li @click="$router.push({path:'/armarium'}); show = false">
              <p>医疗设备</p>
            </li>
            <li @click="$router.push({path:'/news'}); show = false">
              <p>新闻中心</p>
            </li>
            <li @click="$router.push({path:'/consultation'}); show = false">
              <p>就诊指南</p>
            </li>
            <li @click="$router.push({path:'/departmentstyle'}); show = false">
              <p>科室介绍</p>
            </li>
            <li @click="$router.push({path:'/contactme'}); show = false">
              <p>联系我们</p>
            </li>
          </ul>
        </div>
      </van-popup>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      show: false
    }
  },
  methods: {
    showPopup() {
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
header {
  width: 100%;
  height: 1.653rem;
  background: url(~@/assets/images/01.png) center center/cover no-repeat;

  .beader_box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header_logo {
      width: 3.6rem;
      height: 1.08rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .header_btn {
      width: 0.6rem;
      height: 0.493rem;
    }

    .popup_box {
      width: 100%;
      height: 85vh;
      margin-top: 1.333rem;

      ul {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        height: 100%;

        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 85%;
          flex: 1;
          border-bottom: 1px solid #fff;
          padding-left: 0.4rem;

          p {
            font-size: 0.4rem;
            color: #fff;
          }
        }
      }
    }
  }
}

/deep/ .van-icon {
  color: #fff;
}
</style>
