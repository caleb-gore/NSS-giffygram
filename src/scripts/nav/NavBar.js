/* <===> <===> IMPORTS <===> <===> */
import {
  setCurrentUser,
  setNewMessageClicked,
  setInboxOpen,
  getCurrentUser,
  getMessages,
} from "../data/provider.js";

/* <===> <===> FUNCTIONS <===> <===> */
export const NavBar = () => {
  const currentUser = getCurrentUser();
  const messages = getMessages();
  const unreadMessages = messages.filter(
    (message) =>
      currentUser.id === message.recipientId && message.read === false
  );

  if (unreadMessages.length !== 0) {
    return `
    <div class=" bg-white border fixed-top d-flex flex-row justify-content-center align-items-center">
    <button id="homeBtn" class="btn">
    <i style="pointer-events: none" class="fa-3x fa-solid fa-jar"></i>
    </button>  
      <h1 class="col-5">giffygram</h1>
      <button id="newMessage" class="btn">
      <i style="pointer-events: none" class="fa-3x fa-solid fa-pen-to-square"></i>
      </button>
      <button id="inbox" class="btn">
      <span style="pointer-events: none" class="fa-3x fa-layers fa-fw">
        <i  class=" fa-solid fa-envelope"></i>
        <span class=" fa-layers-counter " style="background:Tomato">${unreadMessages.length}</span>
      </span>
      </button>
      <button id="logout" class="btn">
      <i style="pointer-events: none" class="fa-3x fa-solid fa-right-from-bracket"></i>
    </div>
    `;
  } else {
    return `
    <div class=" bg-white border fixed-top d-flex flex-row justify-content-center align-items-center">
    <button id="homeBtn" class="btn">
    <i style="pointer-events: none" class="fa-3x fa-solid fa-jar"></i>
    </button>  
      <h1 class="col-5">giffygram</h1>
      <button id="newMessage" class="btn">
      <i style="pointer-events: none" class="fa-3x fa-solid fa-pen-to-square"></i>
      </button>
      <button id="inbox" class="btn">
      <span style="pointer-events: none" class="fa-3x fa-layers fa-fw">
        <i  class=" fa-solid fa-envelope"></i>
        
      </span>
      </button>
      <button id="logout" class="btn">
      <i style="pointer-events: none" class="fa-3x fa-solid fa-right-from-bracket"></i>
    </div>
    `;
  }
};

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> click -> 'Logout' -> remove authentication and dispatch logout event //
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "logout") {
    setCurrentUser({});
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("user");
    mainContainer.dispatchEvent(new CustomEvent("logout"));
  }
});

// event listener -> click -> 'New Message' -> set 'clicked' status to true //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newMessage") {
    setNewMessageClicked(true);
  }
});

// event listener -> click -> post entry section -> set 'clicked' status to true //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "inbox") {
    setInboxOpen(true);
  }
});

// event listener -> click -> post entry section -> set 'clicked' status to true //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "homeBtn") {
    setInboxOpen(false);
  }
});
