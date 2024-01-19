import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

const provider = new GoogleAuthProvider();
const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");
const btnSignInElm = document.querySelector("#btn-sign-in");
const loginOverlayElm = document.querySelector("#login-overlay");
const userNameElm = document.querySelector("#user-name");
const userEmailElm = document.querySelector("#user-email");
const accountElm = document.querySelector("#account");
const { API_BASE_URL } = process.env;

const user = {
    email: null,
    name: null,
    picture: null
};

onAuthStateChanged(auth, (loggedUser) => {
    if(loggedUser) {
        user.email = loggedUser.email;
        user.name = loggedUser.displayName;
        user.picture = loggedUser.photoURL;
        finalizeLogin();
        loginOverlayElm.classList.add('d-none');
    }
});

btnSendElm.addEventListener('click', () =>{
    const message = txtMessageElm.value.trim();
    if(!message) return;
    const msgObj = {
        message
    }

    fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgObj)
    }).then(res => {
        if(res.ok){
            addChatMessageRecord(msgObj);
            outputElm.scrollTo(0, outputElm.scrollHeight);
            txtMessageElm.value = '';
            txtMessageElm.focus();
            
        }else {
            alert("Failed to send the message, please try again");
        }
    }).catch(err => alert("Failed to connect with the server, please try again later"))
});

function addChatMessageRecord({message, email}) {
    const messageElm = document.createElement('div');
    messageElm.classList.add('message')

    outputElm.append(messageElm);
    messageElm.innerText = message;
    
}


btnSignInElm.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then(res => {
        user.name = res.user.displayName;
        user.email = res.user.email;
        user.picture = res.user.photoURL;
        loginOverlayElm.classList.add('d-none');
        finalizeLogin();
    }).catch(err => alert("Failed to sign in"));
    
});

function finalizeLogin() {
    userNameElm.innerText = user.name;
    userEmailElm.innerText = user.email;
    accountElm.style.backgroundImage = `url(${user.picture})`;
}


