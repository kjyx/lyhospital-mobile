import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 重写 push 与 replace 解决重复点击报错
// 先把原型上的push方法 和 replace方法 保  存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    // 首页
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: {
            bannerShow: false,
            title: "鹿邑心脑血管医院"
        }
    },
    // 关于我们
    {
        path: '/aboutme',
        name: 'aboutMe',
        component: () => import('@/views/aboutme/aboutme'),
        meta: {
            bannerShow: true,
            title: "关于我们-鹿邑心脑血管医院"
        }
    },
    // 医生风采
    {
        path: '/expertsstyle',
        name: 'ExpertsStyle',
        component: () => import('@/views/expertsstyle/expertsstyle'),
        meta: {
            bannerShow: true,
            title: "医生风采-鹿邑心脑血管医院"
        }
    },
    // 医生详情
    {
        path: '/doctorInfo/:id?',
        name: 'doctorInfo',
        component: () => import('@/views/expertsstyle/doctorInfo/doctorInfo'),
        meta: {
            bannerShow: true,
            title: "医生详情-鹿邑心脑血管医院"
        }
    },
    // 医疗设备
    {
        path: '/armarium',
        name: 'Armarium',
        component: () => import('@/views/armarium/armarium'),
        meta: {
            bannerShow: true,
            title: "医疗设备-鹿邑心脑血管医院"
        }
    },
    // 新闻中心
    {
        path: '/news',
        name: 'news',
        component: () => import('@/views/news/news'),
        meta: {
            bannerShow: true,
            title: "新闻中心-鹿邑心脑血管医院"
        }
    },
    // 新闻详情
    {
        path: '/newsInfo',
        name: 'newsInfo',
        component: () => import('@/views/news/newsInfo/newsInfo'),
        meta: {
            bannerShow: true,
            title: "新闻详情-鹿邑心脑血管医院"
        }
    },
    // 就诊指南
    {
        path: '/consultation',
        name: 'Consultation',
        component: () => import('@/views/consultation/consultation'),
        meta: {
            bannerShow: true,
            title: "就诊指南-鹿邑心脑血管医院"
        }
    },
    // 科室风采
    {
        path: '/departmentstyle',
        name: 'departmentstyle',
        component: () => import('@/views/departmentstyle/departmentstyle'),
        meta: {
            bannerShow: true,
            title: "科室风采-鹿邑心脑血管医院"
        }
    },
    // 科室详情
    {
        path: '/departmentInfo',
        name: 'departmentInfo',
        component: () => import('@/views/departmentstyle/departmentInfo/departmentInfo'),
        meta: {
            bannerShow: true,
            title: "科室详情-鹿邑心脑血管医院"
        }
    },
    // 联系我们
    {
        path: '/contactme',
        name: 'Contactme',
        component: () => import('@/views/contactme/contactme'),
        meta: {
            bannerShow: true,
            title: "联系我们-鹿邑心脑血管医院"
        }
    },


]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.meta.title){
        document.title=to.meta.title
        next()
    }else {
        next()
    }
})

router.afterEach(()=>{
    window.scrollTo(0,0)
})

export default router
