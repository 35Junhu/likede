import axios from 'axios'

// 创建实例化axios
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default request
