import { getMessages, getUsers, setMessageToRead } from "../data/provider.js"

const mainContainer = document.querySelector('#container')


export const PrivateMessages = (messageObj) => {
    const users = getUsers()
    const sender = users.find(user => user.id === messageObj.userId)
    if (messageObj.read === false) {
        return `
        <button id="message--${messageObj.id}" class="container border">
            <i style="pointer-event: none" class="fa-solid fa-circle-dot fa-2xs m-1 mb-auto"></i>From ${sender.name}    
        </button>`
    } else {
        return `
        <button id="message--${messageObj.id}" class="container border">
            From ${sender.name}    
        </button>`
    }
}

// event listener -> click -> message title -> window alert message content //
mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('message')) {
        const [, messageId] = clickEvent.target.id.split('--')

        const messages = getMessages()
        const clickedMessage = messages.find(message => message.id === parseInt(messageId)) 


        window.alert(`${clickedMessage.text}`)
        setMessageToRead(clickedMessage.id)

    }
})
