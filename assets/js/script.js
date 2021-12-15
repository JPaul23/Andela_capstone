/* ==================== LOGIN MODAL and SIGNUP MODAL ====================*/
const loginPage = document.querySelector('.login__modal'),
    loginBtn = document.querySelector('.login__button'),
    loginCloseBtn = document.querySelector('.login-modal-close'),
    signupLink = document.querySelector('.signupLink'),
    signupPage = document.querySelector('.signup__modal'),
    signCloseBtn = document.querySelector('.signup-modal-close'),
    loginLink = document.querySelector('.loginLink'),
    login = document.querySelector('.login-button');

loginBtn.addEventListener('click', () => {
    loginPage.classList.add('active-modal');
});

loginCloseBtn.addEventListener('click', () => {
    loginPage.classList.remove('active-modal');
});

signupLink.addEventListener('click', () => {
    signupPage.classList.add('active-modal');
});
signCloseBtn.addEventListener('click', () => {
    signupPage.classList.remove('active-modal');
    loginPage.classList.remove('active-modal');
});

loginLink.addEventListener('click', () => {
    signupPage.classList.remove('active-modal');
    /* loginPage.classList.add('active-modal'); */
});

/* login.addEventListener('click', (evt) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })/* .then((value) => {
        setTimeout(function(){
            window.location.replace("../index.html");
        }, 1000) */
//  });
//}); 
/* =============sign up============ */


/* ============contact form validation============ */
const form = document.getElementById('contactForm');
const nameF = document.getElementById('name-field');
const emailF = document.getElementById('email-field');
const phoneF = document.getElementById('phone-field');
//form button
const fomrBtn = document.getElementById('submit-form');


fomrBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    nameVerification(nameF);
    emailVerification(emailF);
    phoneVerification(phoneF);

});


/* ============ scroll to top============ */
/* const upHome = document.getElementById('uphome');
upHome.addEventListener('click', function () {
    window.scrollTo(0, 100);
    console.log('clicked');
}); */
//phone verifaction
function phoneVerification(phone) {
    const phoneFormat = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/;

    if (phone.value.match(phoneFormat)) return phone.value;
    else {
        alert('Enter phone in 0732105432 format');
        phone.focus();
    }
}

function emailVerification(email) {

    const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.match(mailFormat)) return true;
    //alert
    alert('Enter a correct Email');
    email.focus();
}
