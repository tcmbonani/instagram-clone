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
  const triggers = document.querySelectorAll(".triggerPopup");
  const overlay = document.getElementById("overlay");
  const popupContent = document.getElementById("popupContent");

  // Function to handle opening the popup
  function openPopup() {
    overlay.style.display = "block"; // Display the overlay
    popupContent.style.display = "block"; // Display the pop-up content
  }

  // Function to handle closing the popup
  function closePopup() {
    overlay.style.display = "none"; // Hide the overlay
    popupContent.style.display = "none"; // Hide the pop-up content
  }

  // Event listener to open the pop-up for each trigger
  triggers.forEach(function(trigger) {
    trigger.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      openPopup();
    });
  });

  // Event listener to close the pop-up when the overlay is clicked
  overlay.addEventListener("click", function() {
    closePopup();
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
              link: document.getElementById("files").value, // Assuming there's an input field with id "caption"
              caption: document.getElementById("post").value,
              user: auth.currentUser.uid,
              postId: postKey
            };
          updates['/Posts/'+postKey] = postData;
          firebase.database().ref().update(updates)
          .then(() => {
              // Update UI or perform any other actions
              console.log("Post uploaded successfully with ID:", postKey);
              window.location.reload(); 
          })
          
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

      // Reference to the posts collection in your Firebase database
var postsRef = firebase.database().ref('posts');

// Generate a new post key (post ID)
var newPostRef = postsRef.push();

// Get the unique post key (post ID)
var postId = newPostRef.key;

// Now you can use this postId to associate with your post data

// For example, if you want to save a post with this postId
newPostRef.set({
  // Your post data here
})
.then(function() {
  console.log('Post saved successfully with ID:', postId);
})
.catch(function(error) {
  console.error('Error saving post:', error);
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

function fetchPostsFromDB() {
  return new Promise((resolve, reject) => {
    // Fetch posts from the 'users' node
    firebase.database().ref("users")
      .once('value')
      .then((snapshot) => {
        const allPosts = [];

        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          const userPosts = userData.posts || [];


          

          // Assuming each post is an object with properties like caption, imageUrl, etc.
          userPosts.forEach(post => {
            // Extract caption, url, and user from each post
            const {caption,url,user,postId,link} = post;
            allPosts.push({caption,url,user,postId,link});
          });
        });

        // Array of all posts from all users
        console.log('All posts from users:', allPosts);

        // Resolve with all posts fetched from users
        resolve(allPosts);
      })
      .catch((error) => {
        reject(error);
      });
  }).then((userPosts) => {
    // Fetch posts from the 'posts' node
    return firebase.database().ref("Posts") // Assuming "Posts" is the correct node name
      .once('value')
      .then((snapshot) => {
        const posts = userPosts.slice(); // Copy user posts

        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          // Extract caption, url, and user from each post
          const { caption, url, user, username,postId } = post;
          posts.push({ caption, url, user,username,postId });
        });

        // Array of all posts from 'users' and 'posts' nodes
        console.log('All posts from users and posts:', posts);

        // Resolve with all posts fetched from both sources
        return posts;
      });
  }).catch((error) => {
    console.log("Error getting documents: ", error);
    throw error; // Rethrow the error for the outer promise chain
  });
}

