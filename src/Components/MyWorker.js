const self = this
export default () => {
    self.addEventListener("FilthyData", e => {
        console.log(e.data)
        postMessage("hello")
    })
}