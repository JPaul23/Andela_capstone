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