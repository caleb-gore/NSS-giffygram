import { Login } from "./auth/Login.js";
import { fetchUsers } from "./data/provider.js";

const mainContainer = document.querySelector("#container");

const render = () => {
  fetchUsers().then(() => {
    return (mainContainer.innerHTML = Login());
  });
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});
