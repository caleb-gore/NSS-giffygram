import { getPosts, getUsers } from "../data/provider.js"

// function -> build HTML for footer -> exported //
export const Footer = () => {
    return `
    <footer class="bg-white d-flex fixed-bottom border justify-content-around ">
    <div >
    <label  >posts since</label>
    <select id="postsSince">
    <option value="0">All Years</option>
    ${postsSince()}
    </select>
    </div>
    <div >
    <label >posts by user</label>
    <select id="postsByUser">
    <option value="0">Show All</option>
    ${postsByUser()}
    </select>
    </div>
    <div >
    <label >favorites</label>
    <input id='showFavorites' type="checkbox"></div>
    </footer>`
}

const postsByUser = () => {
    const users = getUsers()
    let HTML = users.map(user => {
        return `
        <option value="${user.id}">${user.name}</option>`
    }).join("")

    return HTML
}

const postsSince = () => {
    const posts = getPosts()
    const yearsArray = posts.map(post => {
        const date = new Date(post.timestamp)
        return date.getFullYear()
    })
    let uniqueYears = []
    yearsArray.forEach(year => {
        if (uniqueYears.includes(year) === false) {
            uniqueYears.push(year)
        }
    })

    uniqueYears.sort((a, b) => b - a)

    return uniqueYears.map(year => {
        return `<option value="${year}">${year}</option>`
    })
}