import axios from 'axios';
export const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000"

export const getAll = ()=>axios.get(`${api}/record`);