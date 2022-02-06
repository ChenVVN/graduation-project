import request from "@/utils/request";

// 应用分类 列表
export function getApplicationList(params) {
  return request({
    url: "/application/",
    method: "get",
    params,
  });
}

// 添加 
export function addApplicationList(params) {
  return request({
    url: "/application/",
    method: "post",
    data: params,
  });
}

//修改 
export function updateApplicationList(params) {
  return request({
    url: "/application/",
    method: "put",
    data: params,
  });
}