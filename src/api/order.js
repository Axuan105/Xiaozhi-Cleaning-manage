import request from '@/utils/request'
//获取订单
export const orinApi = (data) => request.get('dish/dishs/getdd',{params:data})
//删除
export const ordinApi = id => request.delete('/dish/dishs/deldd/'+id)
//修改状态
export const orxgApi = (data) => request.put('dish/dishs/putdd',data)