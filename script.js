import { getStorage, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";


  
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
              apiKey: 'AIzaSyCvzRPMNbpWhikWnqHT7ZO-MqaKi8IlMOs',
              authDomain: 'instagram-clone-943b1.firebaseapp.com',
              projectId: 'instagram-clone-943b1',
              storageBucket: 'instagram-clone-943b1.appspot.com',
              messagingSenderId: '441631739911',
              appId: '1:441631739911:web:c670cb7effdf2e934a1aa2'
  };
  
  
firebase.initializeApp(firebaseConfig);

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
    if (files.length != 0) {
      //Loops through all the selected files
      for (let i = 0; i < files.length; i++) {
        //create a storage reference
        var storage = firebase.storage().ref(files[i].name);
  
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




