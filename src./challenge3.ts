interface tasks{
    id:string;
    title:string;
    description:string;
    completiondate:string;
    status:string
}

const inputtitle =document.getElementById("title") as HTMLInputElement
const inputdescription =document.getElementById("description") as HTMLInputElement
const inputdate =document.getElementById("date") as HTMLInputElement
const inputemail = document.getElementById("email") as HTMLInputElement

function refresh(){
    location.reload()
}
  
async function create(){
    if (!inputtitle.value|| !inputdate.value || !inputdescription.value || !inputemail.value){
        const warning = document.querySelector(".warning") as HTMLElement
        warning.textContent = "please fill in the required details"
        warning.append
    }else{
    await fetch('http://localhost:7000/Todo/create',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                title: inputtitle.value,
                description: inputdescription.value,
                completionDate: inputdate.value,
                status: "not complete",
                assignedTo: inputemail.value
        })
    }).then(()=>{refresh()})
    }
}
   

const displaytasks: Promise<tasks> = new Promise((resolve,reject) =>
{
    setTimeout(()=>{
    fetch('http://localhost:7000/Todo/uncompletedTodos',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => 
       {
          resolve(data.json())
           })
           .catch(err=>{
               reject({error:err});
           })
        },200)})
    displaytasks.then((data: any)=>{
        data.map((item: any)=>{
            const Display = document.querySelector(".myTasks") as HTMLElement            
            const ul = document.createElement("ul") as HTMLUListElement
            ul.classList.add("ul")
            const li = document.createElement("li")
            li.classList.add("li")
            const task = document.createElement("div")
            task.classList.add("list")

            const headertext = document.createElement("h4")
            headertext.classList.add("headertext")
            headertext.textContent= item.title

            const description = document.createElement("p")
            description.textContent= item.descriptions

            const date = document.createElement("p")
            date.textContent= "completion date: " + item.completionDate

            const assignedTo = document.createElement("p")
            assignedTo.textContent= "assigned to: " +item.assignedTo

            const edit = document.createElement("button")
            edit.classList.add("edit")
            edit.textContent= "Edit"
            edit.addEventListener('click', ()=>{
                alert(item.completionDate)
            const create = document.getElementById("myform") as HTMLDivElement
            create.style.display = "none"
            const form = document.getElementById("editform") as HTMLDivElement
            form.style.display = "block"

                const inputtitle = document.getElementById("edittitle") as HTMLInputElement
                inputtitle.value = item.title
                const inputdescription = document.getElementById("editdescription") as HTMLInputElement
                inputdescription.value = item.descriptions
                const inputdate = document.getElementById("editdate") as HTMLInputElement
                inputdate.value = item.completionDate
                const inputemail = document.getElementById("editemail") as HTMLInputElement
                inputemail.value = item.assignedTo
                const editbtn = document.querySelector(".edit") as HTMLButtonElement
                editbtn.addEventListener('click', ()=>{
                        const edittitle = (document.getElementById("edittitle") as HTMLButtonElement).value
                        const editdescription = (document.getElementById("editdescription") as HTMLButtonElement).value
                        const editdate = (document.getElementById("editdate") as HTMLButtonElement).value
                        const editemail = (document.getElementById("editemail") as HTMLButtonElement).value
                        if (!edittitle|| !editdescription || !editdate ||!editemail ){
                            const warning = document.querySelector(".editwarning") as HTMLElement
                            warning.textContent = "please fill in the required details"
                            warning.append
                        }else{
                        
                        fetch('http://localhost:7000/Todo/update',
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                id: item.id,
                                title: edittitle,
                                description: editdescription,
                                completionDate: editdate,
                                assignedTo: editemail
                        })
                    }
                    ).then(()=>{ refresh()})
                }
            }
                )
            }
            )

            const complete = document.createElement("button")
            complete.classList.add("complete")
            complete.textContent = "Complete"
            complete.id = "complete"
            complete.addEventListener('click', ()=>{
                const newdate = new Date();
                const subdate = new Date(item.completionDate)
                const date = subdate.valueOf() - newdate.valueOf()
                let diffyear = Math.floor(date / 31556952000);//years
                let diffmonths = Math.floor((date % 31556952000)/ 2592000000)//months
                let diffDays = Math.floor(((date % 31556952000)% 2592000000) / 86400000); // days
                let diffHrs = Math.floor((((date % 31556952000)% 2592000000) % 86400000) / 3600000); // hours
                let diffMins = Math.round(((((date % 31556952000)% 2592000000) % 86400000) % 3600000)/ 60000); // minutes
                let i
                if (date >0){
                    i = 'earlier'
                }
                if (date<0){
                    i = 'late'
                }
                let diff = diffDays+" days "+diffHrs+" hours "+diffMins+" mins " +i
                
                fetch('http://localhost:7000/Todo/' + item.id, 
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            id: item.id,
                            submission: diff
                    })
                }
                ).then(()=>{
                    refresh()
                })
             })

            const deletebtn = document.createElement("button")
            deletebtn.classList.add("delete")
            deletebtn.textContent = "Delete"
            deletebtn.addEventListener('click', ()=>{
                fetch('http://localhost:7000/Todo/' + item.id, 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            id: item.id,
                    })
                }
                ).then(()=>{ refresh()})
             })

            task.appendChild(headertext)
            task.appendChild(description)
            task.appendChild(date)
            task.appendChild(assignedTo)
            task.appendChild(edit)
            task.appendChild(complete)
            task.appendChild(deletebtn)
            li.appendChild(task)
            ul.appendChild(li)
            Display.appendChild(ul)      
            
})})


const displaycomplete: Promise<tasks> = new Promise((resolve,reject) =>
{
    setTimeout(()=>{
        fetch('http://localhost:7000/Todo/completedTodos',
    {
        method: 'GET'
    })
    .then(data => 
       {
          resolve(data.json())
           })
           .catch(err=>{
               reject({error:err});
           })
    },200)
        })
    displaycomplete.then((data: any)=>{
        data.map((item: any)=>{
            const display = document.querySelector(".completedtasks") as HTMLElement
            const ul = document.createElement("ul") as HTMLUListElement
            ul.classList.add("ul")
            const li = document.createElement("li")
            li.classList.add("li")
            const task = document.createElement("div")
            task.classList.add("list")

            const headertext = document.createElement("h4")
            headertext.classList.add("headertext")
            headertext.textContent= item.title

            const description = document.createElement("p")
            description.classList.add("descriptiont")
            description.textContent= item.descriptions

            const date = document.createElement("p")
            date.classList.add("date")
            date.textContent= "submitted " + item.submission 

            const assignedTo = document.createElement("p")
            assignedTo.textContent= "assigned to: " +item.assignedTo

            const deletebtn = document.createElement("button")
            deletebtn.classList.add("delete")
            deletebtn.textContent = "Delete"
            deletebtn.addEventListener('click', ()=>{
                fetch('http://localhost:7000/Todo/' + item.id, 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            id: item.id,
                    })
                }
                ).then(()=>{
                    refresh()
                })
             })

            task.appendChild(headertext)
            task.appendChild(description)
            task.appendChild(assignedTo)
            task.appendChild(date)
            task.appendChild(deletebtn)
            li.appendChild(task)
            ul.appendChild(li)
            display.appendChild(ul)      
    })
            
})
