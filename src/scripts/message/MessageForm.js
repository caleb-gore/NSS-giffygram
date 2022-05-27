/* <===> <===> IMPORTS <===> <===> */
import {
    getCurrentUser,
    sendMessageToAPI,
    getUsers
} from "../data/provider.js";

/* <===> <===> FUNCTIONS <===> <===> */

// function -> build HTML for Message Form -> exported //
export const MessageForm = () => {
    return `<div class="container border mb-3">
    <h3 class="text-center">new message</h3>
    <form>
    <div class="form-group mt-3">
    <label>Recipient:</label>
    <select id="RecipientOfMessage" class="form-control">
    <option value="0">choose a recipient...</option>
    ${recipients()}
    </select>
    </div>
    
    <div class="form-group">
    <label class="mt-3">Message:</label>
    <input type="text" class="form-control" id="TextOfMessage" placeholder="Message to User">
    </div>
    
    <button class="btn btn-primary mt-3 mb-3" id="sendButton">Send</button>
    <button class="btn btn-primary mt-3 mb-3" id="cancelMessage">Cancel</button>
    </form>
    </div>`;
};


const recipients = () => {
    const users = getUsers()
    const currentUser = getCurrentUser()
    return users.map(user => {
        if (user.id === currentUser.id){
            return
        } else {
            return `
            <option value="${user.id}">${user.name}</option>`
        }
    }).join("")
}
/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> 'click' -> 'cancel' button -> set 'clicked' status to false //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "cancelMessage") {
    clickEvent.preventDefault()  
    document.querySelector('#messageForm').innerHTML = ""
  };
});

// event listener -> 'click' -> 'send' button -> send message to API //
document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'sendButton') {
        clickEvent.preventDefault()
        const currentUser = getCurrentUser() // object
        const messageRecipient = document.querySelector("#RecipientOfMessage").value // recipient id (must parse int)
        const newMessageText = document.querySelector('#TextOfMessage').value // string

        const newMessage = {
            userId: currentUser.id,
            recipientId: parseInt(messageRecipient),
            text: newMessageText,
            read: false
        }

        sendMessageToAPI(newMessage)
    }
})

