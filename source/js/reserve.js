const reserveTime = document.querySelector('.reserveTime');
let reserveTimeStr = reserveTime.value;


//預約房間
let reserveRoom =()=>{
    let customerName = document.querySelector('.customerName').value;
    let customerTele = document.querySelector('.customerTele').value;
    reserveTimeStr = reserveTime.value;
    let reserveDate = reserveDateRange(reserveTimeStr).slice(0,-1);
    let booking={
        name: customerName,
        tel: customerTele,
        date: reserveDate,
    }
    axios.post(`${url}room/${id}`,booking).then(function(res){
        let reserveResult = res.data.success;
        if(reserveResult==true){
            console.log(booking.date);
            alert(`預約成功`);
            window.location.reload();
        }
    }).catch((error)=>{
        alert('此時段已被預約')
    })

}

//取得目前時間，並轉換格式
let now = new Date();
let nowTime = dateFormat(now).replace(/\-/g,'/');

//計算價格
let countTotal=()=>{
    reserveTimeStr = reserveTime.value;
    let reserveDate = reserveDateRange(reserveTimeStr);
    reserveDate.splice(-1);  //扣除退房當天
    let totalPrice=0;
    let holiDay=0;
    let normalDay=0;
    reserveDate.forEach(function(item){
        let date = new Date(item.replace(/\-/g,'/'));
        if ((date.getDay()==0)||(date.getDay()==5)||(date.getDay()==6)){
            holiDay +=1;
        }else{
            normalDay +=1;
        }
    })
    totalPrice = parseInt(`${roomInforData.normalDayPrice}`)*normalDay + parseInt(`${roomInforData.holidayPrice}`)*holiDay;
    total.innerHTML=`$${totalPrice}`

}

submit.addEventListener('click',reserveRoom);



