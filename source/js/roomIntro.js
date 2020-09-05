const url='https://challenge.thef2e.com/api/thef2e2019/stage6/';
const token='1ujOhhjO8doC3146McKZPgkJqoEc7EdCPX1mbZj9MxFzJynuQoKtMOLFCYdX';
const roomMenu = document.querySelector('.roomMenu');
const search = document.querySelector('.search');
const roomName = document.querySelector('.roomName');
const roomInfoImg = document.querySelector('.roomInfoImg');
const roomDetail = document.querySelector('.roomDetail');
const searchMessage = document.querySelector('.searchMessage');


const total = document.querySelector('.total');
const reserveNotice = document.querySelector('.reserveNotice');
const submit = document.querySelector('.submit');

let roomsData=[];
let roomInforData=[];
let roomServeRecord=[];
let id = window.location.href.split('=')[1];


axios.defaults.headers.common.Authorization = `Bearer ${token}`;
axios.get(`${url}rooms`).then(function(res){
    let content=''
    roomsData=res.data.items;
    roomsData.forEach(function(item){
        content += `<li class='mb-3'><a class='text-white' href="roomIntro.html?id=${item.id}">${item.name}</a></li>`
    })
    roomMenu.innerHTML=content;
})




axios.get(`${url}room/${id}`).then(function(res){
    roomInforData=res.data.room[0];
    if(('booking' in res.data) == true){
        roomServeRecord=res.data.booking;
    }
    let service = roomInforData.amenities;
    let serviceItem = Object.keys(service);
    let serviceContent='';
    let roomtype = roomInforData.descriptionShort;
    let roomtypeItem = Object.keys(roomtype);
    let roomtypeContent='';
    let checkTime = roomInforData.checkInAndOut;
    roomtypeItem.forEach(function(item){
        if((item !=='GuestMax')&&(item !=='GuestMin')){
            if(item=='Bed'){
                roomtypeContent +=`<li><i class="fas fa-bed text-primary mr-2"></i><p class='text-white'>${roomtype[item]}</p></li>`
            }else if(item == 'Private-Bath'){
                roomtypeContent +=`<li><i class="fas fa-bath text-primary mr-2"></i><p class='text-white'>${roomtype[item]}</p></li>`
            }else if(item =='Footage'){
                roomtypeContent +=`<li><i class="fas fa-users text-primary mr-2"></i><p class='text-white'>${roomtype[item]}ft</p></li>`
            }
        }
    })
    roomtypeContent += `
    <li><i class='fas fa-users text-primary mr-2'></i><p class='text-white'>${roomtype['GuestMin']}-${roomtype['GuestMax']} Guest</p></li>
    `

    serviceItem.forEach(function(item){
        let serviceIcon = ''
        if(item=='Wi-Fi'){
            serviceIcon = `<i class="fas fa-wifi mr-2"></i>`
        }else if(item=='Breakfast'){
            serviceIcon = `<i class="fas fa-utensils mr-2"></i>`
        }else if(item=='Mini-Bar'){
            serviceIcon = `<i class="fas fa-glass-cheers mr-2"></i>`
        }else if(item=='Room-Service'){
            serviceIcon = `<i class="fas fa-concierge-bell mr-2"></i>`
        }else if(item=='Television'){
            serviceIcon = `<i class="fas fa-tv mr-2"></i>`
        }else if(item=='Air-Conditioner'){
            serviceIcon = `<i class="fas fa-wind mr-2"></i></i>`
        }else if(item=='Sofa'){
            serviceIcon = `<i class="fas fa-couch mr-2"></i>`
        }else if(item=='Great-View'){
            serviceIcon = `<i class="fas fa-mountain mr-2"></i>`
        }else if(item=='Smoke-Free'){
            serviceIcon = `<i class="fas fa-smoking-ban mr-2"></i>`
        }else if(item=='Child-Friendly'){
            serviceIcon = `<i class="fas fa-baby mr-2"></i>`
        }else if(item=='Pet-Friendly'){
            serviceIcon = `<i class="fas fa-cat mr-2"></i>`
        }else if(item=='Refrigerator'){
            serviceIcon = `<i class="fas fa-ice-cream mr-2"></i>`
        }

        if(service[item] == true){
            serviceContent += `<li class='serve'>${serviceIcon}<p>${item}</p></li>`
        }else{
            serviceContent +=`<li class='notServe'>${serviceIcon}<p>${item}</p></li>` 
        }
    })
    roomName.innerHTML=`${roomInforData.name}`
    roomInfoImg.style.backgroundImage=`url(${roomInforData.imageUrl[0]})`
    roomDetail.innerHTML=`
    <ul class='roomType list-style-none d-flex justify-content-between align=items-center'>${roomtypeContent}</ul>
    <p class='text-white mb-4'>${roomInforData.description}</p>
    <ul class='priceTable text-white list-unstyled'>
        <li><i class="fas fa-circle text-primary"></i>Mon-Fur <span>$NT  ${roomInforData.normalDayPrice}</span>/ Fri-Sun <span>$NT  ${roomInforData.holidayPrice}</span></li>
        <li><i class="fas fa-circle text-primary"></i>Check In : ${checkTime['checkInEarly']}-${checkTime['checkInLate']}</li>
        <li><i class="fas fa-circle text-primary"></i>Check Out : ${checkTime['checkOut']}</li>
    </ul>
    <div class='d-flex'>
    <button class='col-md-4 btn btn-primary text-white text-center mb-4 rounded-0 mr-md-2' type="button" data-toggle="modal" data-target="#exampleModalCenter" >Bookimg</button>
    <button class='col-md-4 btn btn-primary text-white text-center mb-4 rounded-0 type='button' onclick='clearAll()' >清除所有預約</button>
    </div> 
    <h3 class='text-primary font-weight-bold mb-4'>Room Details</h3>
    <ul class='serviceTable'>${serviceContent}</ul>`
    reserveNotice.innerHTML=`
    <h2 class='text-primary font-weight-bold mb-4'>${roomInforData.name}</h2>
    <ul class='mb-5 list-unstyled'>
        <li class='mb-3 d-flex align-items-center'><i class="fas fa-circle text-primary mr-2"></i>平日（週一至週四）$NT ${roomInforData.normalDayPrice} ； 假日（週五至週日）$NT ${roomInforData.holidayPrice}</li>
        <li class='mb-3 d-flex align-items-center'><i class="fas fa-circle text-primary mr-2"></i>入住時間：${checkTime['checkInEarly']}-${checkTime['checkInLate']}；退房時間：${checkTime['checkOut']}</li>
        <li class='mb-3 d-flex align-items-center'><i class="fas fa-circle text-primary mr-2"></i>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
        <li class='mb-3 d-flex align-items-center'><i class="fas fa-circle text-primary mr-2"></i>Lavik-hostel全面禁止吸菸。</li>
    </ul>
    `
})

