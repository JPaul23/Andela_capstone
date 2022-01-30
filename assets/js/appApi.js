let mainApp = {};

(() => {

    /******************** sign up user ******************** */
    const username = document.getElementById('usernameSign'),
        userEmail = document.getElementById('email'),
        phone = document.getElementById('signPhone'),
        pwd = document.getElementById('passwordSign')


    const signUpBtn = document.getElementById('signUp'),
        signUpForm = document.getElementById('signup-form');

    signUpBtn.addEventListener('click', (evt) => {
        evt.preventDefault()
        signUpApi();
        signUpForm.reset();
    });


    var usermail = userEmail.value;
    var userPhone = phone.value;
    var userName = username.value;
    var pswd = pwd.value;
    console.log(userEmail);
    //signup api
    function signUpApi() {
        //https://andela-node.herokuapp.com
        fetch('https://andela-node.herokuapp.com/api/v1/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: `${userName}`,
                phone: `${userPhone}`,
                email: `${usermail}`,
                password: `${pswd}`
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err.code)
                console.log(err.message)
            })
    }

    /************************ LOGIN ********************* */
    //only email for now!!
    const logInFom = document.getElementById('login-form'),
        userLog = document.getElementById('usernameLog'),
        password = document.getElementById('passwordLogin'),
        log = document.querySelector('.login-button');

    log.addEventListener('click', () => {
        loginApi();
        logInFom.reset();//reset the form
    });


    var logEmail = userLog.value;
    var logPassword = password.value;
    //login api
    function loginApi() {
        fetch('https://andela-node.herokuapp.com/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `${logEmail}`,
                password: `${logPassword}`
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err.code)
                console.log(err.message)
            })
    }

})();

