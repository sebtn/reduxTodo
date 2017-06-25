import firebase from 'firebase'
import {apiKey} from './../apiKey'

try {
  let  config = {
    apiKey,
    authDomain: "burn-after-todo.firebaseapp.com",
    databaseURL: "https://burn-after-todo.firebaseio.com",
    projectId: "burn-after-todo",
    storageBucket: "burn-after-todo.appspot.com",
    messagingSenderId: "370880579534"
  }
  firebase.initializeApp(config)

} catch (error) {

}

export let firebaseRef = firebase.database().ref()
export default firebase
