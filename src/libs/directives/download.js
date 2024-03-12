import { baseUrl } from "@/config";
const download = {
  inserted: (el, binding) => {
    el.style.cssText = "cursor: pointer;color:write;";
    el.addEventListener("click", () => {
      console.log(binding.value);
      let link = document.createElement("a");
      let url = baseUrl.dev + binding.value;
      // 这里是将url转成blob地址，
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          const test = new Blob([blob], { type: "application/vnd.ms-excel" });
          link.href = URL.createObjectURL(test);
          console.log(link.href);
          // link.download = '测试.xlxs'
          console.log(link);
          document.body.appendChild(link);
          link.click();
        });
    });
  },
};
export default download;
