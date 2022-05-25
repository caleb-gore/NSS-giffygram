/* <===> <===> IMPORTS <===> <===> */
import { Login } from "./auth/Login.js";
import { fetchPosts, fetchUsers } from "./data/provider.js";
import { GiffyGram } from "./GiffyGram.js";

// query selector -> main element -> by id 'container' //
const mainContainer = document.querySelector("#container");
/* END */

/* <===> <===> FUNCTIONS <===> <===> */

// function -> write HTML in main element //
const render = (HTML) => {
  return (mainContainer.innerHTML = HTML);
};

// function -> call fetch functions -> check authentication status -> call render function with appropriate argument //
const authenticationCheck = () => {
  const authenticated = localStorage.getItem("loginStatus");
  fetchPosts().then(() => fetchUsers()).then(() => {
    if (authenticated === "authenticated") {
      render(GiffyGram());
    } else {
      render(Login());
    }
  });
};
/* END */

authenticationCheck(); // authentication check //

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> state changed -> call authenticationCheck() //
mainContainer.addEventListener("stateChanged", (customEvent) => {
  console.log("State Changed, rendering...");
  authenticationCheck();
});

// event listener -> user authenticated -> call authenticationCheck() //
mainContainer.addEventListener("authenticated", (customEvent) => {
  console.log("authenticated");
  authenticationCheck();
});

// event listener -> login -> call authenticationCheck() //
mainContainer.addEventListener("login", (customEvent) => {
  console.log("logged in");
  authenticationCheck();
});

// event listener -> logout -> call authenticationCheck() //
mainContainer.addEventListener("logout", (customEvent) => {
  console.log("logged out");
  authenticationCheck();
});
/* END */
