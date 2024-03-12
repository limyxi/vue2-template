export default {
  methods: {
    showChildren(item) {
      return item.children && item.children.length > 0;
    },
    showTitle(item) {
      return item.children && item.children[0]
        ? item.children[0].text
        : item.text;
    },
  },
};
