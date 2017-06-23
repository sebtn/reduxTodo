import firebase from 'firebase'
import {apiKey} from './../apiKey'
// Initialize Firebase
let  config = {
  apiKey,
  authDomain: "burn-after-todo.firebaseapp.com",
  databaseURL: "https://burn-after-todo.firebaseio.com",
  projectId: "burn-after-todo",
  storageBucket: "burn-after-todo.appspot.com",
  messagingSenderId: "370880579534"
}
firebase.initializeApp(config)

let firebaseRef = firebase.database().ref()

firebaseRef.set({
  appName: "Redux Todo",
  isRunning: true,
  user: {
    name: "Seb",
    age: 1
  }
}).then (() => {
  console.log('Set did it!')
}), (error) => {
  console.log('Set failed')
}
/* set method returns a promise*/
firebaseRef.child('user').set({
  name: "Sebtn 2",

})