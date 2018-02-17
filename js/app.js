/*jshint esversion: 6 */
/* jshint browser: true */
'use strict';


const init = ((document)=>{
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(prop => element[prop] = props[prop]);
    if (children.length > 0) {
        children.forEach((child) => {
            if (typeof child == 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }


    return element;
}

function createTodoItem(title) {

    const checkbox = createElement('input', {
        type: 'checkbox',
        className: 'checkbox'
    });
    const label = createElement('label', {
        className: 'title'
    }, title);
    const editInput = createElement('input', {
        className: 'textfield',
        type: 'text'
    });
    const editButton = createElement('button', {
        className: 'edit'
    }, 'Edit');
    const deleteButton = createElement('button', {
        className: 'delete'
    }, 'Delete');
    const listItem = createElement('li', {
        className: 'todo-item'
    }, checkbox, label, editInput, editButton, deleteButton);


    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function toggleTodoItem(e) {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem(e) {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    listItem.classList.toggle('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Edit';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Save';
    }
}

function deleteTodoItem(e) {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}


function addTodoItem(e) {
    e.preventDefault();
    if (addInput.value === '') return alert('Enter the name of a task!');

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

function init() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}

return init();

})(document);

