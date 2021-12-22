(() => {
    'use strict';

    window.addEventListener('load', (event) => {
        ;

    });

    //initialize firebase apps
    const storage = firebase.storage()
    const storageRef = storage.ref();

    const db = firebase.firestore();
    const retBtn = document.getElementById('ret');

    /* adding document  */
    /* TODO: update data accordingly */
    const rowContent = document.getElementById('contents');
    const spinner = document.getElementById('spinner');

    /* TODO :removing spinner when its done */
    /* spinner.classList.remove('half-circle-spinner', setTimeout(alert('removed'), 50000)); */
    /* rowContent.innerHTML = ``; */

    /* reading data from firestore */
    window.addEventListener('load', (event) => {
        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                console.log(`${doc.data().Author}`);
                rowContent.innerHTML += `<div class="col-md-6 col-sm-12 mar-bottom-30">
         <div class="blog-post_wrapper image-wrapper">
             <div class="blog-post-image">
                 <img src="${doc.data().Image}" />
             </div>
             <div class="post-content">
     
                 <div class="post-date">
                     <p><a href="#">${doc.data().Date}</a></p>
                 </div>
                 <h2 class="entry-title">
                     <a href="blog-details.html" class="white">${doc.data().Title}</a>
                 </h2>
                 <div class="item-meta white">
                     <span>by</span>
                     <a class="author-name white" href="author.html">${doc.data().Author}</a>
                 </div>
     
             </div>
         </div>
     </div>`;
            });
        })
            .then(() => {
                spinner.classList.remove('half-circle-spinner', setTimeout(50000))
            }
            )
            .catch((err) => err);
    });



    /* TODO:  deleting and updating======== */
    //add icon for updating and it's function

    //add icon for deleting and function
    const postContent = document.querySelector('.post-content');
    //postContent.addEventListener('hover', alert('hovering over me'))


})();

