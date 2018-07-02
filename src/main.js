import './style/index.styl'

const POP_NUM = 2
const cellArr = document.querySelectorAll('.cell')
let idArr = []
for (let i = 0; i < cellArr.length; i++) {
  idArr.push(cellArr[i].id)
}

start()

document.getElementById('down').addEventListener('click', moveDown)

// 初始化
function start() {
  let startCells = randomSelect(idArr, 2)
  startCells.forEach(item => {
    document.getElementById(item).innerHTML = POP_NUM
  })
}

// 清空
function clear() {
  for (let i = 0; i < cellArr.length; i++) {
    cellArr[i].innerHTML = ''
  }
}

// 向下
function moveDown() {

  // 每一列的数组初始化
  let cols = {
    0: [],
    1: [],
    2: [],
    3: []
  }

  // 将有数据的格子归类到相对应的列中(以元素id的方式)
  for (let i = 0; i < cellArr.length; i++) {
    if (cellArr[i].innerHTML) {
      let idx = cellArr[i].id.charAt(1)
      cols[idx].push(cellArr[i].id)      
    }
  }
  console.log(cols)

  // 暂存计算后的新数据
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
        if (document.getElementById(col[i]).innerHTML == document.getElementById(col[i+1]).innerHTML) {
          temp[key].push(parseInt(document.getElementById(col[i]).innerHTML)*2)
          i++
        } else {
          temp[key].push(parseInt(document.getElementById(col[i]).innerHTML))
        }
      }
    } else if (len > 0) {
      temp[key].push(parseInt(document.getElementById(col[0]).innerHTML))
    }       
  }
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
        document.getElementById(id).innerHTML = arr[i]
      }
    }
  }
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




