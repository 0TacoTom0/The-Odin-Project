const dialog = document.querySelector("dialog");
const showButton = document.getElementById('addBookBtn');
const closeButton = document.querySelector("dialog button");
const submitBtn = document.getElementById('submitBtn');
const bookContainer = document.getElementById('bookContainer');
const userBookTitleInput = document.getElementById('userBookTitle');
const userBookStatus = document.getElementById('userStatus');
const form = document.getElementById('myForm');

const myLibrary = [
    {
        name: 'Book One',
        isRead: true
    },
    {
        name: 'Book Two',
        isRead: false
    }
];

showButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

function Book() {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.lastChild);
    };

    myLibrary.forEach(element => {
        const bookDiv = document.createElement("div");
        const nameDiv = document.createElement("div");
        const btnDiv = document.createElement("div");
        const bookTitle = document.createElement("h3");
        const bookNumber = document.createElement("p");
        const stateBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        bookTitle.innerHTML = element.name;
        bookNumber.innerHTML = `#${myLibrary.indexOf(element) + 1}`;
        stateBtn.innerHTML = `${element.isRead ? 'Read' : 'Unread'}`;
        deleteBtn.innerHTML = 'Delete';

        bookDiv.classList.add("book");
        stateBtn.setAttribute("id", `${element.isRead ? 'readStateBtn' : 'unreadStateBtn'}`);
        deleteBtn.setAttribute("id", myLibrary.indexOf(element));
        deleteBtn.classList.add('deleteButton');

        stateBtn.addEventListener("click", () => {
            if (stateBtn.innerHTML == 'Read') {
                stateBtn.innerHTML = 'Unread';
                stateBtn.setAttribute("id", "unreadStateBtn");
            }
            else{
                stateBtn.innerHTML = 'Read';
                stateBtn.setAttribute("id", "readStateBtn");
            }
        });
        deleteBtn.addEventListener("click", () => {
            removeBookFromLibrary(deleteBtn.id);
        });

        bookDiv.appendChild(nameDiv);
        bookDiv.appendChild(btnDiv);
        nameDiv.appendChild(bookTitle);
        nameDiv.appendChild(bookNumber);
        btnDiv.appendChild(stateBtn);
        btnDiv.appendChild(deleteBtn);
        bookContainer.appendChild(bookDiv);
    });
}

function addBookToLibrary() {
    let bookToAdd = {
        name: `${userBookTitleInput.value}`,
        isRead: userBookStatus.value == 'true' ? true : false
    };
    myLibrary.push(bookToAdd);

    userBookTitleInput.value = ''
    userBookStatus.value = 'true'

    Book();
    dialog.close();
    event.preventDefault();
}

function removeBookFromLibrary(index) {
    if (index > -1) {
        myLibrary.splice(index, 1);
    };
    Book();
}

Book();