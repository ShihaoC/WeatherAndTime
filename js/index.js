let hour = $(".hour")
let minutes = $(".minutes")
let seconds = $(".seconds")
let year = $(".year")
let mounth = $(".mounth")
let day = $(".day")
let week = $(".week")

$(() => {

    let date;
    init()
    setInterval(() => {
        date = new Date();
        year.html(getTrue(date.getFullYear()))
        mounth.html(getTrue(date.getMonth() + 1))
        day.html(getTrue(date.getDate()))
        week.html(getWeek(date.getDay()))
        hour.html(getTrue(date.getHours()))
        minutes.html(getTrue(date.getMinutes()))
        seconds.html(getTrue(date.getSeconds()))
    }, 1000);

})

let getTrue = (time) => {
    if (time < 10) {
        return "0" + time
    }
    return time
}

let init = () => {
    date = new Date();
    year.html(getTrue(date.getFullYear()))
    mounth.html(getTrue(date.getMonth() + 1))
    day.html(getTrue(date.getDate()))
    week.html(getWeek(date.getDay()))
    hour.html(getTrue(date.getHours()))
    minutes.html(getTrue(date.getMinutes()))
    seconds.html(getTrue(date.getSeconds()))
}

let getWeek = (week) => {
    let result = "";
    switch (week) {
        case 1:
            result = "星期一";
            break;
        case 2:
            result = "星期二";
            break;
        case 3:
            result = "星期三";
            break;
        case 4:
            result = "星期四";
            break;
        case 5:
            result = "星期五";
            break;
        case 6:
            result = "星期六";
            break;
        case 7:
            result = "星期日";
            break;
    }
    return result;
}
let flag = true;
$(".title").click(function () {
    if (flag) {
        $(".logger").css({
            "width": "0",
            "height": "0",
            "overflow": "hidden",
            "border": "none"
        })
        $(".title").css({
            "right": "-9vw",
            "bottom": "0.2vw"
        })

        flag = false
    } else {
        $(".logger").css({
            "width": "20vw",
            "height": "15vh",
            "overflow": "auto",
            "border-top": "1px solid #333333",
            "border-left": "1px solid #333333"

        })
        $(".title").css({
            "right": "0",
            "bottom": "15.5vh",

        })
        flag = true
    }
})