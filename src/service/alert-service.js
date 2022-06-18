import app from "@/main"

export function alert(data, msg) {
    data.alertMsg = msg
    data.alertVisible = true
    setTimeout(() =>{
        data.alertMsg = null
        data.alertVisible = false
    },3000)
}

export function toastAlert(type, msg){
    const toast = app.config.globalProperties.$toast
    if(type === "success") {
        toast.success(msg)
    }

    if(type === "error") {
        toast.error(msg)
    }
}
