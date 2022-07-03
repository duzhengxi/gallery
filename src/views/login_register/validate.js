/**
 * 用户名的表单校验
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名不能为空'
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名应该在3至12位之间'
  }
  return true
}
export const validatePassword = (val) => {
  if (!val) {
    return '密码不能为空'
  }
  if (val.length < 6 || val.length > 12) {
    return '密码应该在6至12位之间'
  }
  return true
}
/**
 * 确认密码的表单校验 需要导入vee中defineRule(帮助我们插入一条校验规则)password：关联的值   value：输入的值
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
