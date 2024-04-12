function renderMenuPage() {
    let p = document.createElement('p');
    p.innerHTML = 'Menu Page';
    document.querySelector('main').appendChild(p);
}

export { renderMenuPage }