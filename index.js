/* Declaration des variables */
let inputTask = document.querySelector('.inputTask')
let btnAddTask = document.querySelector('.btnAddTask')
let noTask = document.querySelector('.noTask')
let divTaskList = document.querySelector('.divTaskList')
let titleTask = document.querySelector('.titleTask')
let img = document.querySelector('img')
let currentYear = document.querySelector('#current-year')

currentYear.innerHTML = new Date().getFullYear()

/* Au click du boutton d'ajout de la tâche */
btnAddTask.addEventListener('click', (e) => {
    e.preventDefault()

    /* Si le champs n'est pas vide */
    if(inputTask.value.trim() != "" ){
        let  localItems = JSON.parse(localStorage.getItem('localItem'))
        if(localItems === null){
            taskList = []
        }
        else{
            taskList = localItems
        }

        taskList.push(inputTask.value)
        inputTask.value = ""
        localStorage.setItem('localItem',JSON.stringify(taskList))

        showList()
    }
})

/* fonction d'affichage des tâches */

function showList() {
    let out = ""
    let  localItems = JSON.parse(localStorage.getItem('localItem'))

    if(localItems === null) {
        taskList = []
    }
    else{
        taskList = localItems
    }
    taskList.forEach((data, index) => {
        out += '<p>' + data + '<span onClick="deleteItem('+ index +')" class="bi-trash-fill" title="Supprimer la tâche"></span></p>'
    })  
    divTaskList.innerHTML = out

    if(divTaskList.children.length == 0)
    {
        img.setAttribute('src', 'list2.png')
        noTask.innerHTML = "Vous n'avez aucune tâche à faire !"
        titleTask.innerHTML = ""
    }
    else
    {
        img.setAttribute('src', '')
        noTask.innerHTML = "" 
        titleTask.innerHTML = "Liste des Tâches (" + taskList.length+ " tâches)"  
    }
}
showList()

/* fonction de suppression d'une tâche */
function deleteItem(index){
    let  localItems = JSON.parse(localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem',JSON.stringify(taskList))
    showList()
}

/* fonction de suppression de toutes les tâches */
deleteAllTask.addEventListener('click', () => {
    localStorage.clear()
    showList()
})



