let baseUrl;
let routeBase;
let publicPath;
switch (process.env.VUE_APP_TITLE) {
  case "test":
    baseUrl = "/test/api";
    routeBase = "/test/";
    publicPath = "/test";
    break;
  case "production":
    baseUrl = "/api";
    routeBase = "/";
    publicPath = "/";
    break;
  default:
    baseUrl = "/api";
    routeBase = "/";
    publicPath = "/";
}

module.exports = {
  baseUrl: baseUrl,
  routeBase: routeBase,
  publicPath: publicPath,
};
