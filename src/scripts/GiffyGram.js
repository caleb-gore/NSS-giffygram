/* <===> <===> IMPORTS <===> <===> */
import { getCurrentUser, getInboxIsOpen, getUsers, setCurrentUser, setInboxToOpen } from "./data/provider.js";
import { MessageList } from "./feed/MessageList.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostList } from "./feed/PostList.js";
import { MessageForm } from "./message/MessageForm.js";
import { Footer } from "./nav/Footer.js";
import { NavBar } from "./nav/NavBar.js";

// function -> build HTML for GiffyGram from other components -> exported to main.js //

export const GiffyGram = () => {
  const users = getUsers();
  const currentUserEmail = localStorage.getItem("user");
  const currentUser = users.find((user) => user.email === currentUserEmail);
  setCurrentUser(currentUser);
  
  let HTML = NavBar();
  if (getInboxIsOpen()) {
    HTML += `<div id="currentHTML">${MessageList(currentUsers)}</div>`;
  } else {
    HTML += `<div id="currentHTML">${feed(currentUser)}</div>`;
  }
  HTML += Footer()
  return HTML;
};

const feed = (currentUser) => {
   return `
<div class="container mt-5 pt-3 d-flex flex-column align-items-center">
<p>
Hello ${currentUser.name}, Welcome to GiffyGram
</p>
<div id="messageForm">
</div>
<div>
${PostEntry()}
</div>
<div>
${PostList()}
</div>
        
</div>`;
}

document.addEventListener('click', clickEvent => {
  if (clickEvent.target.id === 'inbox') {
    const currentUser = getCurrentUser()
    setInboxToOpen(true)
    document.querySelector('#currentHTML').innerHTML = MessageList(currentUser)
  }
})

document.addEventListener('click', clickEvent => {
  if (clickEvent.target.id === 'homeBtn') {
    const currentUser = getCurrentUser()
    setInboxToOpen(false)
    document.querySelector('#currentHTML').innerHTML = feed(currentUser)
  }
})

document.addEventListener('click', clickEvent => {
  if (clickEvent.target.id === 'newMessage') {
    document.querySelector('#messageForm').innerHTML = MessageForm()
  }
})

