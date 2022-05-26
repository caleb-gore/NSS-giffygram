/* <===> <===> IMPORTS <===> <===> */
import { getInboxOpen, getUsers, setCurrentUser } from "./data/provider.js";
import { MessageList } from "./feed/MessageList.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostList } from "./feed/PostList.js";
import { MessageForm } from "./message/MessageForm.js";
import { Footer } from "./nav/Footer.js";
import { NavBar } from "./nav/NavBar.js";

// function -> build HTML for GiffyGram from other components -> exported to main.js //

export const GiffyGram = () => {
  const inbox = getInboxOpen();
  const users = getUsers();
  const currentUserEmail = localStorage.getItem("user");
  const currentUser = users.find((user) => user.email === currentUserEmail);
  setCurrentUser(currentUser);
  
  let HTML = NavBar();
  // check 'clicked' status of post entry section //
  if (inbox === true) {
    HTML += MessageList(currentUser);
  } else {
    HTML += feed(currentUser);
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
<div>
${MessageForm()}
</div>
<div>
${PostEntry()}
</div>
<div>
${PostList()}
</div>
        
</div>`;
}
