// 每次帝爱用$.get()或者$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
var baseURL = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function(options) {

    // 再真正的Ajax请求之前统一拼接请求的路径
    // 1.添加路径前缀
    options.url = baseURL + options.url;
    // 2.给有权限的路径添加头信息
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            AUthorization: localStorage.getItem("token") || ""
        };
    }
    // 3.拦截所有响应,判断身份认证信息
    options.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message === '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = "/login.html"
        }
    }
})