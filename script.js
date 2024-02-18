import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getDatabase,set,ref,update} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
  
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
              apiKey: 'AIzaSyCvzRPMNbpWhikWnqHT7ZO-MqaKi8IlMOs',
              authDomain: 'instagram-clone-943b1.firebaseapp.com',
              projectId: 'instagram-clone-943b1',
              storageBucket: 'instagram-clone-943b1.appspot.com',
              messagingSenderId: '441631739911',
              appId: '1:441631739911:web:c670cb7effdf2e934a1aa2',
              databaseURL: 'https://instagram-clone-943b1-default-rtdb.firebaseio.com/'
  };
  
  
firebase.initializeApp(firebaseConfig);
const auth = new getAuth();
const database = getDatabase();

  var files = [];
document.getElementById("files").addEventListener("change", function(e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

  
document.addEventListener("DOMContentLoaded", function() {
    const triggerPopup = document.getElementById("triggerPopup");
    const overlay = document.getElementById("overlay");
    const popupContent = document.getElementById("popupContent");

    // Event listener to open the pop-up
    triggerPopup.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      overlay.style.display = "block"; // Display the overlay
      popupContent.style.display = "block"; // Display the pop-up content
    });

    // Event listener to close the pop-up when the overlay is clicked
    overlay.addEventListener("click", function() {
      overlay.style.display = "none"; // Hide the overlay
      popupContent.style.display = "none"; // Hide the pop-up content
    });

    // Event listener to stop propagation when clicking inside the pop-up content
    popupContent.addEventListener("click", function(event) {
      event.stopPropagation();
    });
  });

  document.getElementById("createPostButton").addEventListener("click", function() {
    //checks if files are selected

      // Get caption of the post
      const caption = document.getElementById("post").value; // Assuming there's an input field with id "caption"

    if (files.length != 0) {
      //Loops through all the selected files
      for (let i = 0; i < files.length; i++) {
        //create a storage reference
        var storage = firebase.storage().ref(files[i].name);
        var uploadTask = storage.put(files[0]);
  
        //upload file
        var upload = storage.put(files[i]);
  
        //update progress bar
        upload.on(
          "state_changed",
          function progress(snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").value = percentage;
          },
  
          function error() {
            alert("error uploading file");
          },
  
          function complete() {

            var postKey = firebase.database().ref('Posts/').push().key;
            var downloadURL = uploadTask.snapshot.downloadURL;
            var updates = {};
            var postData ={
              url: downloadURL,
              caption: document.getElementById("files").value, // Assuming there's an input field with id "caption"
              captions: document.getElementById("post").value,
              user: auth.currentUser.uid
            };
            updates['/Posts/'+postKey] = postData;
            firebase.database().ref().update(updates);
          
            document.getElementById(
              "uploading"
            ).innerHTML += `${files[i].name} upoaded <br />`;
          }

        );
      }
    } else {
      alert("No file chosen");
    }

  });
  
  function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);


  
    //get file url
    storage
      .getDownloadURL()
      .then(function(url) {
        console.log(url);
      })
      
      .catch(function(error) {
        console.log("error encountered");
      });

  }

document.addEventListener("DOMContentLoaded", function() {
    // Get the modal
    var modal = document.getElementById("myModal");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // Get all SVG elements for more options
    const moreOptionsIcons = document.querySelectorAll(".mod-open");
  
    // Function to open the modal
    function openModal() {
        modal.style.display = "block";
        // You can also render modal content here if needed
    }

    // Iterate over all SVG elements and attach click event listeners
    moreOptionsIcons.forEach(function(icon) {
        icon.addEventListener("click", openModal);
    });
  
    // When the user clicks on <span> (x) or outside of the modal, close the modal
    window.onclick = function(event) {
        if (event.target == modal || event.target == span) {
            modal.style.display = "none";
        }
    };
});
  
  





