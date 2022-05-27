import { getMessages, getOpenMessages, getUsers, setMessageToClosed, setMessageToOpen, setMessageToRead } from "../data/provider.js"

const mainContainer = document.querySelector('#container')


export const PrivateMessages = (messageObj) => {
    const users = getUsers()
    const openMessages = getOpenMessages()
    const openedMessage = openMessages.find(message => message.id === messageObj.id)
    const sender = users.find(user => user.id === messageObj.userId)
    if (messageObj.read === false) { 
        return `
        <button id="message--${messageObj.id}" class="container border">
            <i style="pointer-event: none" class="fa-solid fa-circle-dot fa-2xs m-1 mb-auto"></i>From ${sender.name}    
        </button>
        <div id="openedMessage--${messageObj.id}">${(openedMessage ? openedMessage.text : "")}</div>`
    } else {
        return `
        <button id="message--${messageObj.id}" class="container border">
            From ${sender.name}    
        </button>
        <div id="openedMessage--${messageObj.id}">${(openedMessage ? openedMessage.text : "")}</div>`
    }
}

// event listener -> click -> message title -> window alert message content //
mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('message')) {
        const [, messageId] = clickEvent.target.id.split('--')

        const messages = getMessages()
        const clickedMessage = messages.find(message => message.id === parseInt(messageId)) 

        if (document.querySelector(`#openedMessage--${messageId}`).innerHTML === ``) {
            setMessageToOpen(clickedMessage)
            document.querySelector(`#openedMessage--${messageId}`).innerHTML = `${clickedMessage.text}`
            
        } else {
            setMessageToClosed(clickedMessage)
            document.querySelector(`#openedMessage--${messageId}`).innerHTML = ``
        }
        if (clickedMessage.read === false) {
            setMessageToRead(clickedMessage.id)
        }

    }
})
