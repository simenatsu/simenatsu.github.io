document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals();
        }
    });
});


function openInputTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("input-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
}

function openOutputTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("output-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("outputTab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
}

function calculate(id,type){
    var normal = 400/910;
    var normal_hip = 380/400;
    var gyro = {"tpp":720,"fpp":720,"1x":300,"2x":280,"3x":200,"4x":180,"6x":100,"8x":80};
    //console.log(id);
    var value = document.getElementById(id).value;
    var coefficient;
    switch(type){
        case "hip":
            coefficient = normal_hip;
            break;
        case "gyro":
            coefficient = normal;
            break;
        case "normal":
            var sensi = id.replace(/_camera|_scope|_gyro/g, '');
            coefficient = 360/gyro[sensi];
            break;
    }
    var val = value*coefficient;
    document.getElementById(id+"_out").textContent = Math.round(val);
    document.getElementById(id+"_progress").value = val;
    document.getElementById(id+"_progress").innerText = val + "%";
}