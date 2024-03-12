export const TbUtil = {
  /**
   * @value 需要显示内容
   * @note 提示
   * @description 字段超出用省略号显示
   */

  longFieldRender(h, value, note) {
    return h(
      "Tooltip",
      {
        props: {
          maxWidth: "300",
          content: (note ? note + "：" : "") + (value || ""),
          transfer: true,
        },
        style: {
          width: "100%",
        },
      },
      [
        h(
          "nobr",
          {
            class: "table-nobr",
          },
          value
        ),
      ]
    );
  },
  /**
   * @description 表格内操作按钮
   */
  btnRender(h, opt) {
    return h(
      "Button",
      {
        props: {
          type: opt.type ? opt.type : "primary",
          ghost: opt.ghost ? opt.ghost : true,
          size: opt.size ? opt.size : "small",
        },
        on: {
          click: () => {
            opt.clickFun();
          },
        },
      },
      opt.text
    );
  },
  /**
   * @description 表格内操作按钮 poptip确认
   */
  btnPopRender(h, opt) {
    return h(
      "Poptip",
      {
        props: {
          confirm: opt.confirm ? opt.confirm : true,
          transfer: opt.transfer ? opt.transfer : true,
          placement: opt.placement ? opt.placement : "left-start",
          title: opt.title ? opt.title : "确定要删除吗？",
          type: opt.type ? opt.type : "error",
          size: opt.size ? opt.size : "small",
          width: opt.width ? opt.width : "200",
          vModel: true,
        },
        class: "table-poptip",
        on: {
          "on-ok": () => {
            opt.clickFun();
          },
        },
      },
      [
        h(
          "Button",
          {
            props: {
              type: opt.type ? opt.type : "error",
              ghost: opt.ghost ? opt.ghost : true,
              size: opt.size ? opt.size : "small",
            },
          },
          opt.text ? opt.text : "删除"
        ),
      ]
    );
  },
};
