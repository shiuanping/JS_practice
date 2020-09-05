const reserveTime = document.querySelector('.reserveTime');
let reserveTimeStr = reserveTime.value;

let reserveRoom =()=>{
    let customerName = document.querySelector('.customerName').value;
    let customerTele = document.querySelector('.customerTele').value;
    reserveTimeStr = reserveTime.value;
    let reserveDate = reserveDateRange(reserveTimeStr).slice(0,-1);
    console.log(reserveDate);
    let booking={
        name:customerName,
        tel:customerTele,
        date:reserveDate,
    }
    axios.post(`${url}room/${id}`,booking).then(function(res){
        let reserveResult = res.data.success;
        if(reserveResult==true){
            alert('預約成功');
            window.location.reload();
        }
    }).catch((error)=>{
        alert('此時段已被預約')
    })

}

let now = new Date();
let nowTime = dateFormat(now).replace(/\-/g,'/');


let countTotal=()=>{
    reserveTimeStr = reserveTime.value;
    let reserveDate = reserveDateRange(reserveTimeStr);
    reserveDate.splice(-1);
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



