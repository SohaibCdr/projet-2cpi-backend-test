import {initializeApp}from 'firebase/app'
import{
getFirestore, collection, 
  addDoc, 
}from 'firebase/firestore'
import{
createUserWithEmailAndPassword,getAuth,currentUser,signOut,
signInWithEmailAndPassword
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAS_slOecSHY0i2YJaOh4aCO2cYDG0pvZo",
  authDomain: "projet2cpi-c77c3.firebaseapp.com",
  projectId: "projet2cpi-c77c3",
  storageBucket: "projet2cpi-c77c3.appspot.com",
  messagingSenderId: "56492399485",
  appId: "1:56492399485:web:4221b222261e1c2ca54a14",
  measurementId: "G-2XHQBLKMZN"
};
initializeApp(firebaseConfig)
//initial services
const db = getFirestore()
const auth = getAuth()

const colRefemp = collection(db,'employee')
const colRefcomp = collection(db,'company')



const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      const user = currentUser()
      console.log('user created:', cred.user)
      addDoc(colRefemp,{
       fullname : signupForm.name.value,
       age : signupForm.age.value,
       email : signupForm.email.value,
       phonenumber : signupForm.phonenumber.value,
       password :signupForm.password.value,
       id : user.id.value,
      })
    signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
  })
const signupcompForm = document.querySelector('.signupcompany')
signupcompForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupcompForm.email.value
  const password = signupcompForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      addDoc(colRefcomp,{
    Employername : signupcompForm.name.value,
    foundationdate : signupcompForm.foundationdate.value,
    phonenumber : signupcompForm.phonenumber.value,
    websiteurl : signupcompForm.weburl.value,
    companysize : signupcompForm.companysize.value,
    Friendlyaddress :signupcompForm.address.value,
    Wilaya : signupcompForm.wilaya.value,
    Category : signupcompForm.category.value,
    Description : signupcompForm.description.value,
  }).then(() => {
      console.log('user created:')
      signupcompForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
    })
  })
  const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})


