import request from '@/utils/request'
// 注册
export const loginApi = data => request.post('/admin/auth/register', data)
// 登录
export const getInfoApi = data => request.post('/admin/auth/sign', data)
export const getyhxxApi = data => request.get('/admin/auth/getyhxx', data)