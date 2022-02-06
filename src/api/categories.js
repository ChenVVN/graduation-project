import request from "@/utils/request";

// 材料种类 列表
export function getCategoriesList(params) {
  return request({
    url: "/categories/",
    method: "get",
    params,
  });
}

// 添加
export function addCategoriesList(params) {
  return request({
    url: "/categories/",
    method: "post",
    data: params,
  });
}

//修改
export function updateCategoriesList(params) {
  return request({
    url: "/categories/",
    method: "put",
    data: params,
  });
}
