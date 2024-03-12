<script>
/**
 * 简单表格的添加一行抽取
 */
export default {
  name: "SimpleTableAddTr",

  functional: true,

  props: {
    // 操作按钮跨的列数，一般认为是该表格的总列数
    colspan: { type: [Number, String], default: 1 },
  },

  render(h, context) {
    const {
      data,
      props: { colspan },
    } = context;

    return (
      <tr class="cus-tbody operate" {...data}>
        <td colspan={colspan}>
          <Icon type="md-add-circle" size="20" />
          添加一行
        </td>
      </tr>
    );
  },
};
</script>
