const listConatainer = document.querySelector('[data-lists]')
const newListFarm = document.querySelector('[data-new-list-farm]')
const newListInput = document.querySelector('[data-new-list-input]')
const listDelete = document.querySelector('[data-list-delete]')

const LOCAL_STORAGE_LIST_KEY = 'tasks.lists'
const LOCAL_STORAGE_LIST_KEY_ID = 'tasks.currentListkey'

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListIdKey = localStorage.getItem(LOCAL_STORAGE_LIST_KEY_ID)



listConatainer.addEventListener('click', e =>{
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListIdKey = e.target.dataset.listId
        saveAndRender()
    }
})

listDelete.addEventListener('click', e =>{
    if(selectedListIdKey !== ''){

    }
})

newListFarm.addEventListener( 'submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if(listName == null || listName === '') return

    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

function createList(name){
    return { id: Date.now().toString(), name: name, task:[] }
}

function saveAndRender (){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))  // dont know how
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY_ID, selectedListIdKey )  // dont know how
}

function render() {
  clearElements(listConatainer)
  lists.forEach((listItem) => {
    const createElements = document.createElement('li')
    createElements.dataset.listId = listItem.id
    createElements.classList.add('list-name')

    if(listItem.id === selectedListIdKey){
        createElements.classList.add('active-list')
    }

    createElements.style.fontWeight = 'bold'
    createElements.innerText = listItem.name
    listConatainer.appendChild(createElements)
  })
}

function clearElements(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }

}


render()