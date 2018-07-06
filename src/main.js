import './style/index.styl'
import './style/animation.styl'

const POP_NUM = 2
const MAX_IDX = 3

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


// 执行函数
start()
getDom('down').addEventListener('click', ()=> {
  move('col', true)
})
getDom('up').addEventListener('click', ()=> {
  move('col', false)
})
getDom('right').addEventListener('click', ()=> {
  move('row', true)
})
getDom('left').addEventListener('click', ()=> {
  move('row', false)
})


// 开始初始化
function start() {
  clear()  
  popNum(2)
}

// 移动
function move(dir, reverse) {  

  // 将有数据的格子归类到相对应的列中(存储的是dom的id)(保存旧数据的位置)   
  getDataCells(dir)  
  let ogData = cols 

  // 暂存计算后的新数据(存储的是计算后的数值)
  let temp = calData(cols, reverse)  
  
  // 清除原数据
  clear()

  // 渲染新数据(先判断方向)
  if (reverse) {
    for (let key in temp) {
      if (temp[key].length) {
        let arr = temp[key]
        for (let i=0, idx=MAX_IDX; i<arr.length; i++) {
          // 判断纵向还是横向 
          let id = dir == 'col' ? idx.toString() + key.toString() : key.toString() + idx.toString()
          idx--
          getDom(id).innerHTML = arr[i]
        }   
      }
    }
  } else {
    for (let key in temp) {
      if (temp[key].length) {
        let arr = temp[key] 
        // 判断纵向还是横向 
        for (let i=0; i<arr.length; i++) {
          let id = dir == 'col' ? i.toString() + key.toString() : key.toString() + i.toString()       
          getDom(id).innerHTML = arr[i]
        }           
      }
    }
  }  

  // 将有数据的格子归类到相对应的列中(存储的是dom的id)(保存新数据的位置)  
  getDataCells(dir)
  let newData = cols 
  
  // 无变化则不做任何操作
  if (noChange(newData, ogData, reverse) != false) {    
    alert('you have no path on this direction')
    return
  } 

  // 清除动画
  for (let i = 0; i < cellArr.length; i++) {
    if (cellArr[i].classList.contains('pop')) {
      cellArr[i].classList.remove('pop')
    }    
  }

  // 在空位生成两个新元素
  setTimeout(() => {
    popNum(2)
  }, 10)  
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
    setTimeout(function() {
      getDom(item).innerHTML = POP_NUM 
      getDom(item).classList.add('pop')
    }, 10)  
  })
}

// 计算结果并返回结果列表
function calData(cols, reverse) {
  let temp = {
    0: [],
    1: [],
    2: [],
    3: []
  }
  for (let key in cols) { 
    let col = reverse ? cols[key].reverse() : cols[key]     
    // 选出有数据的格子,收集其id
    let dataArr = []
    for (let idx in col) {
      if (col[idx]) {
        dataArr.push(col[idx])
      }
    } 
    let len = dataArr.length    
    if (len > 1) {      
      for (let i=0; i < len; i++) {  
        if (i == (len-1)) {
          temp[key].push(parseInt(getDom(dataArr[i]).innerHTML))          
          break
        }
        if (getDom(dataArr[i]).innerHTML === getDom(dataArr[i+1]).innerHTML) {          
          temp[key].push(parseInt(getDom(dataArr[i]).innerHTML)*2)             
          i ++                           
        } else {
          temp[key].push(parseInt(getDom(dataArr[i]).innerHTML))                  
        }
      }
    } else if (len > 0) {
      temp[key].push(parseInt(getDom(dataArr[0]).innerHTML))     
    }       
  }
  return temp
}

// 获取格子id，并且push到所属的列中(先判断横向还是纵向)
function getDataCells(dir) {
  initCols()
  // 纵向
  if (dir == 'col') {
    for (let i = 0; i < cellArr.length; i++) {
      let idx = cellArr[i].id.charAt(1)
      // 有数据的格子获取其id，没有数据的push 0补位
      if (cellArr[i].innerHTML) { 
        cols[idx].push(cellArr[i].id)      
      } else {        
        cols[idx].push(0) 
      }
    }
  } else {
    // 横向
    for (let i = 0; i < cellArr.length; i++) {
      let idx = cellArr[i].id.charAt(0)
      if (cellArr[i].innerHTML) {        
        cols[idx].push(cellArr[i].id)      
      } else {
        cols[idx].push(0)   
      }
    }
  } 
}

// 检测新旧对象是否内容一致
function noChange(newData, ogData, reverse) {     
  for(let key in newData) {
    if (newData[key].length) {
      let newSingleArr = newData[key]
      // 判断是否反转过？如果是那就把原始的也反转一次再对比
      let oldSingleArr = reverse ? ogData[key].reverse() : ogData[key]
      for (let i=0; i<oldSingleArr.length; i++) {
        if (newSingleArr[i] != oldSingleArr[i]) {
          return false
        }        
      }
    }   
  }
}

// 简化
function getDom(id) {
  return document.getElementById(id)
}
