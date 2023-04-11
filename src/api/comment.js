import request from '@/utils/request'
// 获取评论
export const pjApi = (data) => request.get('/dish/dishs/getpj',{params:data})
//删除评论
export const depjApi = id => request.delete('dish/dishs/delpj/'+id)