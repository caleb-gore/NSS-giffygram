import { setCurrentUser } from "../data/provider.js";

export const NavBar = () => {
  return `
  <div class="border fixed-top d-flex flex-row justify-content-center">
    <button class="btn"><i id="home" class="fa-solid fa-jar fa-2xl"></i></button>
    <h1 class="col-5">giffygram</h1>
    <button class="btn "><i id="newMessage" class="fa-solid fa-pen-to-square fa-2xl"></i></button>
    <button class="btn"><i class="fa-solid fa-envelope fa-2xl"></i></button>
    <button class="btn" id="logout"><i style="pointer-events: none" class="fa-solid fa-right-from-bracket fa-2xl"></i></button>
  </div>
  `;
};

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

// event listener -> click -> 'Logout' -> remove authentication and dispatch logout event //
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "logout") {
    setCurrentUser({});
    localStorage.removeItem("loginStatus");
    mainContainer.dispatchEvent(new CustomEvent("logout"));
  }
});
