// 详情
import request from '@/utils/request'
// 获取
export const xqApi = (data) => request.post('/dish/dishs/logoxq',data)
//添加
export const addxqApi = data => request.post('/dish/dishs/addxq',data)
//修改
// export const xglmApi = data => request.put('/dish/dishs/xglm',data)
//删除
// export const delmApi = id => request.delete('dish/dishs/delm/'+id)