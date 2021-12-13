//firebase
let mainFunc = {};

(() => {
    const auth = app_firebase.auth(); //initialize auth of firebase

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


    /************************ LOGIN ********************* */
    //only email for now!!
    const userLog = document.getElementById('usernameLog'),
        password = document.getElementById('passwordLogin'),
        login = document.querySelector('.login-button');

    login.addEventListener('click', () => {
        logIn(userLog, password);
        const user = auth.currentUser;

        if (user) {
            console.log(user.Name);
        } else {
            console.log('No user is signed in.');
        }
    });

    /************************ SIGN OUT********************* */


    //currently signed in user



    //login Function
    function logIn(email, password) {

        let user = null;
        auth.signInWithEmailAndPassword(email.value, password.value)
            .then((Credential) => {
                user = Credential.user;
                console.log(`user uid: ${user}`);
                Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: ` You successfully logged in`,
                    button: 'Dismiss',
                });
                loginPage.classList.remove('active-modal');
            })
            .catch(err => {
                Swal.fire({  //swal message
                    position: 'center',
                    icon: 'error',
                    title: err.code,
                    text: err.message,
                    showConfirmButton: false,
                    timer: 3500
                });
            });
    }


    //sign Out function
    function signOut() {
        let uid = null;
        auth.signInWithEmailAndPassword(email, password)
            .then((Credential) => {
                uid = Credential.user.uid;
                console.log(`user uid: ${uid}`);
                Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: ` You successfully logged in`,
                    button: 'Dismiss',
                });
                loginPage.classList.remove('active-modal');
            })
            .catch(err => {
                Swal.fire({  //swal message
                    position: 'center',
                    icon: 'error',
                    title: err.code,
                    text: err.message,
                    showConfirmButton: false,
                    timer: 3500
                });
            });
    }

    //signup function
    function signUp() {
        let uid = null;
        var usermail = userEmail.value;
        var userPhone = phone.value;
        var userName = username.value;
        var pswd = pwd.value;
        console.log(usermail, userPhone, userName, pswd);

        //conditions

        //signing
        auth.createUserWithEmailAndPassword(usermail, pswd).then((credential) => {
            uid = credential.user.uid; //capturing the uid of the user
            storeUserData(userName, userPhone, usermail, pswd, uid);

            Swal.fire({  //swall message
                position: 'center',
                icon: 'success',
                title: 'Success',
                text: `${userName} ,Your Account has been Created, you can login now`,
                button: 'Dismiss',
            });
            //removing class on signup and login page
            signupPage.classList.remove('active-modal');
            loginPage.classList.remove('active-modal');


        }).catch(err => {
            Swal.fire({  //swal message
                position: 'center',
                icon: 'error',
                title: 'Something Is Wrong',
                text: err.message,
                showConfirmButton: false,
                timer: 3500
            });
            /*  console.log(err.message); */
        });
    }




    /************************ SUBSCRIPTION ********************* */
    const newsEmail = document.getElementById('news-email');
    const subBtn = document.getElementById('subscribe');

    subBtn.addEventListener('click', () => {
        if (emailVerification(newsEmail) == true) {
            var email = newsEmail.value;
            //subcribing db instance
            var subDb = createDb('NewsLetter');
            subDb.push(email)
                .then(() => {
                    Swal.fire({
                        title: "Good Job!",
                        text: "You have been successfully added to our Newsletter",
                        icon: "success",
                    });
                    newsEmail.value = "";

                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

    });


    //creating user data in db
    function createDb(name) {
        //name has to be string
        let database = app_firebase.database().ref(name);
        return database;
    }


    function storeUserData(name, phone, email, password, userId) {
        var database = createDb(`Users/${userId}`); //db instance
        database.set({
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

        if (email.value.match(mailFormat)) return true;
        //alert
        alert('Enter a correct Email');
        email.focus();
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


})();
