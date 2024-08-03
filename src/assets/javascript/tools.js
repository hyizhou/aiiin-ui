/**
 * 时间戳格式化
 * @param timestamp
 * @returns {string}
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp); // 转换为毫秒

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
}

/**
 * 将表示字节的数值转换为易识别的格式
 * @param {number} bytes - 要转换的字节数
 * @param {String} unit - 指定转换后的单位，可不填写，此时将根据数值大小自动转换
 * @returns {Object} 包含转换后的数值和单位的对象
 * @property {number} value - 转换后的数值
 * @property {string} unit - 转换后的单位
 */
export function formatBytes(bytes, unit=null) {
    if (bytes === 0) return {value:0, unit: 'Bytes'};

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i;
    if (unit !== null){

        if (sizes.includes(unit)){
            i = sizes.indexOf(unit)
        }else {

            throw "没有找到此单位：" + unit
        }
    }else {
        i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
    }


    // return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    return {
        value: parseFloat((bytes / Math.pow(k, i)).toFixed(4)),
        unit: sizes[i]
    }
}

/**
 * 找出数组中最大的字节数，并将整个数组转换为对应单位的数值大小
 * @param {number[]} byteArray - 包含字节数的数组
 * @param {String} unit - 手动指定转换后的单位
 * @returns {Object} 包含最大值和转换后的数组的对象
 * @property {number} maxValue - 数组中的最大字节数
 * @property {string} unit - 数组中的最大字节数对应的单位
 * @property {number[]} convertedArray - 转换后的数组
 */
export function analyzeBytesArray(byteArray, unit = null) {
    if (byteArray.length === 0) {
        // 如果数组为空，返回默认值
        return { maxValue: 0, unit: 'Bytes', convertedArray: [] };
    }

    if (unit === null) {
        // 找出数组中最大的字节数和对应的单位
        const maxByteValue = Math.max(...byteArray);
        unit = formatBytes(maxByteValue).unit;
    }

    // 将整个数组转换为对应单位的数值大小
    const convertedArray = byteArray.map(byteValue => {
        const { value: convertedValue } = formatBytes(byteValue, unit);
        return convertedValue;
    });

    // 返回包含最大值、单位和转换后数组的对象
    return {unit, convertedArray };
}

/**
 * 接收多个字节数组，并转换成统一的单位大小
 * @param {number[]} byteArrays - 包含字节数的数组
 */
export function analyzeMoreBytesArray(...byteArrays){
    if (byteArrays.length === 0){
        return  {}
    }
    let combinedArray = [].concat(...byteArrays)
    const maxByteValue = Math.max(...combinedArray);
    const unit = formatBytes(maxByteValue).unit;
    let result = {
        unit: unit,
        convertedArrays: []
    }
    for (const byteArray of byteArrays) {
        let convertedArray = analyzeBytesArray(byteArray, unit).convertedArray;
        result.convertedArrays.push(convertedArray)
    }
    return result

}

/**
 * 计算 textarea 可显示的行数
 * @param textarea 文本域元素
 * @returns {number} 可显示的行数，文本多余此行将显示滚动条
 */
function calculateVisibleRows(textarea) {
  let textareaStyle = window.getComputedStyle(textarea);
  // 计算行数
  let lineHeight = parseFloat(textareaStyle.lineHeight);
  return Math.ceil(textarea.offsetHeight / lineHeight);
}

/**
 * 替换模板中的占位符
 * @param template 模板，使用{xx}作为占位符
 * @param data 键值对对象
 * @returns {*}
 */
export  function replacePlaceholders(template, data) {
    return template.replace(/{(\w+)}/g, function(match, p1) {
        return data[p1];
    });
}

// console.log(formatBytes(1036, "MB"));
// console.log(analyzeBytesArray([1, 2, 5000, 1024], "MB"));
// console.log(analyzeMoreBytesArray([1, 2, 5000, 1024], [9956456,2345,2345,12341],[1,0,0,0]));