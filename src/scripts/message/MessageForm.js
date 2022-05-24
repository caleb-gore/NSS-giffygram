import { getNewMessageClicked, setNewMessageClicked } from "../data/provider.js"

export const MessageForm = () => {
    let HTML = "" 
    const newMessage = getNewMessageClicked()
    if (newMessage === true) {
        HTML = newMessageForm()
    } 

    return HTML
}


document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id ==='cancelMessage')
    setNewMessageClicked(false)
})

const newMessageForm = () => {
    return `<div class="container border">
    <form>
    <div class="form-group mt-3">
    <label>Recipient:</label>
    <select class="form-control">
    <option>choose a recipient...</option>
    </select>
    </div>

    <div class="form-group">
    <label class="mt-3">Message:</label>
    <input type="text" class="form-control " placeholder="Message to User">
    </div>

    <button class="btn btn-primary mt-3 mb-3">Save</button>
    <button class="btn btn-primary mt-3 mb-3" id="cancelMessage">Cancel</button>
    </form>
    </div>`
}