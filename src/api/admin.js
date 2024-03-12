import http from "../libs/http";
export default {
  //超级后台用户登录
  userLogin(params) {
    return http.get(`/admin/user/login`, params);
  },
  //日志管理-列表
  getLog(params) {
    return http.get(`/admin/log/index`, params);
  },
  //数据字典分类-列表(无分页)
  getDictionaryCategory(params) {
    return http.get(`/admin/dictionaryCategory/list`, params);
  },
  //数据字典分类-添加
  addDictionaryCategory(params) {
    return http.post(`/admin/dictionaryCategory/add`, params);
  },

  //数据字典-添加
  addDictionary(params) {
    return http.post(`/admin/dictionary/add`, params);
  },
  //数据字典-编辑
  editDictionary(params) {
    return http.post(`/admin/dictionary/edit`, params);
  },

  //权限管理-功能-列表
  getActionList(params) {
    return http.get(`/admin/action/index`, params);
  },
  //权限管理-功能-同步功能
  syncAction(params) {
    return http.get(`/admin/action/sync`, params);
  },
  //权限管理-功能-树(列表)
  getActionTree(params) {
    return http.get(`/admin/action/list`, params);
  },

  //系统管理-权限管理-列表
  getPrivilegeList(params) {
    return http.get(`/admin/privilege/list`, params);
  },
  //系统管理-权限管理-添加
  addPrivilege(params) {
    return http.post(`/admin/privilege/add`, params);
  },
  //系统管理-权限管理-编辑
  editPrivilege(params) {
    return http.post(`/admin/privilege/edit`, params);
  },
  //系统管理-权限管理-查看
  viewPrivilege(params) {
    return http.get(`/admin/privilege/view`, params);
  },
  //系统管理-权限管理-删除
  trashPrivilege(params) {
    return http.get(`/admin/privilege/trash`, params);
  },
};
