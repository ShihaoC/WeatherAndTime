let data;
let weather = $(".weather")
let temp = $(".temp")
let winddirection = $(".winddirection")
let windpower = $(".windpower")
let city = $(".city")
let cityCode;
let loader = $(".progress-loader")
let loaderline = $(".progress")
let address;

let date;
let i = 1;
let getLogger = (type, msg, sta) => {
    if ($(".logger").children().length > 9) {
        $(".logger").children()[0].remove()
    }
    let logger = $(".logger");
    let span = $("<span class='log'></span>")
    let time = $("<span class='time'></span>")
    let work = $("<span class='statue'></span>")
    let S = sta == 'ERROR' ? $("<span style='color:red'>[ERROR]</span>") : $("<span style='color:green'>[INFO]</span>")
    let count = $("<span></span>")
    date = new Date()
    time.html(
        "[" + getTrue(date.getHours()) + ":" + getTrue(date.getMinutes()) + ":" +
        getTrue(date.getSeconds()) + "]"
    )
    count.html("[" + i++ + "]");
    span.append(count)
    span.append(time)
    span.append($("#text"))
    work.html("[" + type + "]")
    span.append(work)
    span.append(S)
    span.append("  " + msg)
    logger.append(span)
}

getLogger("loading", "加载成功")


let get = () => {
    getLogger("ajax", "请求地址信息")
    $.ajax({
        type: "get",
        url: "https://restapi.amap.com/v3/ip?key=fd7cc07185765a35378f1c83d3ceb721",
        data: "data",
        dataType: "JSON",
        success: function (resap) {
            getLogger("ajax", resap, "INFO")
            address = resap.rectangle
            if (address == '') {
                address = "北京"
            } else {
                address = address.substring(0, address.indexOf(";"))

            }
            // 通过和风天气API查询当前地区的天气
            $.ajax({
                type: "get",
                url: "https://devapi.qweather.com/v7/weather/now?key=6d34230d43fc4cd7ac057674559cd37" +
                    "8&location=" + address,
                data: "data",
                dataType: "JSON",
                success: function (response) {
                    //请求失败则通过高德地图API查询当前天气
                    if (response.code == 400) {
                        getLogger("ajax", "请求高德API", "INFO")
                        $.ajax({
                            type: "get",
                            url: "https://restapi.amap.com/v3/weather/weatherInfo?key=fd7cc07185765a35378f1c83d3" +
                                "ceb721&city=" + address,
                            data: "data",
                            dataType: "JSON",
                            success: function (response) {
                                console.log(response);
                                temp.html(response.lives[0].temperature + "&#176;")
                                winddirection.html(response.lives[0].winddirection)
                                windpower.html(response.lives[0].windpower)
                                weather.html(response.lives[0].weather)
                                city.html(address)
                                loader.css({ "background": "none" })
                                loaderline.css({ "background": "none" })
                                setTimeout(() => {
                                    scroll()
                                }, 300);
                            }
                        });
                    } else {

                        getLogger("ajax", "请求和风天气API", "INFO")
                        temp.html(response.now.temp + "&#176;")
                        winddirection.html(response.now.windDir)
                        windpower.html(
                            response.now.windSpeed + "<span class='m/s'>m/s<span>"
                        )
                        weather.html(response.now.text)
                        city.html(resap.city)
                        loader.css({ "background": "none" })
                        loaderline.css({ "background": "none" })
                        setTimeout(() => {
                            scroll()
                        }, 300);
                    }

                },
                error: function () {
                    //异常处理
                    getLogger("ajax", "天气请求失败", "ERROR")
                }
            });
        },
        error: (err) => {
            setTimeout(() => {
                get()
                setTimeout(() => {
                    scroll()
                }, 300);
                getLogger("ajax", "地址请求失败", "ERROR")
            }, 2000);
        }
    });
}
function scroll() {
    document.querySelector(".logger").scrollTop = document.querySelector(".logger").scrollHeight + 10000
}

get()

scroll()
setInterval(() => {
    get()
    setTimeout(() => {
        scroll()
    }, 300);
}, 1000 * 60 * 30);

