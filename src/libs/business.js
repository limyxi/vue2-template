/**
 * 业务相关工具类
 */

import Vue from "vue";
import BatchQRCodeDialog from "@/components/business/BatchQRCodeDialog";

/**
 * 打开批量打印二维码的弹框
 *
 * @param title {string} 弹框标题
 * @param data {{content: string, desc: string[]}[]} 用于生成二维码数据的数组
 * @return {Promise}
 */
export function startBatchPrintQRCode(title, data) {
  const Constructor = Vue.extend(BatchQRCodeDialog);

  return new Promise((resolve) => {
    const dialog = new Constructor({ propsData: { title, onClose: resolve } });
    dialog.$mount();
    dialog.open(data);
  });
}
