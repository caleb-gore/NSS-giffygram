/* group HTML from other components and send to main.js */

const mainContainer = document.querySelector("#container")
export const GiffyGram = () => {
    return `Welcome to GiffyGram
        <button id="logout">Logout</button>`
}

mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === "logout") {
        localStorage.clear()
        mainContainer.dispatchEvent(new CustomEvent("logout"))
    }
})
    
