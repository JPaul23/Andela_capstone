let secndFunc = {};

(() => {

    //storage initialization and reference
    const storage = firebase.storage()
    const storageRef = storage.ref();

    //firestore initialization and reference
    const db = firebase.firestore();

    const postBtn = document.getElementById('post'),
        title = document.getElementById('title'),
        date = document.getElementById('date'),
        authorName = document.getElementById('author'),
        photoPost = document.getElementById('photo-post');

    //textPost = document.getElementById('text-post');

    /*=============== uploading picture================ */


    postBtn.addEventListener('click', (evt) => {
        //upload image

        evt.preventDefault();
        //current user
        var uid = current();
        //console.log(uid);

        const photoV = photoPost.value;
        //checking the length of item
        //uploading


        if (photoV.length > 0) {
            const file = photoPost.files[0];
            //name of file
            const filename = photoV.replace(/^.*[\\\/]/, '');
            const metadata = {
                contentType: file.type
            };
            // reference to posts images;
            var postImages = storageRef.child(`posts/${filename}`);

            postImages.put(file, metadata)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    //url for our image
                    /* ================ then store data in NoSQL============*/
                    db.collection("posts").add({
                        Title: title.value,
                        Date: firebase.firestore.Timestamp.fromDate(new Date(date.value)),
                        Author: authorName.value,
                        Image: url
                        /* Description: message ???Bugs */
                        /*                         Description: textPost.value */
                    })
                        .then((docRef) => {
                            Swal.fire({  //swall message
                                position: 'center',
                                icon: 'success',
                                title: 'Document posted',
                                text: `Your Document with ID:  ${docRef.id}, has been successfully posted`,
                                showConfirmButton: true
                            });
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({  //swall message
                        position: 'center',
                        icon: 'warning',
                        title: err.code,
                        text: err.message,
                        showConfirmButton: true
                    });
                    photoPost.focus();
                })

        }
    });






    //cuurent signed in user
    function current() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                // ...
                return uid;
            }
            else {
                console.log('No user signed in');
            }
        });
    }
})();