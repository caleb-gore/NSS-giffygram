import { getCurrentUser, getLikes, getPosts, getUsers } from "../data/provider.js"
import { Post } from "./Post.js";

// function -> build HTML for post list section -> exported //
export const PostList = () => {
    const posts = getPosts()
    posts.sort((a,b) => b.timestamp - a.timestamp)
    const postsArray = posts.map(post => {
        return Post(post)
    });
    const HTML = postsArray.join("")
    return HTML
}

// function -> build HTML for post list section -> exported //
export const FavoritedPostList = () => {
    const posts = getPosts()
    const likes = getLikes()
    const currentUser = getCurrentUser()
    posts.sort((a,b) => b.timestamp - a.timestamp)
    const postsArray = posts.map(post => {
        const likesForPost = likes.filter(like => like.userId === currentUser.id && like.postId === post.id)
        if (likesForPost.length) {
            return Post(post)
        }
    });
    const HTML = postsArray.join("")
    return HTML
}

export const SelectedUserPostList = (id) => {
    const posts = getPosts()
    const users = getUsers()
    const selectedUser = users.find(user => user.id === id)
    posts.sort((a,b) => b.timestamp - a.timestamp)
    const postsArray = posts.map(post => {
        if (selectedUser.id === post.userId) {
            return Post(post)
        }
    });
    const HTML = postsArray.join("")
    return HTML
}

export const SelectedYearPostList = (year) => {
    const posts = getPosts()
    posts.sort((a,b) => b.timestamp - a.timestamp)
    const postsArray = posts.map(post => {
        const date = new Date(post.timestamp)
        if (date.getFullYear() === year) {
            return Post(post)
        }
    });
    const HTML = postsArray.join("")
    return HTML
}


document.addEventListener('change', changeEvent => {
    if (changeEvent.target.id === 'showFavorites') {
        if (changeEvent.target.checked === true) {
            document.querySelector('#postList').innerHTML = FavoritedPostList()
        } else {
            document.querySelector('#postList').innerHTML = PostList()
        }
    }
})

document.addEventListener('change', changeEvent => {
    if (changeEvent.target.id === 'postsByUser') {
        const selectedUserId = parseInt(changeEvent.target.value)
        if (selectedUserId > 0) {
            document.querySelector('#postList').innerHTML = SelectedUserPostList(selectedUserId)
        } else {
            document.querySelector('#postList').innerHTML = PostList()
        }
    }
})

document.addEventListener('change', changeEvent => {
    if (changeEvent.target.id === 'postsSince') {
        const selectedYear = parseInt(changeEvent.target.value)
        if (selectedYear > 0) {
            document.querySelector('#postList').innerHTML = SelectedYearPostList(selectedYear)
        } else {
            document.querySelector('#postList').innerHTML = PostList()
        }
    }
})