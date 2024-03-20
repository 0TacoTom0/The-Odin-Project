const bellBtn = document.getElementById('notificationBtn');
const bellBtnImg = document.getElementById('bellImg');

bellBtn.addEventListener('click', addOrRemoveBellAnimation);

let isEnabled = false;
function addOrRemoveBellAnimation(){
    if (isEnabled) {
        bellBtn.classList.remove('animationRotateBell');
        bellBtnImg.src="logo/bell-ring-outline.svg";
        isEnabled = false;
    }
    else{
        bellBtn.classList.add('animationRotateBell');
        bellBtnImg.src="logo/bell-ring.svg";
        isEnabled = true;
    }
}