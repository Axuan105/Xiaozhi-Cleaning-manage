import request from '@/utils/request'
// 首页轮播图
export const ingApi = () => request.get('/dish/dishs/picture')
// 删除
export const getingApi = id => request.delete('/dish/dishs/sclogo/'+id)
//添加图片
export const addingApi = data => request.post('/dish/dishs/addlogo',data)
// 修改
export const modifyingApi = data => request.put('/dish/dishs/putlogo',data)
