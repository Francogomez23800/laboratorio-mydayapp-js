import "./css/base.css";

const todoApp = document.querySelector('header')

const main = document.querySelector('.main')
const footer = document.querySelector('.footer')

const input = document.querySelector('.new-todo')

const list = document.querySelector('.todo-list')
const arrayList = []

const listCount = document.querySelector('strong')

const clearCompleted = document.querySelector('.clear-completed')
clearCompleted.style.display = 'none'

function countLetters() {
    const inputValue = input.value.trim();

    if (inputValue === '') {
        alert('Please enter a task!')
        input.value = ''
    }
    return inputValue.length
}

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && countLetters() >= 1) {

        const li = document.createElement('li')
        li.className = 'view'

        const div = document.createElement('div')
        div.className = 'view'

        const checkbox = document.createElement('input')
        checkbox.setAttribute('class', 'toggle')
        checkbox.setAttribute('type', 'checkbox');

        div.appendChild(checkbox)

        checkbox.addEventListener('click', (e) => {
            li.className = e.target.checked ? 'completed' : 'view'

            let completed = document.querySelectorAll('li.completed')

            if (completed.length >= 1) {
                clearCompleted.style.display = 'block'
            } else {
                clearCompleted.style.display = 'none'
            }
            // clearCompleted.style.display = e.target.checked ? 'block' : 'none'

            e.target.checked ? arrayList.pop() : arrayList.push(li)
            listCount.textContent = arrayList.length
            // savetasks();

        })

        const label = document.createElement('label')
        label.textContent = input.value

        div.appendChild(label)

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'destroy'

        div.appendChild(deleteBtn)

        const editTask = document.createElement('input')
        editTask.className = 'edit'
        editTask.setAttribute('value', label.value)

        div.appendChild(editTask)

        li.appendChild(div)

        list.appendChild(li)

        label.addEventListener('dblclick', (e) => {
            const valueGenerated = e.target.innerText

            const inputEdit = document.createElement('input')
            inputEdit.className = 'edit'
            inputEdit.setAttribute('value', e.target.innerText)
            inputEdit.focus()

            li.appendChild(inputEdit)
            li.classList.remove('view')
            li.classList.add('editing')


            inputEdit.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && inputEdit.value.length >= 1) {
                    li.classList.remove('editing')
                    li.classList.add('view')
                    label.textContent = inputEdit.value
                    li.removeChild(inputEdit)
                } else {
                    li.classList.remove('editing')
                    li.classList.add('view')
                    label.textContent = valueGenerated
                    li.removeChild(inputEdit)
                    // savetasks();
                }
            })

        })

        arrayList.push(li)

        listCount.textContent = arrayList.length

        deleteBtn.addEventListener('click', (e) => {
            list.removeChild(li)
        })

        input.value = ''
        console.log(arrayList[0].innerText)

        // savetasks();
    }

})

function showTask(status) {
    let elements = list.querySelectorAll('li')

    elements.forEach(li => {
        if (li.className != status
        ) {
            li.style.display = 'none'
        } else {
            li.style.display = 'block'
        }
    }
    )
}

const pendingBtn = document.getElementById('pending')

pendingBtn.addEventListener('click', () => {
    showTask('view')
    completedBtn.classList.remove('selected')
    allBtn.classList.remove('selected')
    pendingBtn.className = 'selected'
})


const completedBtn = document.getElementById('completed')

completedBtn.addEventListener('click', () => {
    showTask('completed')
    pendingBtn.classList.remove('selected')
    allBtn.classList.remove('selected')
    completedBtn.className = 'selected'
})


const allBtn = document.getElementById('all')

clearCompleted.addEventListener('click', () => {
    let elements = document.querySelectorAll('li.completed')
    clearCompleted.style.display = 'none'
    for (let i = 0; i < elements.length; i++) {
        const node = elements[i];
        list.removeChild(node)
    }
    // savetasks();
})

function showAllTask() {
    let elements = document.querySelectorAll('.todo-list li')
    for (let i = 0; i < elements.length; i++) {
        const node = elements[i];
        node.style.display = 'block'
    }
}

allBtn.addEventListener('click', () => {
    showAllTask()
    pendingBtn.classList.remove('selected')
    completedBtn.classList.remove('selected')
    allBtn.className = 'selected'
})

