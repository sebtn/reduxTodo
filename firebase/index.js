import firebase from 'firebase'
import {apiKey} from './../apiKey'


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
  app: {
    name: "Redux Todo",
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: "Seb",
    age: "IDK"
  }
}) 

/*-----------------------------------------------------------*/
/*Using arrays by creating a node called notes
Arrays are created as objects passing unique id as key*/

let todosRef = firebaseRef.child('todos')

/*Using TodosRef*/
todosRef.on('child_added', (snapshot) => {
  console.log('child added: ', snapshot.key + '\n' +  "object is: " , snapshot.val())
})

let newTodosRef = todosRef.push({
  text: "this is todo numero 1"
})
console.log('Key: todo id: ', newTodosRef.key)
