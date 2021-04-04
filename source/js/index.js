const url='https://challenge.thef2e.com/api/thef2e2019/stage6/';
const token='1ujOhhjO8doC3146McKZPgkJqoEc7EdCPX1mbZj9MxFzJynuQoKtMOLFCYdX';
const roomList = document.querySelector('.roomList');


let roomData=[];

//取得資料，渲染至頁面
axios.defaults.headers.common.Authorization = `Bearer ${token}`;
axios.get(`${url}rooms`).then(function(res){
  let content=``;
  roomData=res.data.items;
  roomData.forEach(function(item){
    let str=``;
    str=`
    <li class='position-relative'><a href="./source/roomIntro.html?id=${item.id}">
    <div class='roomImg' style="background-image:url(${item.imageUrl})"></div>
    <div class='cardInfo position-absolute d-flex justify-content-between align-items-center px-2 py-3 text-secondary'><h2 class='mb-0'>${item.name}</h2><p class='mb-0'>$ ${item.normalDayPrice} <span>up</span></p></div>
    </a></li>`
    content += str;
    console.log(str);
  })
  roomList.innerHTML=content;
})





