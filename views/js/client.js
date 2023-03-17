const socket =io("http://localhost:8000")


var name=prompt("Enter name to join the chat:")
socket.emit("new-user-joined",name)


  var msgContainer=document.querySelector(".first")


function generateMessage(msg,position){
    var div =document.createElement("div")
    div.classList.add("alert")
    div.role="alert"
    if(position==="left")
    {
        div.classList.add("bg-primary")
        div.classList.add("left")
        div.classList.add("text-light")
    }
    else if(position==="right"){
        div.classList.add("bg-primary")
        div.classList.add("right")
        div.classList.add("text-light")
    }
    else{
        div.classList.add("center")
    }
    div.innerHTML=  msg
    msgContainer.appendChild(div)
}
socket.on("user-joined",(name)=>{
    generateMessage(`${name} joined the chat`,"center")
})
socket.on("left",(name)=>{
    generateMessage(`${name} left the chat`,"center")
})

function postMessage(){
    var message= document.getElementById("message")
    generateMessage(`${message.value}: you`,"right")
    socket.emit("send",message.value)
}
socket.on("recieve",({message,name})=>{
    generateMessage(`${name} : ${message}`, "left")
})
