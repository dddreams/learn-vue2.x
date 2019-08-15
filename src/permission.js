import router from './router'
import store from './store'

const whiteList = ['/', '/login', '/exit', '/error']

router.beforeEach(async(to, from, next) => {
    let path = to.path;
    if(whiteList.indexOf(path)>-1){
        if(path.indexOf('/exit') != -1){
            store.dispatch('Logout')
        }
        next()
    } else {
        // let arr = Object.keys(store.getters.userInfo)
        // if(arr.length === 0){
        //     store.dispatch('getUserInfo').then(async () => {
        //         await store.dispatch('getIndexMenu', {areaCode: store.getters.areaCode})
        //         await store.dispatch('getResRight', {})
        //         next()
        //     }, () => {
        //         next({path: 'error'})
        //     });
        // }else {
        //     next()
        // }
        next()
    }
})
