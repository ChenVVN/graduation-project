import request from "@/utils/request";

// 填充物 列表
export function getFillerList(params) {
  return request({
    url: "/filler/list/",
    method: "get",
    params,
  });
}

// 添加 
export function addFillerList(params) {
  return request({
    url: "/filler/list/",
    method: "post",
    data: params,
  });
}

//修改 
export function updateFillerList(params) {
  return request({
    url: "/filler/list/",
    method: "put",
    data: params,
  });
}
