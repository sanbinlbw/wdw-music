import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            //路径为空时跳到发现音乐
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
                    redirect: '/musicHome/findMusic/personRecom',
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
                },
                {
                    path: '/musicHome/searchPage',
                    name: 'searchPage',
                    redirect: '/musicHome/searchPage/searchBySong',
                    component: () =>
                        import ('@/views/musicHome/searchPage/searchPage'),
                    children: [{
                            path: '/musicHome/searchPage/searchBySong',
                            name: 'searchBySong',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchBySong')
                        },
                        {
                            path: '/musicHome/searchPage/searchBySinger',
                            name: 'searchBySinger',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchBySinger')
                        },
                        {
                            path: '/musicHome/searchPage/searchByVideo',
                            name: 'searchByVideo',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchByVideo')
                        },
                        {
                            path: '/musicHome/searchPage/searchByAlbum',
                            name: 'searchByAlbum',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchByAlbum')
                        },
                    ]
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {

// })
export default router