import request from '@/utils/request'
// 获取服务
export const AdminApi = (data) => request.get('dish/dishs/getdata',{params:data})
//添加
export const addinApi = data => request.post('/dish/dishs/adddata',data)
//修改
export const xginApi = data => request.put('/dish/dishs/putdata',data)
//删除
export const deinApi = id => request.delete('/dish/dishs/dedata/'+id)
//类目
export const classApi = (data) => request.get('/dish/dishs/getlmm',{params:data})
// 上下架
export const sjxjApi = (data) => request.post('/dish/dishs/xjsj',data)
//热门推荐
export const tjrmApi = (data) => request.post('/dish/dishs/rmtj',data)