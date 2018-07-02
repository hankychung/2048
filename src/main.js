import './style/index.styl'

const POP_NUM = 2
let cellArr = document.querySelectorAll('.cell')
let idArr = []
for (let i = 0; i < cellArr.length; i++) {
  idArr.push(cellArr[i].id)
}

start()

// 初始化
function start() {
  let startCells = randomSelect(idArr, 2)
  startCells.forEach(item => {
    document.getElementById(item).innerHTML = POP_NUM
  })
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




