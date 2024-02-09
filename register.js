import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
            apiKey: "AIzaSyCvzRPMNbpWhikWnqHT7ZO-MqaKi8IlMOs",
            authDomain: "instagram-clone-943b1.firebaseapp.com",
            projectId: "instagram-clone-943b1",
            storageBucket: "instagram-clone-943b1.appspot.com",
            messagingSenderId: "441631739911",
            appId: "1:441631739911:web:c670cb7effdf2e934a1aa2"
};


const app = new initializeApp(firebaseConfig);
const auth = new getAuth(app);
auth.languageCode = 'en'


const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    // signInWithPopup(auth, provider); // Uncomment this line if signInWithPopup is defined
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Signed up 
        const user = userCredential.user;
        console.log(10)
        alert("Creating Account ...")
        window.location.href = "../index.html"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })
 
    });

