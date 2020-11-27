import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '',
            redirect: '/musicHome/findMusic/personRecom',
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
                        import ('@/views/musicHome/findMusic/findMusic'),
                    children: [{
                            path: '/musicHome/findMusic/personRecom',
                            name: 'personRecom',
                            component: () =>
                                import ('@/views/musicHome/findMusic/personRecom/personRecom')
                        },
                        {
                            path: '/musicHome/findMusic/songList',
                            name: 'songList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/songList/songList')
                        },
                        {
                            path: '/musicHome/findMusic/playList',
                            name: 'playList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/playList/playList')
                        },
                        {
                            path: '/musicHome/findMusic/singerList',
                            name: 'singerList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/singerList/singerList')
                        },
                        {
                            path: '/musicHome/findMusic/newSong',
                            name: 'newSong',
                            component: () =>
                                import ('@/views/musicHome/findMusic/newSong/newSong')
                        }
                    ]
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