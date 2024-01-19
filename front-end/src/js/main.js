import { auth } from '../firebase.js';
console.log(auth);

const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");
const { API_BASE_URL } = process.env;

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
