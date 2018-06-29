import './style/index.styl'

let cellArr = document.querySelectorAll('.cell')
console.log(cellArr)
let idArr = []
for (let i = 0; i < cellArr.length; i++) {
  idArr.push(cellArr[i].id)
}
console.log(idArr)




