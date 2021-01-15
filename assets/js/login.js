$(function() {
    // 1.点击去注册账号按钮,隐藏登陆区域 显示注册区域
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show()
        })
        // 2.点击去登陆,显示登陆区域,隐藏注册区域
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide()
        })
        // 从layui中获取form对象
    var form = layui.form
        // 通过form.verify()函数自定义校验规则
    form.verify({
            // 自定义了一个叫pwd的校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须是6-12位且不能出现空格'],
            // 校验量词密码是一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后在进行一次等于得判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box input[name=password]').val()
                if (value !== pwd) {
                    return '两次密码不一致'
                }
            }

        })
        //3. 监听注册事件
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
            // 阻止默认提价行为
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: {
                    username: $('.reg-box [name=username]').val(),
                    password: $('.reg-box [name=password]').val(),
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)

                    }
                    // 提交成功后处理代码
                    layer.msg('注册成功,请登录');
                    // 跳转至登录页面
                    $('#link_login').click()
                        // 重置form
                    $('#form_reg')[0].reset()
                }
            })
        })
        // 监听登陆表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                // 校验返回的状态
                if (res.status !== 0) return layer.msg(res.message)
                    // 提示信息 保存token 跳转页面
                layer.msg('登陆成功')
                    // 保存token 未来的接口要是用token
                localStorage.setItem('token', res.token)
                    // 跳转
                location.href = '/code/index.html'
            }

        })
    })

})