/* /*==================== LOGIN MODAL and SIGNUP MODAL ====================*/
const loginPage = document.querySelector('.login__modal'),
    loginBtn = document.querySelector('.login__button'),
    loginCloseBtn = document.querySelector('.login-modal-close'),
    signupLink = document.querySelector('.signupLink'),
    signupPage = document.querySelector('.signup__modal'),
    signCloseBtn = document.querySelector('.signup-modal-close'),
    loginLink = document.querySelector('.loginLink');

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
});

loginLink.addEventListener('click', () => {
    signupPage.classList.remove('active-modal');
    loginPage.classList.add('active-modal');
});


