// Inicializar variables

const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#input')
const buttonEnter = document.querySelector('#enter')
const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineThrough = "line-through"
let id
let taskList=[]


//Fecha

const getDate = new Date()
date.innerHTML=getDate.toLocaleDateString('es-ES', {weekday:'long',month:'long',day:'numeric'})


//Función add task

function addTask (task,id,done,deleted) {

    if(deleted){return}

    const DONE = done ?check :uncheck
    const LINE = done ?lineThrough :''

    const textElement = 
        `<li id="element">
        <i class="far ${ DONE }" id="${ id }" data="done"></i>
        <p class="text ${ LINE }">${ task }</p>
        <i class="fas fa-trash de" id="${ id }" data="deleted"></i>
        </li>`
    
    //Inserta el elemento anterior ANTES de que finalice la etiqueta
    list.insertAdjacentHTML("beforeend",textElement)
}


//Función taskCompleted()

function taskCompleted(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    taskList[element.id].done = taskList[element.id].done ?false :true
}

//Función taskDeleted()

function taskDeleted(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    taskList[element.id].deleted = true
}


buttonEnter.addEventListener('click',()=> {
    const task = input.value
    if(task){
        addTask(task,id,false,false)
        taskList.push({
            name: task,
            id: id,
            done:false,
            deleted:false
        })
    }
    localStorage.setItem('TODOLIST',JSON.stringify(taskList))
    input.value = ''
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const task = input.value
        if(task){
            addTask(task,id,false,false)
            taskList.push({
                name: task,
                id: id,
                done:false,
                deleted:false
            })
        }
        localStorage.setItem('TODOLIST',JSON.stringify(taskList))
        input.value = ''
        id++
    }
})

list.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === 'done'){
        taskCompleted(element)
    }
    else if(elementData === 'deleted'){
        taskDeleted(element)
    }
    localStorage.setItem('TODOLIST',JSON.stringify(taskList))
})

// Recuperar local storage

let data = localStorage.getItem('TODOLIST')
if(data){
    taskList = JSON.parse(data)
    id = taskList.length
    loadList(taskList)
}else{
    taskList = []
    id = 0
}

function loadList(dataVar){
    dataVar.forEach(function(i){
        addTask(i.name,i.id,i.done,i.deleted)
    })
}