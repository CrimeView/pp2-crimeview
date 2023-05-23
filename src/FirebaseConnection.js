import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC1-Jg_yHkzyUYnnicrLsC_2RF9xCvCClM",
    authDomain: "crimeview-c3ec2.firebaseapp.com",
    projectId: "crimeview-c3ec2",
    storageBucket: "crimeview-c3ec2.appspot.com",
    messagingSenderId: "684143020202",
    appId: "1:684143020202:web:15c937fb758a8a7f2128d3"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export {auth};