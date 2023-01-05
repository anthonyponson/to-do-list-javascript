const listConatainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-farm]')
const newListInput = document.querySelector('[data-new-list-input]')
const listDelete = document.querySelector('[data-list-delete]')
const taskClearButton = document.querySelector('[data-task-clear-button]')
const divContainer = document.querySelector('[data-container]')
const listTaskCount = document.querySelector('[data-task-count]')
const listTitle = document.querySelector('[data-list-title]')
const taskContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists' // prevent data overwriting localstroge from other websites
const LOCAL_STORAGE_LIST_SELECTED_ID_KEY = 'task.selectedListIdKey'

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] // JSON.parse() change sring into object
let selectedListIdKey = localStorage.getItem(LOCAL_STORAGE_LIST_SELECTED_ID_KEY)

// let lists = [
//   {id:1, name:'name'},
//   {id:2, name:'todo'}
// ]

listConatainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListIdKey = e.target.dataset.listId
    saveAndRender()
  }
})

taskContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    currentList = lists.find(list => list.id === selectedListIdKey)
    const currentTask = currentList.tasks.find(task => task.id === e.target.id)
    currentTask.complete = e.target.checked
    save()
    renderTaskCount(currentList)
  }
})

listDelete.addEventListener('click', (e) => {
  lists = lists.filter((list) => list.id !== selectedListIdKey)
  selectedListIdKey = null
  saveAndRender()
})

taskClearButton.addEventListener('click', e =>{
const currentList = lists.find(list => list.id === selectedListIdKey)
currentList.tasks = currentList.tasks.filter(task => !task.complete)
saveAndRender()

})


newListForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()
})


newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const taskName = newTaskInput.value
  if (taskName == null || taskName === '') return
  const task = createTask(taskName)
  newTaskInput.value = null
  currentList = lists.find(list => list.id === selectedListIdKey)
  currentList.tasks.push(task)
  saveAndRender()
})


function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  }
}

function createTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
  }
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_LIST_SELECTED_ID_KEY, selectedListIdKey)
}

function render() {
  clearElements(listConatainer)
  renderLists()

  const currentList = lists.find((list) => list.id === selectedListIdKey)

  if (selectedListIdKey == null) {
    divContainer.style.display = 'none'
  } else {
    divContainer.style.display = ''
    listTitle.innerText = currentList.name

    renderTaskCount(currentList)
    clearElements(taskContainer)
    renderTasks(currentList)
  }
}

function renderTasks(currentList) {
  currentList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')

    checkbox.id = task.id
    checkbox.checked = task.complete

    const label = taskElement.querySelector('label')

    label.htmlFor = task.id
    label.append(task.name)
    taskContainer.appendChild(taskElement)

  })
}

function renderTaskCount(currentList) {
  const incompleteTaskCount = currentList.tasks.filter(
    (task) => !task.complete
  ).length

  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks'

  listTaskCount.innerText = `${incompleteTaskCount} ${taskString} remaing`
}

function renderLists() {
  lists.forEach((listItem) => {
    let createElements = document.createElement('li')
    createElements.classList.add('list-name')
    createElements.dataset.listId = listItem.id
    createElements.innerText = listItem.name

    if (listItem.id === selectedListIdKey) {
      createElements.classList.add('active-list')
    }

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