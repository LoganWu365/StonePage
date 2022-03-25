let $siteList = $('.siteList');
let $lastLi = $(".siteList").find("li").eq(-1);
let x = localStorage.getItem("x");
let xObject = JSON.parse(x);
let hashMap = xObject || [
  {
    logo: "B",
    url: "https://www.baidu.com",
  },
  {
    logo: "G",
    url: "https://www.google.com",
  },
];
let simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};
let render = () => {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach((node, index) => {
    let $newLi = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
                </svg>
            </div>
          </div>
      </li>`).insertBefore($lastLi);
    $newLi.on('click',()=>{
        window.open(node.url,'_self');
      });
    $newLi.on('click','.close',(e)=>{
      e.stopPropagation();
      hashMap.splice(index,1);
      render();
    })
  });
};
render();
$(".addWebsite").click(() => {
  let url = window.prompt("请问你要输啥网址!");
  if(url.indexOf('www.') === 0){
    url = 'https://' + url;
  }else if(url.indexOf('www') === -1){
    url = 'https://www.' + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  let string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
//绑定键盘事件
$(document).on('keypress',(e)=>{
  let {key} = e;
  for(let i = 0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase() === key){
      window.open(hashMap[i].url);
      break;//只打开第一个符合的网页
    }
  }
});
