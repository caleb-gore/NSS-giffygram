/* <===> <===> IMPORTS <===> <===> */
import { Login } from "./auth/Login.js";
import { fetchUsers } from "./data/provider.js";
import { GiffyGram } from "./GiffyGram.js";

// query selector -> main element -> by id 'container' //
const mainContainer = document.querySelector("#container");
/* END */

/* <===> <===> FUNCTIONS <===> <===> */

// function -> call fetch functions -> write HTML in main element //
const render = (HTML) => {
    return (mainContainer.innerHTML = HTML);
};

// function -> check authentication status -> call render function with appropriate argument //
const authenticationCheck = () => {
  const authenticated = localStorage.getItem("loginStatus");
  fetchUsers().then(() => {
  if (authenticated === "authenticated") {
      render(GiffyGram());
    } else {
      render(Login());
    }
  })
};
/* END */

authenticationCheck(); // authentication check //

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> state changed -> render Login() HTML //
mainContainer.addEventListener("stateChanged", (customEvent) => {
  console.log("State Changed, rendering...");
  render(Login());
});

// event listener -> user authenticated -> render GiffyGram() HTML //
mainContainer.addEventListener("authenticated", (customEvent) => {
  console.log("authenticated");
  render(GiffyGram());
});

// event listener -> logout -> render Login() HTML //
mainContainer.addEventListener("logout", (customEvent) => {
  console.log("logged out");
  render(Login());
});
/* END */
