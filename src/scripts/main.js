/* <===> <===> IMPORTS <===> <===> */
import { Login } from "./auth/Login.js";
import { fetchUsers } from "./data/provider.js";
import { GiffyGram } from "./GiffyGram.js";

// query selector -> main element -> by id 'container' //
const mainContainer = document.querySelector("#container");

// function -> call fetch functions -> write HTML in main element //
const render = (HTML) => {
  fetchUsers().then(() => {
    return (mainContainer.innerHTML = HTML);
  });
};

const authenticationCheck = () => {
  const authenticated = localStorage.getItem("loginStatus");
  if (authenticated === "authenticated") {
    render(GiffyGram());
  } else {
    render(Login());
  }
};

authenticationCheck()

// event listener -> state changed -> re-render HTML//
mainContainer.addEventListener("stateChanged", (customEvent) => {
  console.log("State Changed, rendering...");
  render(Login());
});

mainContainer.addEventListener("authenticated", (customEvent) => {
  console.log("authenticated");
  render(GiffyGram());
});

mainContainer.addEventListener("logout", customEvent => {
  console.log("logged out")
  render(Login())
})