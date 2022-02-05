import request from "@/utils/request";

// 物性表 列表
export function getDatasheetList(params) {
  return request({
    url: "/datasheet/list/",
    method: "get",
    params,
  });
}

// 添加 物性表 列表
export function addDatasheetList(params) {
  return request({
    url: "/datasheet/list/",
    method: "post",
    data: params,
  });
}

//修改 物性表 列表
export function updateDatasheetList(params) {
    return request({
      url: "/datasheet/list/",
      method: "put",
      data: params,
    });
  }
