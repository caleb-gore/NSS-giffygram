import { Login } from "./auth/Login.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    return mainContainer.innerHTML = Login()
}

render()
