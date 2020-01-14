import firebase from 'firebase'
import firestore from 'firebase/firestore'
 
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAD6ON3BMoYSVaBW0MBC1I8aQHUo_rukVE",
    authDomain: "movie-app-209dc.firebaseapp.com",
    databaseURL: "https://movie-app-209dc.firebaseio.com",
    projectId: "movie-app-209dc",
    storageBucket: "movie-app-209dc.appspot.com",
    messagingSenderId: "789145885474",
    appId: "1:789145885474:web:6e0680660787a20414e37b",
    measurementId: "G-689KEVPX38"
  };

const firebaseApp =  firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();