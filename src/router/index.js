import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
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
            children: [
                // 发现音乐模块
                {
                    path: '/musicHome/findMusic',
                    name: 'findMusic',
                    redirect: '/musicHome/findMusic/personRecom',
                    component: () =>
                        import ('@/views/musicHome/findMusic/findMusic'),
                    children: [
                        // 个性推荐
                        {
                            path: '/musicHome/findMusic/personRecom',
                            name: 'personRecom',
                            component: () =>
                                import ('@/views/musicHome/findMusic/personRecom/personRecom')
                        },
                        // 歌单
                        {
                            path: '/musicHome/findMusic/songList/',
                            name: 'songList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/songList/songList')
                        },
                        // 排行榜
                        {
                            path: '/musicHome/findMusic/playList',
                            name: 'playList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/playList/playList')
                        },
                        // 歌手
                        {
                            path: '/musicHome/findMusic/singerList',
                            name: 'singerList',
                            component: () =>
                                import ('@/views/musicHome/findMusic/singerList/singerList')
                        },
                        // 最新音乐
                        {
                            path: '/musicHome/findMusic/newSong',
                            name: 'newSong',
                            component: () =>
                                import ('@/views/musicHome/findMusic/newSong/newSong')
                        }
                    ]
                },
                // 推荐视频模块
                {
                    path: '/musicHome/recomVideo',
                    name: 'recomVideo',
                    redirect: '/musicHome/recomVideo/mv',
                    component: () =>
                        import ('@/views/musicHome/recomVideo/recomVideo'),
                    children: [
                        // 视频
                        {
                            path: '/musicHome/recomVideo/video',
                            name: 'videoPage',
                            component: () =>
                                import ('@/views/musicHome/recomVideo/videoPage/videoPage')
                        },
                        // mv
                        {
                            path: '/musicHome/recomVideo/mv',
                            name: 'mvPage',
                            component: () =>
                                import ('@/views/musicHome/recomVideo/mvPage/mvPage')
                        },
                    ]
                },
                // 我的音乐云盘模块
                {
                    path: '/musicHome/myCloudMusic',
                    name: 'myCloudMusic',
                    component: () =>
                        import ('@/views/musicHome/myCloudMusic/myCloudMusic')
                },
                // 我喜欢的音乐模块
                {
                    path: '/musicHome/myFavoriteMusic',
                    name: 'myFavoriteMusic',
                    component: () =>
                        import ('@/views/musicHome/myFavoriteMusic/myFavoriteMusic')
                },
                // 搜索页面模块
                {
                    path: '/musicHome/searchPage',
                    name: 'searchPage',
                    redirect: '/musicHome/searchPage/searchBySong',
                    component: () =>
                        import ('@/views/musicHome/searchPage/searchPage'),
                    children: [
                        // 歌曲
                        {
                            path: '/musicHome/searchPage/searchBySong',
                            name: 'searchBySong',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchBySong')
                        },
                        // 歌手
                        {
                            path: '/musicHome/searchPage/searchBySinger',
                            name: 'searchBySinger',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchBySinger')
                        },
                        // 视频
                        {
                            path: '/musicHome/searchPage/searchByVideo',
                            name: 'searchByVideo',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchByVideo')
                        },
                        // 专辑
                        {
                            path: '/musicHome/searchPage/searchByAlbum',
                            name: 'searchByAlbum',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchByAlbum')
                        },
                        // 歌单
                        {
                            path: '/musicHome/searchPage/searchBySongList',
                            name: 'searchBySongList',
                            component: () =>
                                import ('@/components/musicHome/searchPage/searchBySongList')
                        },
                    ]
                },
                // 歌单详情模块
                {
                    path: '/musicHome/songList/:id',
                    component: () =>
                        import ('@/views/musicHome/songListPage/songListPage'),
                },
                // 歌手详情模块
                {
                    path: '/musicHome/artistPage/:id',
                    component: () =>
                        import ('@/views/musicHome/artistPage/artistPage'),
                },
                // 专辑详情模块
                {
                    path: '/musicHome/albumPage/:id',
                    component: () =>
                        import ('@/views/musicHome/album/albumPage'),
                },
                // 全部MV模块
                {
                    path: '/musicHome/allMv',
                    name: 'allMv',
                    component: () =>
                        import ('@/views/musicHome/allMv/allMv'),
                },
                // 视频详情模块
                {
                    path: '/musicHome/videoPage/:id',
                    component: () =>
                        import ('@/views/musicHome/videoPage/videoPage'),
                },
                // 歌曲详情模块
                {
                    path: '/musicHome/songDetail',
                    component: () =>
                        import ('@/views/musicHome/songDetail/songDetail'),
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {

// })
export default router