/**
 * 表单验证
 * @param {String}
 * @param {String}
 * @param {Integer}
 * @param {Integer}
 * @return {Object} 包含status和info
 */
function validate(kind, str, minLength = 5, maxLength = 18) {
  let res = {}, reg;
  switch (kind) {
    // 验证邮箱
    case 'email':
      reg = /^([\w_-])+@([\w_-])+(.[\w_-])+/;
      if (str.length === 0) {
        res.status = false;
        res.info = '邮箱不能为空';
      } else if (str.length < minLength) {
        res.status = false;
        res.info = `邮箱长度不能小于${minLength}`;
      } else if (str.length > maxLength) {
        res.status = false;
        res.info = `邮箱长度不能大于${maxLength}`;
      } else {
        if (reg.test(str)) {
          res.status = true;
        } else {
          res.status = false;
          res.info = '邮箱格式错误';
        }
      }
      return res;
      break;
    // 验证用户名
    case 'username':
      reg = /^([\w_-])+/;
      if (str.length === 0) {
        res.status = false;
        res.info = '用户名不能为空';
      } else if (str.length < minLength) {
        res.status = false;
        res.info = `用户名长度不能小于${minLength}`;
      } else if (str.length > maxLength) {
        res.status = false;
        res.info = `用户名长度不能大于${maxLength}`;
      } else {
        if (reg.test(str)) {
          res.status = true;
        } else {
          res.status = false;
          res.info = '用户名格式错误';
        }
      }
      return res;
      break;
    // 验证密码
    case 'password':
      reg = /^([\w_-])+/;
      if (str.length === 0) {
        res.status = false;
        res.info = '密码不能为空';
      } else if (str.length < minLength) {
        res.status = false;
        res.info = `密码长度不能小于${minLength}`;
      } else if (str.length > maxLength) {
        res.status = false;
        res.info = `密码长度不能大于${maxLength}`;
      } else {
        if (reg.test(str)) {
          res.status = true;
        } else {
          res.status = false;
          res.info = '密码格式错误';
        }
      }
      return res;
      break;
    default:
      break;
  }


}

module.exports = validate;
