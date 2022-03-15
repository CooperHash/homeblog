import axios from 'axios'
let instance = axios.create({baseURL: "https://homeblog.top/all"})
// 请求拦截器
// instance.interceptors.request.use((config) => {
//   	const token = this.$store.state.token;
//   	config.headers.authorization = token;
//   	return config;
// }, (err) => {
//   	return Promise.reject(err);
// })
// 响应拦截器
// instance.interceptors.response.use((response) => {
//   	if(response.data.code == '200') {     	
//     }
//   	return response;
// }, (err) => {
//   	return Promise.reject(err.response.status)
// })

export default instance;