fetchPostsFromDB()
  .then(posts => {
    // Handle the fetched posts
    console.log("All fetched posts:", posts);
    // Assuming you have a function to display posts
    console.log(posts);
  })
  .catch(error => {
    // Handle any errors
    console.error("Error fetching posts:", error);
  });


  function fetchMyPostsFromDB() {
    // Get a reference to the user document using the userId
    var docRef = db.collection("users").doc(this.userId);
  
    // Retrieve the user document
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          // If the user document exists, retrieve the posts
          console.log("Document data:", doc.data().posts);
          this.posts = doc.data().posts;
          this.displayMyPosts(); // Display the posts
        } else {
          // If the user document doesn't exist, create a new one with an empty posts array
          console.log("No such document!");
          db.collection("users")
            .doc(this.userId)
            .set({
              posts: [], // Create an empty posts array
            })
            .then(() => {
              console.log("User successfully created!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  document.addEventListener("DOMContentLoaded", function() {
    // Reference to the posts container
    var postsContainer = document.getElementsByClassName('posts')[0]; // Assuming there's only one element with class 'posts'

    // Function to fetch posts from Firebase Realtime Database
    function fetchPostsFromDatabase() {
        var postsRef = firebase.database().ref('Posts/');
        postsRef.once('value', function(snapshot) {
            // Clear existing posts before fetching new ones
            postsContainer.innerHTML = '';

            snapshot.forEach(function(childSnapshot) {
                var postData = childSnapshot.val();
                createPostElement(postData);
            });
        });
    }

      // Function to create HTML elements for a post
      function createPostElement(postData) {
        var postDiv = document.createElement('div');
        postDiv.className = 'post';

    
        postDiv.innerHTML = `
        <div class="post" data-id="${postData.postId}">
        <div class="header">
            <div class="profile-area">
                <div class="post-pic">
                    <img
                        alt="User's profile picture"
                        class="_6q-tv"
                        data-testid="user-avatar"
                        draggable="false"
                        src="assets/akhil.png" 
                    />
                </div>
                <span class="profile-name">jayshetty</span> <!-- You can replace this with the actual profile name -->
            </div>
            
            <div class="options">
                <div class="Igw0E rBNOH YBx95 _4EzTm"  style="height: 24px; width: 24px">
                    <div id="triggerPopup" style="cursor: pointer;">
                        <svg
                            aria-label="More options"
                            class="_8-yf5 mod-open"
                            fill="#262626"
                            height="16"
                            viewBox="0 0 48 48"
                            width="16"
                        >
                            <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
                            <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
                            <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
                        </svg>                      
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Edit option -->
                    <p class="report" id="editOption">Edit</p>
                    <!-- Edit form -->
                    <div id="editFormSection" style="display: none;">
                        <h2>Edit Post</h2>
                        <form id="editForm">
                            <label for="post">Edit caption:</label><br>
                            <input type="text" id="post" name="post" placeholder="Enter caption"><br><br>
                            <input type="submit" value="Submit">
                        </form>
                    </div>
                    <!-- Other options -->
                    <div id="otherOptionsSection">
                        <p class="reports">Delete</p>
                        <p class="report">Report</p>
                        <p>Unfollow</p>
                        <p>Go to post</p>
                        <p>Share to...</p>
                        <p>Copy Link</p>
                        <p>Embed</p>
                        <p>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
        
        

        <div class="body">
            <img
                alt="Post image"
                class="FFVAD"
                decoding="auto"
                sizes="614px"
                src="${postData.url}" 
                style="object-fit: cover"
            />
        </div>
        <div class="footer">
            <div class="user-actions">
            </div>
            <span class="likes">Liked by <b>ishitaaaa.b</b> and <b>others</b></span>
            <span class="caption">
                <span class="caption-username"><b>jayshetty</b></span>
                <span class="postcaption-text">${postData.caption}</span>
            </span>
            <span class="comment">
                    <span class="caption-username"><b>akhilboddu</b></span>
                    <span class="caption-text">Thank you</span>
                  </span>
                  <span class="comment">
                    <span class="caption-username"><b>imharjot</b></span>
                    <span class="caption-text"> Great stuff</span>
                  </span>
                  <span class="posted-time">5 HOURS AGO</span>
                </div>
                <div class="add-comment">
                  <input type="text" placeholder="Add a comment..." />
            <a class="post-btn">Post</a>
        </div>
    </div>  

    <!-- Overlay -->
    <div class="overlay" id="overlay"></div>

    <!-- Section with content for pop-up -->
    <section id="popupContent" class="popup-container">
      Upload Files<br />
      <input type="file" id="files" multiple /><br /><br />
      <button id="createPostButton">Upload</button>
      <p id="uploading"></p>
      <progress value="0" max="0" id="progress"></progress>
      <input type="text" id="post" placeholder="caption">
    </section>
     `;

 // Append the postDiv to the postsContainer
 postsContainer.appendChild(postDiv);
 // Get all SVG elements for more options inside the postDiv
const moreOptionsIcons = postDiv.querySelectorAll(".mod-open");

// Add event listener to open modal when more options icon is clicked
for (let i = 0; i < moreOptionsIcons.length; i++) {
    moreOptionsIcons[i].addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event bubbling

        // Open the modal
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        // Get the <span> element that closes the modal
        var closeBtn = document.querySelector("#myModal .close");

        // Add event listener to close the modal when the close button is clicked
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });

        // Add event listener to close the modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}


// Get all delete options
const deleteOptions = document.querySelectorAll('.reports');

// Add event listener to each delete option
deleteOptions.forEach(function(deleteOption) {
    deleteOption.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event bubbling

        // Get the post ID associated with the clicked delete option
        const postId = this.closest('.post').dataset.id;

        // Get the user ID associated with the clicked delete option
        const userId = this.closest('.post').dataset.user;
        
        // Log the userId for debugging
        console.log("User ID:", postData.user);
        console.log("Post ID:", postData.postId);
        console.log(postId)
        console.log(auth.currentUser.uid)
        console.log(postData.user)

        // Check if the current user is authorized to delete the post
        if (postData.user === auth.currentUser.uid && postData.postId === postData.postId) {
            // Call the deletePost function with the postId of the clicked post
            deletePost(postData.postId);
        } else {
            // Handle unauthorized deletion
            console.log("You are not authorized to delete this post.");
        }
    });
});




// Function to delete a specific post from the database
function deletePost(postId) {
    // Get a reference to the post in the database
    var postRef = firebase.database().ref('Posts/' + postId + postData.user);
    
    // Remove the post from the database
    postRef.remove()
        .then(function() {
            console.log("Post deleted successfully");

            location.reload();
        })
        .catch(function(error) {
            console.error("Error deleting post:", error);
        });
}


     }
     // Call the function to fetch posts when the DOM content is loaded
fetchPostsFromDatabase();

 });

 // Get the profile picture element
const profilePic = document.querySelector(".profile-pic");

// Add event listener to open profile modal
profilePic.addEventListener('click', function() {
    // Open the profile modal
    var profileModal = document.getElementById("profileModal");
    profileModal.style.display = "block";

    // Get the <span> element that closes the profile modal
    var closeBtn = document.querySelector("#profileModal .close");

    // Add event listener to close the profile modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
        profileModal.style.display = "none";
    });

    // Add event listener to close the profile modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = "none";
        }
    });
});

// Logout button functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', function() {
    // Perform logout action, e.g., redirect to logout endpoint or clear authentication state
    // For example, in case of Firebase Authentication:
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // Redirect to login page or perform other actions as needed.
    }).catch(function(error) {
        // An error happened.
    });
});
