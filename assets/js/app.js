//firebase
let mainFunc = {};

(() => {
    //const auth = app_firebase.auth(); //initialize auth of firebase

    /* ************  Download the CV ************ */
    //const fireStorage = app_firebase.storage() //initialize the storage
    //const cvRef = fireStorage.refFromURL('gs://andela-cap.appspot.com/Cv/CV.pdf'); //cv reference

    const downloadCV = document.getElementById('download_cv');

    downloadCV.addEventListener('click', () => {
        //cvRef.child('Cv/CV.pdf').getDownloadURL()
        cvRef.getDownloadURL()
            .then((url) => {
                //window.open(url);
                var link = document.createElement("a");
                if (link.download !== undefined) {
                    link.setAttribute("href", url);
                    link.setAttribute("target", "_blank");
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }

            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    });


    /******************** sign up user ******************** */
    const username = document.getElementById('usernameSign'),
        userEmail = document.getElementById('email'),
        phone = document.getElementById('signPhone'),
        pwd = document.getElementById('passwordSign'),
        signupPage = document.querySelector('.signup__modal'),
        loginPage = document.querySelector('.login__modal');

    const signUpBtn = document.getElementById('signUp'),
        signUpForm = document.getElementById('signup-form');

    signUpBtn.addEventListener('click', (evt) => {
        evt.preventDefault()
        signUp();
        signUpForm.reset();
    });


    /************************ LOGIN ********************* */
    //only email for now!!
    const logInForm = document.getElementById('login-form'),
        userLog = document.getElementById('usernameLog'),
        password = document.getElementById('passwordLogin'),
        login = document.querySelector('.login-button');

    login.addEventListener('click', () => {

        logIn();
        logInForm.reset();//reset the form
    });


    /************************ AUTH APPS********************* */
    /*================ Google========== */

    const googleBtn = document.getElementById('google-btn');
    googleBtn.addEventListener('click', () => {
        googleSignIn();
    });

    //Create an instance of the Google provider 
    function googleSignIn() {
        const gProvider = new firebase.auth.GoogleAuthProvider();
        SignWithPopup(gProvider);
    }

    /*================ FaceBook ========== */
    const fbBtn = document.getElementById('facebook-btn');
    fbBtn.addEventListener('click', () => {
        fbSignIn();
    });

    //Create an instance of the facebook provider 
    function fbSignIn() {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        SignWithPopup(fbProvider);

    }
    /*================ Github ============= */

    const gitBtn = document.getElementById('github-btn');
    gitBtn.addEventListener('click', () => {
        gitSignIn();
    });

    //Create an instance of the github provider 
    function gitSignIn() {
        const gitProvider = new firebase.auth.GithubAuthProvider();
        SignWithPopup(gitProvider);

    }


    //sign with popup
    function SignWithPopup(provider) {
        auth.signInWithPopup(provider)
            .then((result) => {
                /* var credential = result.credential;
        
                //provider access token
                var token = credential.accessToken; */

                //signed in user info
                var user = result.user;
                console.log(user);


                if (user.emailVerified == true) {
                    Swal.fire({  //swall message
                        position: 'center',
                        icon: 'success',
                        title: 'Email Verified',
                        showConfirmButton: true,
                        text: `${user.displayName}, now you can access blog`,
                        button: 'OK',
                    })
                        .then(() => window.location.replace('dashboard.html'));

                }
                else {
                    Swal.fire({  //swall message
                        position: 'center',
                        icon: 'warning',
                        title: 'Email not verified',
                        showConfirmButton: true,
                        text: `${user.displayName}, your email is not verified`,
                        button: 'Dismiss',
                    });
                }
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.

                console.log(`Error Code: ${errorCode}, Message: ${errorMessage} , mail error: ${email}`);
            });

    }

    /********************** FORM HANDLING ********************/
    const nameForm = document.getElementById('name-field'),
        emailForm = document.getElementById('email-field'),
        phoneForm = document.getElementById('phone-field'),
        textForm = document.getElementById('feedback'),
        btnForm = document.getElementById('submit-form');
    btnForm.addEventListener('click', () => {
        var nameV = nameForm.value,
            emailV = emailForm.value,
            phoneV = phoneForm.value,
            textV = textForm.value;
        StoreFeedback(nameV, emailV, phoneV, textV);
    });




    //form submission function
    function StoreFeedback(name, email, phone, text) {
        var feedbackDB = createDb('Feedbacks');
        feedbackDB.push({
            Name: name,
            Email: email,
            Phone: phone,
            Text: text,
        })
            .then(() => {
                Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Thank you!',
                    text: `Thank you ${name} for your feedback`,
                    button: 'Dismiss',
                });
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
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


    /********************** FUNCTIONS  ********************/

    //login Function
    function logIn() {
        var logEmail = userLog.value;
        var logPassword = password.value;

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
                //console.log(data);
                /* Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                    time: '3500',
                }); */
                loginPage.classList.remove('active-modal');
                window.location.replace('dashboard.html');

            })
            .catch(err => {
                console.log(err.code)
                //console.log(err.message)
                /* Swal.fire({  //swal message
                    position: 'center',
                    icon: 'error',
                    title: err.code,
                    text: err.message,
                    showConfirmButton: false,
                    timer: 3500
                }); */
            })


        /* let user = null;
        auth.signInWithEmailAndPassword(email.value, password.value)
            .then((Credential) => {
                user = Credential.user;
                console.log(`user uid: ${user}`);
                Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: ` You successfully logged in`,
                    time: '2500',
                });
                loginPage.classList.remove('active-modal');
                window.location.replace('dashboard.html');
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
            }); */
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

        //signing in

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
            .then(res => res.json()
            )
            .then(data => {
                console.log(data)
                Swal.fire({  //swall message
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                    button: 'Dismiss',
                });
                //removing class on signup and login page
                signupPage.classList.remove('active-modal'),
                    loginPage.classList.add('active-modal')
            })
            .catch(err => {
                console.log(err.code)
                console.log(err.message)
                Swal.fire({  //swal message
                    position: 'center',
                    icon: 'error',
                    title: 'Something Is Wrong',
                    text: err.message,
                    showConfirmButton: false,
                    timer: 3500
                });

            })
        /* auth.createUserWithEmailAndPassword(usermail, pswd).then((credential) => {
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
             console.log(err.message);
        }); */
    }


    //creating user data in db
    function createDb(name) {
        //name has to be string
        let database = app_firebase.database().ref(name);
        return database;
    }

    function storeUserData(name, phone, email, password, userId) {
        var database = createDb(`Users/${userId}`); //db instance
        var photoUrl = null,
            displayName = null,
            emailVerification = null;

        database.set({
            Name: name,
            Email: email,
            Phone: phone,
            Password: password,
            Photo: photoUrl,
            displayname: displayName,
            emailVerified: emailVerification
        })
            .then(console.log('Data stored'))
            .catch((err) => { console.log(err.message) });

    }


    /* ===================End firebase ================ */


    //username verification
    function nameVerification(name) {
        const nameFormat = /^([1-zA-Z0-1@.\s]{1,255})$/;
        if (name.value.match(nameFormat)) return name.value;
        else {
            alert('Enter a valid name');
            name.focus();
        }
    }

    //phone verifaction
    function phoneVerification(phone) {
        const phoneFormat = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/;

        if (phone.value.match(phoneFormat)) return phone.value;
        else {
            alert('Enter phone in 0732105432 format');
            phone.focus();
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

})();
