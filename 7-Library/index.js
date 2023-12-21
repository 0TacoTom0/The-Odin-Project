const addBookBtn = document.getElementById('addBookBtn');
const overlay = document.getElementById("bookOverlay");

let objectArr = [];
let item1 = new Book('Tom', 'true')
let item2 = new Book('Bruh', 'false')
objectArr.push(item1)
objectArr.push(item2)

addBookBtn.addEventListener('click', showForm);

function showForm() {
    overlay.style.display = "flex";
}

function hideForm() {
    overlay.style.display = "none";
    document.getElementById("form").reset();
}

let bool = true;
function getClickedElem(id) {
    if (bool) {
        bool = false
        if (id == 'bookOverlay') hideForm();
        setTimeout(function() {
            bool = true; 
        }, 100);
    }
}

function submitForm() {
    event.preventDefault();
    getResults();
    hideForm();
}

function changeState(elem, button) {
    if (elem.status == 'true') {
        elem.status = 'false';
        button.classList.replace('readState', 'unreadState');
        button.innerHTML = 'Unread';
    }
    else{
        elem.status = 'true';
        button.classList.replace('unreadState', 'readState');
        button.innerHTML = 'Read';
    }
}

function Book(name, status) {
    this.name = name;
    this.status = status;
}

function removeBook(elem) {
    objectArr.splice(objectArr.indexOf(elem), 1);
    renderBooks();
}

function getResults() {
    let tempName = document.getElementById('titleInput').value;
    let hasReadBook = document.querySelector('input[name="readStatus"]:checked').value;
    let newBook = new Book(tempName, hasReadBook);
    objectArr.push(newBook);
    renderBooks();
}

function renderBooks() {
    const currentDiv = document.getElementById("bookContainer");
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
    objectArr.forEach(elem => {
        const newDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const title = document.createElement('h2');
        const bookNum = document.createElement('p');

        newDiv.classList.add('bookDiv');
        title.innerHTML = elem.name;
        bookNum.innerHTML = `#${objectArr.indexOf(elem)+1}`;

        textDiv.appendChild(title);
        textDiv.appendChild(bookNum);
        newDiv.appendChild(textDiv);

        const buttonDiv = document.createElement('div');
        const buttonRead = document.createElement('button');
        const buttonDelete = document.createElement('button');

        buttonDiv.classList.add('bookButtonContainer');
        if (elem.status == 'true') {
            buttonRead.innerHTML = 'Read';
            buttonRead.classList.add('readState');
        }
        else {
            buttonRead.innerHTML = 'Unread'
            buttonRead.classList.add('unreadState');
        }
        buttonRead.addEventListener('click', function() {
            changeState(elem, buttonRead);
        });
        buttonDelete.innerHTML = 'Delete';
        buttonDelete.classList.add('deleteButton');
        buttonDelete.addEventListener('click', function() {
            removeBook(elem);
        });

        buttonDiv.appendChild(buttonRead);
        buttonDiv.appendChild(buttonDelete);
        newDiv.appendChild(buttonDiv);

        currentDiv.appendChild(newDiv);
    });
}

renderBooks();