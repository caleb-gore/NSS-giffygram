/* <===> <===> IMPORTS <===> <===> */
import {
    getNewMessageClicked,
    setNewMessageClicked,
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
    </div>`;
};
/* END */

/* <===> <===> FUNCTIONS <===> <===> */

// event listener -> 'click' -> 'cancel' button -> set 'clicked' status to false //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "cancelMessage") setNewMessageClicked(false);
});
