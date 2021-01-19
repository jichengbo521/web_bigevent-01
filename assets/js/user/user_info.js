$(function() {
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1-6之间！";
            }
        }
    })
    initUserInfo()
        // 用户渲染
        // 导出layer
    var layer = layui.layer
        // 封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单数据 给form表单绑定reser事件 给重置按钮绑定click事件、
    // 不要给form绑成click 不要给button邦成reset
    $('#btnReset').on('click', function(e) {
            //  阻止重置
            e.preventDefault()
                // 从新用户渲染
            initUserInfo()
        })
        // 提交用户信息
        // 导出layer
    var layer = layui.layer
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 更新成功,渲染父页面信息
                // window.parent获取的是iframe
                window.parent.getUserInfo()
            }
        })
    })
})