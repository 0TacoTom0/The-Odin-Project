function renderAboutPage() {
    let p = document.createElement('p');
    p.innerHTML = 'About Page';
    document.querySelector('main').appendChild(p);
}

export { renderAboutPage }