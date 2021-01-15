// 每次帝爱用$.get()或者$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
var baseURL = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function(options) {
    console.log(options.ur);
    // 再真正的Ajax请求之前统一拼接请求的路径
    options.url = baseURL + options.url
})