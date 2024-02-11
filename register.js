import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getDatabase,set,ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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


createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {

  // Signed up 
  const user = userCredential.user;
  // ...user.uid
  set(ref(database, 'users/' + user.uid), {
    email: email,
    password: password
  })
.then(() => {
  // Data saved successfully!
  alert('user created');
})
.catch((error) => {
  // The write failed...
  alert('user error');
});

})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
  alert('error signing up');
});

});