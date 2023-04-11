// 详情
import request from '@/utils/request'
// 获取
export const yxqApi = (data) => request.get('/dish/dishs/gethyxx',data)
//删除用户
export const deyhApi = id => request.delete('dish/dishs/deljs/'+id)
// 修改用户
export const yhxqApi = (data) => request.put('/dish/dishs/putjs',data)
// 查询
export const cxyhApi = (data) => request.post('/dish/dishs/ssxx',data)
// 修改状态
export const xgyhApi = (data) => request.put('/dish/dishs/xglh',data)
// 获取角色
export const getjspi = (id) => request.post('dish/dishs/getjs',id)
//保存添加角色
export const putjspi =data => request.put('dish/dishs/putjs',data)