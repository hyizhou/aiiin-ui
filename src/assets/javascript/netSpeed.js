import {reactive, ref} from "vue";
import {analyzeMoreBytesArray} from "./tools.js";

// 存储网口列表，用于页面预先生知道生成几张表
const networkList = ref([])
// 网络速度，接口名 -> 接口速度数组
const netSpeedMap = reactive(new Map())

// TODO 添加调整显示范围的交互

// 模板格式
class ChartConfig {
    constructor() {
        this.data = null;
        this.options = null;
        this.display = false;
    }
}

// 用于数据表渲染，数组内元素为前面的 ChartConfig
export const netSpeedDataList = reactive([])

/**
 *  将接口获取的网速数据格式转换成本地存储的格式
 * @param data 速度原始数据，为数组
 */
function formatConversion(data){
    netSpeedMap.clear()
    for (const one of data) {
        for (const net of one) {
            let name = net.name
            let speedArr = netSpeedMap.get(name)
            if (speedArr === undefined){
                speedArr = []
                speedArr.push(net)
                netSpeedMap.set(name, speedArr)
            }else {
                speedArr.push(net)
            }
        }
    }
    // console.log(netSpeedMap)
}

/**
 * 生成图表配置
 *
 * @param data
 * @return {ChartConfig}
 */
function createConfig(data) {
    let unit = data.unit;  // Y 轴单位
    let times = data.labels; //x 轴标签
    let speedArray = data.speedArray;  // 网速数据，包含两个元素，发送和接收速度的数组
    let networkName = data.name;  // 网口名称
    const oneMinuteStepSize = 5;  // 时间轴上隐藏的步长，切换显示数据量的时候切换
    const fiveMinuteStepSize = 30;
    const sendColor = "#a1c4fd"
    const recvColor= "#84fab0"

    const theData = {
        labels: times,
        datasets: [
            {
                label: "发送",
                data: speedArray[0],
                // fill: {
                //     target: false,
                //     above: sendColor
                // },
                borderColor: sendColor,
                backgroundColor:sendColor,
                tension: 0.5,   // 平滑度
                pointStyle:false // 点样式，默认圆点，false隐藏点

            },
            {
                label: "接收",
                data: speedArray[1],
                // fill: {
                //     target: false,
                //     above: recvColor
                // },
                borderColor: recvColor,
                backgroundColor:recvColor,
                tension: 0.5,   // 平滑度
                pointStyle:false
            }
        ]
    }
    const theOption = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {  // 设置 x 轴为时间轴
                type: 'time',
                time: {  // 时间格式
                    unit: 'second',
                    tooltipFormat:"HH:mm:ss",
                    displayFormats: {
                        second: 'HH:mm:ss'
                    }
                },
                ticks:{
                    stepSize: oneMinuteStepSize  // 设置刻度步长
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: unit+"/s"
                },
                min: 0
            }
        },
        plugins: {
            title: {  // 标题
                text:networkName,
                display: true,
                position: 'top',
                align: 'start'
            },
            legend:{  // 图例
                display: false
            }
        },
        animation: {
            duration: 0,  // 关闭动画
        },
        interaction: {  // 方便查看值
            mode: 'index',
            intersect: false
        },
    }
    const chartConfig = new ChartConfig()
    chartConfig.data = theData
    chartConfig.options = theOption
    return chartConfig
}

/**
 * 要在 updateNetSpeed 后面运行
 *
 * 生成图表所需数据与配置
 */
function formatConversion2(){
    if (netSpeedMap.size === 0){
        console.error("netSpeedMap尚未赋值")
        return
    }
    netSpeedDataList.length = 0  // 清空
    for (const [key, value] of netSpeedMap) {
        let sentSpeedArray = []
        let recvSpeedArray = []
        let labels = []
        for (const element of value) {
            sentSpeedArray.push(element.sentSpeed)
            recvSpeedArray.push(element.recvSpeed)
            // labels.push(formatTimestamp(element.timestamp))
            labels.push(element.timestamp)
        }
        let analyzeData = analyzeMoreBytesArray(sentSpeedArray, recvSpeedArray);

        let chartTemp = createConfig({
            unit: analyzeData.unit,
            labels: labels,
            speedArray: [analyzeData.convertedArrays[0], analyzeData.convertedArrays[1]],
            name:key
        })
        netSpeedDataList.push(chartTemp)
    }
}

async function updateNetworkList(){
    let response = await fetch("/api/status/network-list");
    // console.log(data.length)
    networkList.value = await response.json()
}

async function updateNetSpeed(){
    console.log("发起请求")
    let response = await fetch("/api/status/netspeed");
    let data = await response.json();
    // console.log(data)
    await formatConversion(data)
    // console.log(netSpeedMap)
    formatConversion2()
    console.log(netSpeedDataList[0].data)
}

export function netSpeedInit(){
    updateNetworkList().then(r => {})
    updateNetSpeed().then(r => {})
    // formatConversion2()

}


// netSpeedInit()