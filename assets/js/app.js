//firebase
let mainFunc = {};

(() => {

    /******************** sign up user ******************** */
    const username = document.getElementById('usernameSign'),
        userEmail = document.getElementById('email'),
        phone = document.getElementById('signPhone'),
        pwd = document.getElementById('passwordSign'),
        signupPage = document.querySelector('.signup__modal'),
        loginPage = document.querySelector('.login__modal');

    const signUpBtn = document.getElementById('signUp');
    signUpBtn.addEventListener('click', (evt) => {
        signUp();
    });


    function signUp() {
        var usermail = userEmail.value;
        var userPhone = phone.value;
        var userName = username.value;
        var pswd = pwd.value;
        console.log(usermail, userPhone, userName, pswd);

        //conditions
        const auth = app_firebase.auth();
        //signing
        auth.createUserWithEmailAndPassword(usermail, pswd).then(user => {
            /* uid = credential.user.uid; //capturing the uid of the user */
            storeData(userName, userPhone, usermail, pswd);

            Swal.fire({  //swall message
                position: 'center',
                icon: 'success',
                title: 'Success',
                text: `${userName} ,Your Account has been Created, you can login now`,
                showConfirmButton: false,
                button: 'Dismiss',
            });
            //removing class on signup and login page
            signupPage.classList.remove('active-modal');
            loginPage.classList.remove('active-modal');


        }).catch(err => {
            Swal.fire({  //swall message
                position: 'center',
                icon: 'error',
                title: 'Error happened',
                text: err.message,
                showConfirmButton: false,
                timer: 3500
            });
            /*  console.log(err.message); */

        });
        /*  if (usermail == false || userPhone == false || userName == false || pswd == "") console.log('something is wrong'); */


    }
    //creating user data in db
    function storeData(name, phone, email, password) {
        var database = app_firebase.database().ref('Users'); //db instance
        database.push({
            Name: name,
            Email: email,
            Phone: phone,
            Password: password
        })
            .then(console.log('Data stored'))
            .catch((err) => { console.log(err.message) });

    }

    //username verification
    function nameVerification(name) {
        const nameFormat = /^([1-zA-Z0-1@.\s]{1,255})$/;
        if (name.value.match(nameFormat)) return name.value;
        else {
            alert('Enter a valid name');
            name.focus();
            return false;
        }
    }

    //phone verifaction
    function phoneVerification(phone) {
        const phoneFormat = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/;

        if (phone.value.match(phoneFormat)) return phone.value;
        else {
            alert('Enter phone in 0732105432 format');
            phone.focus();
            return false;
        }
    }
    //email verification
    function emailVerification(email) {

        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value.match(mailFormat)) return email.value;
        else {
            alert('Enter a valid email');
            email.focus();
            return false;
        }
    }
    /*  app_firebase.auth().signInWithEmailAndPassword(email = 'email@gmail.com', password = 'paul122')
         .then((userCredential) => uid = userCredential.user.uid)
         .catch((error) => console.log(error)); */


    /* message handler */
    function messageHandler(err) {
        if (!!err) {
            console.log(err)
        } else {
            console.log("success")
        }
    }
    /************************ Subscription ********************* */


})();
