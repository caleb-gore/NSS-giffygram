import { getCurrentUser, getMessages, setMessageToRead } from "../data/provider.js";
import { PrivateMessages } from "../message/PrivateMessages.js";

export const MessageList = (currentUser) => {
    let HTML = `<div class="container mt-5 pt-3 d-flex flex-column align-items-center">`
    const messages = getMessages().sort((a, b) => b.id - a.id)

    HTML += messages.map(message => {
        if (currentUser.id === message.recipientId) {
            return PrivateMessages(message)
        }
    }).join("")

    HTML += `</div>`
    
    return HTML
}

