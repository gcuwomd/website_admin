/*
 * @Author: lzp
 * @Date: 2023-01-25 09:38:41
 * @LastEditors: lzp
 * @LastEditTime: 2023-01-26 16:59:36
 * @Description: Do not edit
 */
import { AxiosInstance } from "axios";
import { TOKEN_NAME, TOKEN_PREFIX, NOT_TOKEN_URL } from "../const";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { c } from "naive-ui";
const router = useRouter();
export function setInterceptors(axios: AxiosInstance) {
    // 添加请求拦截器
    axios.interceptors.request.use(
        function (config) {
            // 在发送请求之前做些什么
            if (!NOT_TOKEN_URL.includes(config.url!)) {
                const token = localStorage.getItem("token")
                // 需要加 Token 的 API
                if (token==="") {
                    
                    return Promise.reject("你登录信息失效");
                }
                config.headers![TOKEN_NAME] = TOKEN_PREFIX + token;
            }
            
            return config;
        },

        function (error) {
            // 对请求错误做些什么
            console.log(error);
            
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    axios.interceptors.response.use(
        function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            // Token 过期
            if (response.data.code === 401) {
                router.push({ name: "Login" });
            }
            
            return response;
        },
        function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            // const status = error.response.status;
            console.log(error);
            
            // if (status == 500) {
                return Promise.reject(new Error("响应错误"));
            // }
        }
    );
}
