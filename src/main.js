import './style/index.styl'

const POP_NUM = 2

// 获取所有单元格
const cellArr = document.querySelectorAll('.cell')
// 定义列对象用以存储在列上面的单元格数据
let cols = {}
// 初始化列数据
function initCols() {  
  cols = {
    0: [],
    1: [],
    2: [],
    3: []
  }
}
// 获取有数据的格子id，并且push到所属的列中
function getDataCells() {
  initCols()
  for (let i = 0; i < cellArr.length; i++) {
    if (cellArr[i].innerHTML) {
      let idx = cellArr[i].id.charAt(1)
      cols[idx].push(cellArr[i].id)      
    }
  }
}






// 执行函数
start()
getDom('down').addEventListener('click', moveDown)


// 开始初始化
function start() {
  clear()  
  popNum(2)
}

// 向下
function moveDown() { 
  // 将有数据的格子归类到相对应的列中(存储的是dom的id)   
  getDataCells()  
  let ogData = cols 
  // 暂存计算后的新数据(存储的是计算后的数值)
  let temp = calData(cols)  
  console.log(temp) 
  // 清除原数据
  clear()
  // 渲染新数据
  for (let key in temp) {
    if (temp[key].length) {
      let arr = temp[key].reverse()      
      for (let i=0, idx=3; i<arr.length; i++) {
        let id = idx.toString() + key.toString()
        idx--
        getDom(id).innerHTML = arr[i]
      }
    }
  }
  getDataCells()
  let newData = cols
  // 无变化则不做任何操作
  if (ogData === newData) {
    console.log('no move')
    return
  }
  // 在空位生成两个新元素
  setTimeout(popNum(2), 20)   
}

// 从数组中随机抽取互不相同的几个元素(*性能最佳的方法*)
function randomSelect(arr, num) {
  let result = []
  for (let i=0; i<num; i++) {
    let index = Math.floor(Math.random() * (arr.length - i)) + i
    result.push(arr[index])
    arr[index] = arr[i]
  }
  return result
}

// 清空单元格数据
function clear() {
  for (let i = 0; i < cellArr.length; i++) {
    cellArr[i].innerHTML = ''
  }
}

// 在空位随机生成n个数据
function popNum(num) {
  let idArr = []
  // 找出现存的空格子，将空格子id收集  
  for (let i = 0; i < cellArr.length; i++) {    
    if (!cellArr[i].innerHTML) {
      idArr.push(cellArr[i].id)
    }   
  }  
  // 从id数组中随机选取n个id，赋值
  let popCells = randomSelect(idArr, num)  
  popCells.forEach(item => {
    getDom(item).innerHTML = POP_NUM
  })
}

// 计算结果并返回结果列表
function calData(cols) {
  let temp = {
    0: [],
    1: [],
    2: [],
    3: []
  }
  for (let key in cols) {
    let col = cols[key]
    let len = col.length    
    if (len > 1) {      
      for (let i=0; i < len; i++) {  
        if (getDom(col[i]).innerHTML == getDom(col[i+1]).innerHTML) {
          temp[key].push(parseInt(getDom(col[i]).innerHTML)*2)
          i++
          // 如果当前数据是倒数第二个数，则直接push最后一个数值，并结束循环
          if (i == len-2) {
            temp[key].push(parseInt(getDom(col[i+1]).innerHTML))
            break
          }
        } else {
          temp[key].push(parseInt(getDom(col[i]).innerHTML))
          // 如果当前数据是倒数第二个数，则直接push最后一个数值，并结束循环
          if (i == len-2) {
            temp[key].push(parseInt(getDom(col[i+1]).innerHTML))
            break
          }
        }
      }
    } else if (len > 0) {
      temp[key].push(parseInt(getDom(col[0]).innerHTML))
    }       
  }
  return temp
}

// 简化
function getDom(id) {
  return document.getElementById(id)
}





