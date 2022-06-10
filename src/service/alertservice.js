export function alert(data, msg) {
    data.alertMsg = msg
    data.alertVisible = true
    setTimeout(() =>{
        data.alertMsg = null
        data.alertVisible = false
    },3000)
}