import { getUsers, getPosts } from "../data/provider.js"

export const Post = (postObj) => {
    const users = getUsers()
    const postUser = users.find(user => user.id === postObj.userId)
    const date = new Date(postObj.timestamp)

    return `
    <div class="border mb-4">
    <h3>${postObj.title}</h3>
    <img src="${postObj.imageURL}" alt="gif image" width="500">
    <p>${postObj.description}</p>
    <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `
}
