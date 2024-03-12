import http from "../libs/http";
export default {
  userLogin(params) {
    return http.post(`/auth/user/login`, params);
  },
  userIndex(params) {
    return http.get(`/auth/user/index`, params);
  },
  userAdd(params) {
    return http.post(`/auth/user/add`, params);
  },
  userEdit(params) {
    return http.post(`/auth/user/edit`, params);
  },
  userTrash(params) {
    return http.post(`/auth/user/trash`, params);
  },
  userEnable(params) {
    return http.get(`/auth/user/enable`, params);
  },
  userDisable(params) {
    return http.get(`/auth/user/disable`, params);
  },
  userChangePassword(params) {
    return http.post(`/auth/user/changePassword`, params);
  },
  userIndexAuthIgnore(params) {
    return http.get(`/auth/user/indexAuthIgnore`, params);
  },
  userListAuthIgnore(params) {
    return http.get(`/auth/user/listAuthIgnore`, params);
  },
  userEditStatus(params) {
    return http.post(`/auth/user/editStatus`, params);
  },
  //用户管理-用户查看
  userView(params) {
    return http.get(`/auth/user/view`, params);
  },

  //角色管理-检索列表(无分页)
  getRoleList(params) {
    return http.get(`/auth/role/list`, params);
  },
  //角色管理-检索列表(无分页)
  getRoleListAuthIgnore(params) {
    return http.get(`/auth/role/listAuthIgnore`, params);
  },
  //角色管理-新增
  addRole(params) {
    return http.post(`/auth/role/add`, params);
  },
  //角色管理-编辑
  editRole(params) {
    return http.post(`/auth/role/edit`, params);
  },
  //角色管理-查看
  viewRole(params) {
    return http.get(`/auth/role/view`, params);
  },
  //角色管理-删除
  trashRole(params) {
    return http.get(`/auth/role/trash`, params);
  },

  //角色用户-检索列表
  getRoleUserIndex(params) {
    return http.get(`/auth/roleUser/index`, params);
  },
  //角色用户-添加
  addRoleUser(params) {
    return http.post(`/auth/roleUser/add`, params);
  },
  //角色用户-删除
  deleteRoleUserBatch(params) {
    return http.get(`/auth/roleUser/deleteBatch`, params);
  },
  //权限角色-检索列表
  privilegeRoleList(params) {
    return http.get(`/auth/privilegeRole/list`, params);
  },
  //权限角色-添加
  addPrivilegeRole(params) {
    return http.post(`/auth/privilegeRole/add`, params);
  },

  //部门管理-树
  getDepartmentTree(params) {
    return http.get(`/auth/department/tree`, params);
  },
  //部门管理-列表(无权限)
  getDepartmentListAuthIgnore(params) {
    return http.get(`/auth/department/listAuthIgnore`, params);
  },
  //部门管理-新增
  addDepartment(params) {
    return http.post(`/auth/department/add`, params);
  },
  //部门管理-编辑
  editDepartment(params) {
    return http.post(`/auth/department/edit`, params);
  },
  //部门管理-详情
  viewDepartment(params) {
    return http.get(`/auth/department/view`, params);
  },
  //部门管理-删除
  trashDepartment(params) {
    return http.post(`/auth/department/trash`, params);
  },
};
