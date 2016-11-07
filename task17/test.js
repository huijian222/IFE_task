/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
/**
 * addEventHandler方法
 * 跨浏览器实现事件绑定
 */
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function $(id) {
    return document.getElementById(id);
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var str = "";
    for (var v in chartData) {
        str += "<div class='box " + pageState['nowGraTime'] + "'>";
        str += "<div class='histogram' style='height:" + chartData[v] + "px;background-color:" + getRandomColor() + "' title='" + v + ":" + chartData[v] + "'></div>";
        str += "</div>";
    };
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = str;
    console.log(1)
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
    var value = radio.value;
    if (value !== pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = value;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

function getRandomColor() {
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h
    })((Math.random() * 0x1000000 << 0).toString(16))
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
        initAqiChartData();
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementsByName('gra-time');
    for (var i = 0; i < radio.length; i++) {
        (function(m) {
            addEventHandler(radio[m], 'click', function() {
                graTimeChange(radio[m])
            })
        })(i);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var cityArr = Object.keys(aqiSourceData);
    var select = $('city-select');
    var cityList = cityArr.map(function(item) {
        return "<option>" + item + "</option>";
    });
    pageState.nowSelectCity = cityArr[0];
    select.innerHTML = cityList.join('');
    addEventHandler(select, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var aqiValue = Object.values(aqiSourceData);
    var aqiCityName = Object.keys(aqiSourceData);
    switch (pageState.nowGraTime) {
        case "day":
            chartData = aqiSourceData[pageState.nowSelectCity];
            break;
        case "week":
            chartData = {};
            var count = 0,
                total = 0,
                week = 1,
                date, weekDay;
            for (var v in aqiSourceData[pageState.nowSelectCity]) {
                date = new Date(v);
                weekDay = date.getDay();
                if (weekDay == 6) {
                    count++;
                    total += aqiSourceData[pageState.nowSelectCity][v];
                    chartData["week" + week] = Math.round(total / count);
                    console.log(chartData["week" + week]);
                    count = 0;
                    total = 0;
                    week++;
                } else {
                    count++;
                    total += aqiSourceData[pageState.nowSelectCity][v];
                }

            }
            chartData["week" + week] = Math.round(total / count);
            break;
        case "month":
            chartData = {};
            var count = 0,
                total = 0,
                month = -1,
                date;
            for (var v in aqiSourceData[pageState.nowSelectCity]) {
                date = new Date(v);
                if (month == -1) {
                    month = date.getMonth() + 1;
                } else if (date.getMonth() + 1 != month) {
                    chartData[month + "月"] = Math.round(total / count);
                    month = date.getMonth() + 1;
                    count = 0;
                    total = 0;
                }
                count++;
                total += aqiSourceData[pageState.nowSelectCity][v];
            }
            chartData[month + "月"] = Math.round(total / count);
            break;
    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
