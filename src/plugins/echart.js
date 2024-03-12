//按需引入
// 引入 ECharts 主模块
let echarts = require("echarts/lib/echarts");
// 引入折线图/柱状图等组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll"); //图例滚动

export default echarts;
