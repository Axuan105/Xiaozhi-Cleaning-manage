// 详情
import request from '@/utils/request'
// 获取
export const jsApi = (data) => request.get('/dish/dishs/getjss',data)
// tj
export const tjjsApi = (data) => request.post('/dish/dishs/addjs',data)
//删除用户
export const dejsApi = id => request.delete('dish/dishs/deljss/'+id)
// // 修改用户
export const jsxqApi = (data) => request.put('/dish/dishs/putjss',data)
// // 查询
export const cxjsApi = (data) => request.get('/dish/dishs/oneqx',data)
export const cxjsApi2 = (data) => request.get('/dish/dishs/twoqx',data)
export const cxjsApi3 = (data) => request.get('/dish/dishs/threexq',data)

// // 修改状态
// export const xgyhApi = (data) => request.put('/dish/dishs/xglh',data)
// // 获取角色
// export const getjspi = (id) => request.post('dish/dishs/getjs',id)
// //保存添加角色
// export const putjspi =data => request.put('dish/dishs/putjs',data)