let dateFormat=(datedata)=>{
    let year = datedata.getFullYear();
    let month = datedata.getMonth() +1;
    let date = datedata.getDate();
    month = (month<10)?'0'+month:month;
    date = (date<10)?'0'+date:date;
    return `${year}-${month}-${date}`;
  }
  
  
  
let reserveDateRange=(searchDate)=>{
    let dateLis = searchDate.split('~');
    let startDate = new Date(dateLis[0].replace(/\-/g,'/'));
    let endDate = new Date(dateLis[1].replace(/\-/g,'/'));
    let diffDate = parseInt((endDate-startDate)/1000/60/60/24);
    let dateData =[];
    dateData.push(dateFormat(startDate));
    for(i=0;i<diffDate;i++){
      let periodDate = startDate;
      periodDate = new Date(startDate.setDate(startDate.getDate()+1));
      dateData.push(dateFormat(periodDate));   
    }
    return dateData;
    
}
let searchRoom=()=>{
    let booked=[];
    let searchDate = document.querySelector('.searchDate').value;
    let searchRange = reserveDateRange(searchDate);
    let reserveRecordData=``
    // let recordNight =  roomServeRecord.slice(0,-1);;
    searchRange.forEach(function(searchRangeItem){
        roomServeRecord.forEach(function(roomServeRecordItem){
            if(searchRangeItem == roomServeRecordItem.date){
                booked.push(searchRangeItem);
            }
        })
    })
    let oriName=''
    roomServeRecord.forEach(function(recordItem){
        booked.forEach(function(bookedItem){
            let data = processData(recordItem.name);
            if(recordItem.date==bookedItem){
                if(recordItem.name!==oriName){
                    reserveRecordData += `<li class='mb-2'>預約人：${data.name} — 預約時間：${data.date[0]} 到 ${data.date[data.date.length-1]}</li>`
                }
                oriName = data.name;
            }
        })
        dataname=recordItem;
    });
    reserveRecordData = `<ul>${reserveRecordData}</ul>`
    if(booked.length==0){
        searchMessage.innerHTML=`<p>此時段尚未被預約</p>`
    }else{
        searchMessage.innerHTML=`<p>此時段已被預約</p>${reserveRecordData}`
    }
}

let processData=(name)=>{
    let data={}
    let checkOutDate=''
    data.name=name;
    data.date=[];
    // data.name=roomServeRecord[0].name;
    roomServeRecord.forEach(function(recordItem){
        if(name==recordItem.name){
            data.date.push(recordItem.date);
        }
    })
    checkOutDate = new Date(data.date[data.date.length-1].replace(/\-/g,'/'));
    checkOutDate = new Date(checkOutDate.setDate(checkOutDate.getDate()+1));
    data.date.push(dateFormat(checkOutDate));
    return data;
}


let clearAll=()=>{
    axios.delete(`https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`).then(function(res){
        let clearResult = res.data.success;
        if(clearResult==true){
            alert('清除成功')
            window.location.reload(); 
        }else{
            alert('清除失敗')
        }
    })
}


search.addEventListener('click',searchRoom)
