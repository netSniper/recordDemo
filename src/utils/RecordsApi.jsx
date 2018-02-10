import axios from 'axios';
export const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000"
//获取数据列表
export const getAll = ()=>axios.get(`${api}/record`);
//插入数据
export const create = (body)=>axios.post(`${api}/record`,body);
//更新某条数据
export const update = (id,body)=>axios.put(`${api}/record/${id}`,body);