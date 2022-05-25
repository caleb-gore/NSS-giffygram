/* <===> <===> IMPORTS <===> <===> */
import {
    getCurrentUser,
    getNewMessageClicked,
    setNewMessageClicked,
    sendMessageToAPI,
    getUsers
} from "../data/provider.js";

/* <===> <===> FUNCTIONS <===> <===> */

// function -> build HTML for Message Form -> exported //
export const MessageForm = () => {
    let HTML = "";
    const newMessage = getNewMessageClicked();
    
    // check 'clicked' status of new message button //
    if (newMessage === true) {
        HTML = newMessageForm();
    }
    
    return HTML;
};

// function -> build new message form HTML //
const newMessageForm = () => {
    return `<div class="container border mb-3">
    <h3 class="text-center">new message</h3>
    <form>
    <div class="form-group mt-3">
    <label>Recipient:</label>
    <select id="messageRecipient" class="form-control">
    <option value="0">choose a recipient...</option>
    ${recipients()}
    </select>
    </div>
    
    <div class="form-group">
    <label class="mt-3">Message:</label>
    <input type="text" class="form-control" id="messageText" placeholder="Message to User">
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
  if (clickEvent.target.id === "cancelMessage") setNewMessageClicked(false);
});

// event listener -> 'click' -> 'send' button -> send message to API //
document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'sendButton') {
        const currentUser = getCurrentUser() // object
        const messageRecipient = document.querySelector("#messageRecipient").value // recipient id (must parse int)
        const newMessageText = document.querySelector('#messageText').value // string

        const newMessage = {
            userId: currentUser.id,
            recipientId: parseInt(messageRecipient),
            text: newMessageText,
            read: false
        }

        sendMessageToAPI(newMessage)
    }
})
