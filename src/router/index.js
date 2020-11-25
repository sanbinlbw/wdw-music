import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '',
            redirect: '/musicHome/findMusic',
        },
        {
            path: '/musicHome',
            name: 'musicHome',
            component: () =>
                import ('@/views/musicHome'),
            children: [{
                    path: '/musicHome/findMusic',
                    name: 'findMusic',
                    component: () =>
                        import ('@/views/musicHome/findMusic/findMusic')
                },
                {
                    path: '/musicHome/recomVideo',
                    name: 'recomVideo',
                    component: () =>
                        import ('@/views/musicHome/recomVideo/recomVideo')
                },
                {
                    path: '/musicHome/myCloudMusic',
                    name: 'myCloudMusic',
                    component: () =>
                        import ('@/views/musicHome/myCloudMusic/myCloudMusic')
                },
                {
                    path: '/musicHome/myFavoriteMusic',
                    name: 'myFavoriteMusic',
                    component: () =>
                        import ('@/views/musicHome/myFavoriteMusic/myFavoriteMusic')
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {

// })
export default router