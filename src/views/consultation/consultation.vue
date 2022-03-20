<template>
  <div class="con">
    <p class="title">当前位置:<i @click="$router.push({path:'/home'})">首页</i>>就诊指南</p>
    <van-tabs color="#0080ff">
      <van-tab title="在线预约">
        <van-form @submit="onSubmit">
          <van-field
              v-model="orderQuery.userName"
              name="pattern"
              label="姓名"
              placeholder="请输入您的姓名"
              :rules="[{ pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '请输入正确内容' }]"
          />
          <van-field
              v-model="orderQuery.tel"
              name="pattern"
              label="电话"
              placeholder="请输入您的电话"
              :rules="[{ pattern:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, message: '请输入正确内容' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" style="background-color: #78c3ae;border-color: #78c3ae">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="体检须知" >
        <p>1、体检请先预约安排;体检前一天忌酒，十点之后禁食（包括少喝水），限高脂高蛋白饮食，避免使用对肝肾功能有影响的药物。</p>

          <p>2、检查前一——两日饮食宜清淡，勿食猪肝、猪血等含血性之食物，检查前一日晚上十二点以后，请完全禁食(包括饮水)。</p>

          <p>3、抽血及肝、胆B超须空腹进行;做膀胱、前列腺、子宫、附件B超时，请勿排尿;如无尿，需饮水至膀胱充盈。</p>

          <p>4、做X线检查时，宜穿棉布内衣，勿穿带有金属钮扣的衣服、文胸;请摘去项链、手机、钢笔、钥匙 等金属物品。怀孕及有可能怀孕之女性受检者，请先告知健检服务人员，慎做X光检查。</p>

          <p>5、女士生理期，不宜作妇科检查及尿检;做妇科检查前应排空膀胱;乳腺远红外线复查最好选择在生理期后一周内。未婚女士不宜做妇科检查，有特殊需求者要签署相关协议(告知书)方可进行相应检查</p>

          <p>6、内科体检前请先测血压、身高、体重。</p>

          <p>7、检查当天需抽完血、做完腹部超音波检查后，方可进食。</p>

          <p>8、体检当日穿着要求：穿脱方便的服装、鞋袜，最好不佩戴项链等，女同志的文胸不要带钢托，不要穿金属亮片的内衣。</p>

          <p>9、体检有热成像项目时，检前须排空便、尿，还须禁食、水。</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {reqOrder} from "@/api";
export default {
  name: "consultation",
  data() {
    return {
      orderQuery:{
        userName:'',
        tel:''
      }
    };
  },
  methods: {
    async onSubmit() {
      const result = await reqOrder(this.orderQuery)
      if(result.code === 200){
        Toast.success('提交成功')
        this.orderQuery.userName = ''
        this.orderQuery.tel = ''
      }
    },
  },
}
</script>

<style scoped lang="less">
.con {
  padding: 0.533rem;

  .title {
    width: 357px;
    height: 0.4rem;
    font-size: 0.4rem;
    color: #848484;
    line-height: 0.4rem;
    margin-bottom: 0.533rem;
  }
}
/deep/.van-tabs__line{
  background-color: #78c3ae !important;
}
.van-tab__pane{
  p{
    margin-bottom: 0.5rem;
  }
}
</style>
