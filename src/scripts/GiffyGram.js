import { getCurrentUser, getUsers, setCurrentUser } from "./data/provider.js";

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

// function -> build HTML for GiffyGram from other components -> exported to main.js //
export const GiffyGram = () => {
  const users = getUsers();
  const currentUserEmail = localStorage.getItem("user");
  const currentUser = users.find((user) => user.email === currentUserEmail);

  return `Hello ${currentUser.name}, Welcome to GiffyGram
        <button id="logout">Logout</button>`;
};

// event listener -> click -> 'Logout' -> remove authentication and dispatch logout event //
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "logout") {
    setCurrentUser({});
    localStorage.removeItem("loginStatus");
    mainContainer.dispatchEvent(new CustomEvent("logout"));
  }
});
