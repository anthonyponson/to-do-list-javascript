const listConatainer = document.querySelector('[data-lists]')
const newListFarm = document.querySelector('[data-new-list-farm]')
const newListInput = document.querySelector('[data-new-list-input]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'  // prevent data overwriting localstroge from other websites   
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) ||  [] // JSON.parse() change sring into object

// let lists = [
//   {id:1, name:'name'},
//   {id:2, name:'todo'}
// ]

newListFarm.addEventListener('submit', (e) => {
  e.preventDefault()

  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()

})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveAndRender(){
  save()
  render()
}


function save (){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

function render() {
  clearElements(listConatainer)
  lists.forEach((listItem) => {
    let createElements = document.createElement('li')
    createElements.classList.add('list-name')
    createElements.dataset.listId = listItem.id
    createElements.innerText = listItem.name
    createElements.style.fontSize = '1.1rem'
    createElements.style.fontWeight = '600'
    listConatainer.appendChild(createElements)
  })
}

function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()
