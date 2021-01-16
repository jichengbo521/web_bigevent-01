$(function() {
    // 1.获取用户信息,并渲染用户名和头像
    getUserInfo()
        // 2.退出的那个录功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //框架提供的询问框
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地token
            localStorage.removeItem("token")
                // 2。页面跳转
            location.href = '/login.html'
                // 3.关闭询问框
            layer.close(index);
        });
    })
})

// 封装一个 获取用户信息 并且渲染用户名和头像方法
// 必须是去全局函数 后面页面要调用
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     AUthorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功 渲染头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 1.渲染名称(nickname优先,如归没有,就用username)
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
        // 2.渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $(".text-avatar").hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $(".texte-avatar").show().html(text)
    }
}