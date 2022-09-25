import request from '@/utils/request'

/**
 * 图片验证码的请求(不能发axios请求否则会乱码)
 * @param {String} random 请求携带的随机数
 * @returns
 */
export const codeAPI = (clientToken) => {
  return request({
    url: `user-service/user/imageCode/${clientToken}`,
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 发送登录请求
 * @param {String} loginName 用户名
 * @param {String} password  密码
 * @param {String} mobile 客户端登录需要提供
 * @param {String} code   验证码
 * @param {String} clientToken 客户端请求验证码的token，两个后台登录需要提供
 * @param {integer} loginType 登录类型 0：后台；1：运营运维端；2：合作商后台
 * @param {String} account 账号(合作商登录需要，手机号)
 * @returns
 */
export const loginAPI = (data) => {
  return request({
    url: 'user-service/user/login',
    method: 'POST',
    data
  })
}
