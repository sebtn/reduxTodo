import firebase from 'firebase'

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);

} catch (error) { }
/*
console.log("NODE_ENV",process.env.NODE_ENV) 
console.log("API_KEY",process.env.API_KEY)
console.log("AUTH_DOMAIN",process.env.AUTH_DOMAIN)
console.log("DATABASE_URL",process.env.DATABASE_URL)
console.log("PROJECT_ID",process.env.PROJECT_ID)
console.log("MESSAGING_SENDER_ID",process.env.MESSAGING_SENDER_ID)
console.log("STORAGE_BUCKET",process.env.STORAGE_BUCKET)
console.log("GITHUB_ACCESS_TOKEN",process.env.GITHUB_ACCESS_TOKEN)*/

/*Auth provider*/
export let githubProvider = new firebase.auth.GithubAuthProvider()
export let firebaseRef = firebase.database().ref()
export default firebase
