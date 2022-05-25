import { getUsers, getPosts, getCurrentUser, archivePost, deletePost } from "../data/provider.js"

export const Post = (postObj) => {
    const users = getUsers()
    const currentUser = getCurrentUser()
    const postUser = users.find(user => user.id === postObj.userId)
    const date = new Date(postObj.timestamp)

    // if postUser.id = currentUser.id
    if (currentUser.id === postUser.id) {
        // return post with button
        return `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <button class="btn" id="deletePost--${postObj.id}" ><i style="pointer-events: none" class="fa-solid fa-trash-can"></i></button>
        </div>
        `
    } else {
        // return post without button
        return `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        ` 
    }
}

// event listener -> click -> 'delete post' button -> archive and delete post //
document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('deletePost')) {
        const [, postId] = clickEvent.target.id.split("--")

        const posts = getPosts()
        const postToArchive = posts.find(post => post.id === parseInt(postId))

        archivePost(postToArchive)
        deletePost(postId)
    }
})