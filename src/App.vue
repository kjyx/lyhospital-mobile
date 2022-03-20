<template>
  <div id="app">
    <Header></Header>
    <mainbanner v-if="$route.meta.bannerShow"></mainbanner>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import mainbanner from "@/components/mainbanner/mainbanner";
export default{
  name:'App',
  components:{
    Header,
    Footer,
    mainbanner
  }
}
</script>
<style>

</style>
