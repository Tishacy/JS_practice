const hourTag = document.getElementsByClassName('hour')[0];
const minuteTag = document.getElementsByClassName('minute')[0];
const secondTag = document.getElementsByClassName('second')[0];

setInterval(()=>{
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    hourTag.innerHTML = `${hour}`.padStart(2, '0');
    minuteTag.innerHTML = `${minute}`.padStart(2, '0');
    secondTag.innerHTML = `${second}`.padStart(2, '0');
}, 500);

// setInterval(function () {
//     let hour = parseInt(hourTag.innerHTML),
//         minute = parseInt(minuteTag.innerHTML),
//         second = parseInt(secondTag.innerHTML);
    
//     second++;
//     if (second > 59) {
//         second = '00';
//         minute++;
//     }
//     if (minute > 59) {
//         minute = '00';
//         hour++;
//     }
//     if (hour > 23) {
//         hour = '00';
//     }

//     hourTag.innerHTML = `${hour}`.padStart(2, '0');
//     minuteTag.innerHTML = `${minute}`.padStart(2, '0');
//     secondTag.innerHTML = `${second}`.padStart(2, '0');
// }, 100)

