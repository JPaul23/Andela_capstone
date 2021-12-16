let app_firebase = {};

(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyDJ_GYiwIX_OussJweOwjQu7geka01hTc0",
        authDomain: "andela-cap.firebaseapp.com",
        databaseURL: "https://andela-cap-default-rtdb.firebaseio.com",
        projectId: "andela-cap",
        storageBucket: "andela-cap.appspot.com",
        messagingSenderId: "246731020315",
        appId: "1:246731020315:web:61c6cbf3035e20521100be"
    };

    //app initialization
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;

    /************************Create ********************* */
    /* const createFnc = (path, body, callback) => {
        if (!path || !body) return;
        app_firebase.database().ref(path).set(body, callback)
    } */


    /* app_firebase.databaseApi = {
        create: createFnc
          read: readFnc,
         update: updateFnc,
         delete: deleteFnc 
    } */

})();
