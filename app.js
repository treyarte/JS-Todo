const todoForm = document.querySelector('#todo-form');
const textInput = document.querySelector('#todo-input');
const list = document.querySelector('.list');
let listItems = [];

createTodos();

function createTodos() {
  if (localStorage.listItems) {
    listItems = JSON.parse(localStorage.listItems);
    for (let item of listItems) {
      addListItem(item);
    }
  }
}

list.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('complete');
  }
  if (e.target.tagName === 'SPAN') {
    removeListItem(e);
  }
});

todoForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if (textInput.value) {
    const todoValue = textInput.value;
    addListItem(todoValue);
    textInput.value = '';
    listItems.push(todoValue);
    localStorage.setItem('listItems', JSON.stringify(listItems));
  } else {
    alert('Please Enter a todo');
  }
});

function addListItem(item) {
  const listItem = document.createElement('LI');
  listItem.innerText = item;
  listItem.classList.add('list-item');

  const removeBtn = document.createElement('SPAN');
  removeBtn.classList.add('fas', 'fa-times');
  listItem.append(removeBtn);
  list.append(listItem);
}

function removeListItem(e) {
  list.removeChild(e.target.parentNode);
  listItems.splice(listItems.indexOf(e.target.parentNode.innerText), 1);
  if (listItems.length <= 0) {
    localStorage.removeItem('listItems');
  } else {
    localStorage.setItem('listItems', JSON.stringify(listItems));
  }
}
