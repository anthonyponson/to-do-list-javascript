// const listConatainer = document.querySelector('[data-lists]')
// const newListFarm = document.querySelector('[data-new-list-farm]')
// const newListInput = document.querySelector('[data-new-list-input]')

// let lists = [
//   {
//     id: 1,
//     name: 'Eat',
//   },
//   {
//     id: 2,
//     name: 'sleep',
//   },
// ]

// newListFarm.addEventListener( 'submit', e =>{
//     e.preventDefault()
//     const listName = newListInput.value
//     if(listName == null || listName === '') return

//     const list = createList(listName)
//     newListInput.value = null
//     lists.push(list)
//     render()
// })

// function createList(name){

//     return { id: Date.now().toString(), name: name, task:[] }
// }

// function render() {
//   clearElements(listConatainer)
//   lists.forEach((listItem) => {
//     const createElements = document.createElement('li')
//     createElements.dataset.listId = listItem.id
//     createElements.classList.add('list-name')
//     createElements.style.fontWeight = 'bold'
//     createElements.innerText = listItem.name
//     listConatainer.appendChild(createElements)
//   })
// }

// function clearElements(element) {
//     while(element.firstChild){
//         element.removeChild(element.firstChild)
//     }

// }


// render()