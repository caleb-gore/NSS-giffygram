// function -> build HTML for footer -> exported //
export const Footer = () => {
    return `
    <footer class="d-flex fixed-bottom border justify-content-around ">
    <div >
    <label  >posts since</label>
    <select >
    <option >Year</option>
    </select>
    </div>
    <div >
    <label >posts by user</label>
    <select >
    <option>User Name</option>
    </select>
    </div>
    <div >
    <label >favorites</label>
    <input type="checkbox"></div>
    </footer>`
}