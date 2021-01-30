import Vue from 'vue'
//全局过滤器(秒数转化为分钟)
Vue.filter('timeFormat', function(time) {

        //分钟
        var minute = time / 60;
        var minutes = parseInt(minute);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        //秒
        var second = time % 60;
        var seconds = Math.floor(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
    })
    //全局vue过滤器(时间戳过滤器)
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDay() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})