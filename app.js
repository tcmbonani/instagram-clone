import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

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
// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
    googleLogin.addEventListener("click", () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log(user);
          window.location.href = "../index.html";
    
        }).catch((error) => {
    
          const errorCode = error.code;
          const errorMessage = error.message;
        })
    });

