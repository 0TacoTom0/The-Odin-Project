let isDarkMode = true;
const root = document.querySelector(':root');
const gradient = document.getElementById('gradient');

function changeMode(){
    if (isDarkMode) {
        isDarkMode = false;
        const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
        const myVariables = {
            '--navbar-colour': '#000000100',
            '--background-colour': '#FFFFFF',
            '--font-colour': '#000000',
            '--font-colour-two': '#000000',
            '--span-p-colour': '#000000',
            '--nav-font-weight': '400',
            '--header-button-colour': '#EFEFEF',
        };
        setVariables(myVariables);
        gradient.classList.add('hidden');
        document.getElementById("modeImg").src="assets/light-mode.svg";
    }
    else{
        isDarkMode = true;
        const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
        const myVariables = {
            '--navbar-colour': '#12121250',
            '--background-colour': '#000000',
            '--font-colour': '#D1D5DB',
            '--font-colour-two': '#FFFFFF',
            '--span-p-colour': '#FFFFFF',
            '--nav-font-weight': '100',
            '--header-button-colour': '#121212',
        };
        setVariables(myVariables);
        gradient.classList.remove('hidden');
        document.getElementById("modeImg").src="assets/dark-mode.svg";
    }
}