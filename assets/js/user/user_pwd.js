$(function() {
    // 定义面规则（3个）
    var form = layui.form
    form.verify({
        // 所有密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 新密码
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码和旧密码不能相同';
            }
        },
        // 确认密码
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入的不一致'
            }
        }
    })

    // 提交修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 修改密码成功
                layui.layer.msg('修改密码成功！')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})