import { getUsers, getPosts, getCurrentUser, archivePost, deletePost, saveLike, getLikes, deleteLike } from "../data/provider.js"

export const Post = (postObj) => {
    const users = getUsers() 
    const currentUser = getCurrentUser() 
    const likes = getLikes() 
    const postUser = users.find(user => user.id === postObj.userId) 
    const date = new Date(postObj.timestamp) 
    const postLikes = likes.filter(like => like.postId === postObj.id) 
    const currentUserLikes = postLikes.filter(like => like.userId === currentUser.id)
    // if postUser.id = currentUser.id
    if (currentUser.id === postUser.id) {
        
        // return post with button
        return (postLikes.length  ? `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <p>${postLikes.length} ${(postLikes.length === 1 ? "Like" : "Likes")}</p>
        <button class="btn" id="deletePost--${postObj.id}" ><i style="pointer-events: none" class="fa-solid fa-trash-can"></i></button>
        </div>
        ` : `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <button class="btn" id="deletePost--${postObj.id}" ><i style="pointer-events: none" class="fa-solid fa-trash-can"></i></button>
        <p></p>
        </div>
        `)
        
    } else {
        return (postLikes.length && currentUserLikes.length ? `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <p>${postLikes.length} ${(postLikes.length === 1 ? "Like" : "Likes")}</p>
        <div class="container d-flex justify-content-center">
        <button class="btn" id="unlikePost--${postObj.id}" ><i style="pointer-events: none" class="fa-solid fa-heart"></i></button>
        </div>
        </div>
        ` : (postLikes.length ? `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <p>${postLikes.length} ${(postLikes.length === 1 ? "Like" : "Likes")}</p>
        <div class="container d-flex justify-content-center">
        <button class="btn" id="likePost--${postObj.id}" ><i style="pointer-events: none" class="fa-regular fa-heart"></i></button>
        </div>
        </div>
        ` : `
        <div class="border mb-4">
        <h3>${postObj.title}</h3>
        <img src="${postObj.imageURL}" alt="gif image" width="500">
        <p>${postObj.description}</p>
        <p>posted by ${postUser.name} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        <div class="container d-flex justify-content-center">
        <button class="btn" id="likePost--${postObj.id}" ><i style="pointer-events: none" class="fa-regular fa-heart"></i></button>
        </div>
        </div>
        ` ))
        // return post without button
         
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

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('likePost')) {
        const [, postId] = clickEvent.target.id.split("--")

        const currentUser = getCurrentUser()

        const likeObj = {
            userId: currentUser.id,
            postId: parseInt(postId)
        }

        saveLike(likeObj)
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('unlikePost')) {
        const [, postId] = clickEvent.target.id.split("--")

        const likes = getLikes()
        const currentUser = getCurrentUser()
        const unclickedLike = likes.find(like => like.postId === parseInt(postId) && like.userId === currentUser.id)
        deleteLike(unclickedLike.id)
    }
})



/* Like Buttons

liked - <i class="fa-solid fa-heart"> </i>

unliked - <i class="fa-regular fa-heart"></i>

*/