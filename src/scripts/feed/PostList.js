import { getPosts } from "../data/provider.js"
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