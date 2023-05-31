import BaseAxios from "../base_axios";
import ResHelper from "../ResHelper";

export const getLogMessage = (page:number)=>{
    // return BaseAxios.get(`/log/queryPage?page=${page}`).then(ResHelper)
    return BaseAxios({
        url: '/log/queryLog',
        method: "get",
        params:{
            page:page
        }
    }).then(ResHelper)
}
export const getNoLogMessage = (page:number)=>{
    return BaseAxios({
        url: '/log/queryNoLog',
        method: "get",
        params:{
            page:page
        }
    }).then(ResHelper)
}