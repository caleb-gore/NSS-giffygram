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

render(Login());  // function call

// event listener -> state changed -> re-render HTML//
mainContainer.addEventListener("stateChanged", (customEvent) => {
  render(Login());
});
