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
            appId: '1:441631739911:web:c670cb7effdf2e934a1aa2'
};


const app = new initializeApp(firebaseConfig);
const auth = new getAuth();
const database = getDatabase(app);

submitData.addEventListener('click', (e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    var lgDate = new Date(); 
    update(ref(database, 'users/' + user.uid), {
      last_login: lgDate,
    })

  .then(() => {
    // Data saved successfully!
    alert('user logged in successfully');
    window.location.href = "../index.html";
  })
  .catch((error) => {
    // The write failed...
    alert('user error');
  });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

});