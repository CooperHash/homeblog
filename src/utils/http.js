import axios from 'axios'
let instance = axios.create({baseURL: "http://localhost:3004/all"})
instance.interceptors.request.use(
  config => {
    if (localStorage.getItem("user_token") !== null) { //判断token是否存在
      config.headers["Authorization"] = 'Bearer ' + localStorage.getItem("user_token");  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  config => {
    if (localStorage.getItem("user_token")) { //判断token是否存在
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("user_token");  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
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