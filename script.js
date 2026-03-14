let tasks = JSON.parse(localStorage.getItem("tasks")) || []

let today = new Date().toISOString().split("T")[0]
document.getElementById("taskDate").min = today

render()

function addTask(){

let text = document.getElementById("taskInput").value
let date = document.getElementById("taskDate").value
let priority = document.getElementById("taskPriority").value

if(text === "" || date === "") return

tasks.push({
text:text,
date:date,
priority:priority,
completed:false
})

saveTasks()
render()

document.getElementById("taskInput").value = ""

}

function render(){

document.getElementById("todayTasks").innerHTML = ""
document.getElementById("futureTasks").innerHTML = ""
document.getElementById("doneTasks").innerHTML = ""

let today = new Date().toISOString().split("T")[0]

tasks.sort((a,b)=> new Date(a.date) - new Date(b.date))

tasks.forEach((task,index)=>{

let li = document.createElement("li")

if(task.priority === "important"){
li.classList.add("important")
}

let formattedDate = new Date(task.date).toLocaleDateString("en-US",{
weekday:"short",
month:"short",
day:"numeric",
year:"numeric"
})

li.innerHTML = `
<span>${task.text} (${formattedDate})</span>
<div>
<button class="complete-btn">✔</button>
<button class="delete-btn">X</button>
</div>
`

li.querySelector(".complete-btn").onclick = function(){

task.completed = true
saveTasks()
render()

}

li.querySelector(".delete-btn").onclick = function(){

tasks.splice(index,1)
saveTasks()
render()

}

if(task.completed){

document.getElementById("doneTasks").appendChild(li)

}

else if(task.date === today){

document.getElementById("todayTasks").appendChild(li)

}

else{

document.getElementById("futureTasks").appendChild(li)

}

})

updateCounter()

}

function updateCounter(){

let remaining = tasks.filter(t => !t.completed).length
let completed = tasks.filter(t => t.completed).length
let total = tasks.length

document.getElementById("taskCounter").innerText =
"Tasks left: " + remaining

document.getElementById("progressText").innerText =
completed + " / " + total + " completed"

let percent = total === 0 ? 0 : (completed / total) * 100
document.getElementById("progressFill").style.width = percent + "%"

}

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks))

}

setInterval(render,60000)