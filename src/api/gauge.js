import request from '@/utils/request'
// 获取规格
export const gauApi = (data) => request.get('/dish/dishs/getgg',{params:data})
//添加
export const addgauApi = data => request.post('/dish/dishs/addgg',data)
//修改
export const xggauApi = data => request.put('/dish/dishs/putgg',data)
//删除
export const degauApi = id => request.delete('dish/dishs/delgg/'+id)