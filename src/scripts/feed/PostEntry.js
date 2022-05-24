import { getPostEntryClicked, setPostEntryClicked } from "../data/provider.js"

export const PostEntry = () => {
    let HTML = "" 
    const newPost = getPostEntryClicked()
    if (newPost === true) {
        HTML = postEntryForm()
    } else {
        HTML = miniPostEntry()
    }
    return HTML
}



document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'postEntry') {
        setPostEntryClicked(true)
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id ==='cancel')
    setPostEntryClicked(false)
})

const miniPostEntry = () => {
    return "<div id='postEntry' class='border'><p>Have a gif to post?</p></div>"
}

const postEntryForm = () => {
    return `<div class="container border">
    <form>
    <div class="form-group">
        <input type="text" class="form-control mt-3" placeholder="Title">
        <input type="text" class="form-control mt-3" placeholder="URL or gif"
        <textarea placeholder="Story behind your gif..."></textarea>
        <button class="btn btn-primary mt-3 mb-3">Save</button>
        <button class="btn btn-primary mt-3 mb-3" id="cancel">Cancel</button>
        </div>
    </form>
    </div>`
}