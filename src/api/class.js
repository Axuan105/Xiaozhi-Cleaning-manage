import request from '@/utils/request'
// 获取类目
export const classApi = (data) => request.get('/dish/dishs/getlm',{params:data})
//添加
export const addclssApi = data => request.post('/dish/dishs/addlm',data)
//修改
export const xglmApi = data => request.put('/dish/dishs/xglm',data)
//删除
export const delmApi = id => request.delete('dish/dishs/delm/'+id)