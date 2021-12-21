(() => {
    //initialize firebase apps
    const storage = firebase.storage()
    const storageRef = storage.ref();

    const db = firebase.firestore();
    const retBtn = document.getElementById('ret');

    /* reading data from firestore */
    retBtn.addEventListener('click', () => {
        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                console.log(`${doc.data().Author}`);
            });
        }).catch((err) => err);
    });
})();