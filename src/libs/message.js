import { Message } from "view-design";
const M = {
  /**
   * @param msg 提示信息
   */
  error(msg) {
    Message.error({ background: true, content: msg });
  },
  info(msg) {
    Message.info({ background: true, content: msg });
  },
  warn(msg) {
    Message.warning({ background: true, content: msg });
  },
  success(msg) {
    Message.success({ background: true, content: msg });
  },
};
export default M;
