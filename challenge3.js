"use strict";
const inputtitle = document.getElementById("title");
const inputdescription = document.getElementById("description");
const inputdate = document.getElementById("date");
const inputemail = document.getElementById("email");
function refresh() {
    location.reload();
}
async function create() {
    if (!inputtitle.value || !inputdate.value || !inputdescription.value || !inputemail.value) {
        const warning = document.querySelector(".warning");
        warning.textContent = "please fill in the required details";
        warning.append;
    }
    else {
        await fetch('http://localhost:7000/Todo/create', {
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
        }).then(() => { refresh(); });
    }
}
const displaytasks = new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch('http://localhost:7000/Todo/uncompletedTodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
            resolve(data.json());
        })
            .catch(err => {
            reject({ error: err });
        });
    }, 200);
});
displaytasks.then((data) => {
    data.map((item) => {
        const Display = document.querySelector(".myTasks");
        const ul = document.createElement("ul");
        ul.classList.add("ul");
        const li = document.createElement("li");
        li.classList.add("li");
        const task = document.createElement("div");
        task.classList.add("list");
        const headertext = document.createElement("h4");
        headertext.classList.add("headertext");
        headertext.textContent = item.title;
        const description = document.createElement("p");
        description.textContent = item.descriptions;
        const date = document.createElement("p");
        date.textContent = "completion date: " + item.completionDate;
        const assignedTo = document.createElement("p");
        assignedTo.textContent = "assigned to: " + item.assignedTo;
        const edit = document.createElement("button");
        edit.classList.add("edit");
        edit.textContent = "Edit";
        edit.addEventListener('click', () => {
            alert(item.completionDate);
            const create = document.getElementById("myform");
            create.style.display = "none";
            const form = document.getElementById("editform");
            form.style.display = "block";
            const inputtitle = document.getElementById("edittitle");
            inputtitle.value = item.title;
            const inputdescription = document.getElementById("editdescription");
            inputdescription.value = item.descriptions;
            const inputdate = document.getElementById("editdate");
            inputdate.value = item.completionDate;
            const inputemail = document.getElementById("editemail");
            inputemail.value = item.assignedTo;
            const editbtn = document.querySelector(".edit");
            editbtn.addEventListener('click', () => {
                const edittitle = document.getElementById("edittitle").value;
                const editdescription = document.getElementById("editdescription").value;
                const editdate = document.getElementById("editdate").value;
                const editemail = document.getElementById("editemail").value;
                if (!edittitle || !editdescription || !editdate || !editemail) {
                    const warning = document.querySelector(".editwarning");
                    warning.textContent = "please fill in the required details";
                    warning.append;
                }
                else {
                    fetch('http://localhost:7000/Todo/update', {
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
                    }).then(() => { refresh(); });
                }
            });
        });
        const complete = document.createElement("button");
        complete.classList.add("complete");
        complete.textContent = "Complete";
        complete.id = "complete";
        complete.addEventListener('click', () => {
            const newdate = new Date();
            const subdate = new Date(item.completionDate);
            const date = subdate.valueOf() - newdate.valueOf();
            let diffyear = Math.floor(date / 31556952000); //years
            let diffmonths = Math.floor((date % 31556952000) / 2592000000); //months
            let diffDays = Math.floor(((date % 31556952000) % 2592000000) / 86400000); // days
            let diffHrs = Math.floor((((date % 31556952000) % 2592000000) % 86400000) / 3600000); // hours
            let diffMins = Math.round(((((date % 31556952000) % 2592000000) % 86400000) % 3600000) / 60000); // minutes
            let i;
            if (date > 0) {
                i = 'earlier';
            }
            if (date < 0) {
                i = 'late';
            }
            let diff = diffDays + " days " + diffHrs + " hours " + diffMins + " mins " + i;
            fetch('http://localhost:7000/Todo/' + item.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id,
                    submission: diff
                })
            }).then(() => {
                refresh();
            });
        });
        const deletebtn = document.createElement("button");
        deletebtn.classList.add("delete");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener('click', () => {
            fetch('http://localhost:7000/Todo/' + item.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id,
                })
            }).then(() => { refresh(); });
        });
        task.appendChild(headertext);
        task.appendChild(description);
        task.appendChild(date);
        task.appendChild(assignedTo);
        task.appendChild(edit);
        task.appendChild(complete);
        task.appendChild(deletebtn);
        li.appendChild(task);
        ul.appendChild(li);
        Display.appendChild(ul);
    });
});
const displaycomplete = new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch('http://localhost:7000/Todo/completedTodos', {
            method: 'GET'
        })
            .then(data => {
            resolve(data.json());
        })
            .catch(err => {
            reject({ error: err });
        });
    }, 200);
});
displaycomplete.then((data) => {
    data.map((item) => {
        const display = document.querySelector(".completedtasks");
        const ul = document.createElement("ul");
        ul.classList.add("ul");
        const li = document.createElement("li");
        li.classList.add("li");
        const task = document.createElement("div");
        task.classList.add("list");
        const headertext = document.createElement("h4");
        headertext.classList.add("headertext");
        headertext.textContent = item.title;
        const description = document.createElement("p");
        description.classList.add("descriptiont");
        description.textContent = item.descriptions;
        const date = document.createElement("p");
        date.classList.add("date");
        date.textContent = "submitted " + item.submission;
        const assignedTo = document.createElement("p");
        assignedTo.textContent = "assigned to: " + item.assignedTo;
        const deletebtn = document.createElement("button");
        deletebtn.classList.add("delete");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener('click', () => {
            fetch('http://localhost:7000/Todo/' + item.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id,
                })
            }).then(() => {
                refresh();
            });
        });
        task.appendChild(headertext);
        task.appendChild(description);
        task.appendChild(assignedTo);
        task.appendChild(date);
        task.appendChild(deletebtn);
        li.appendChild(task);
        ul.appendChild(li);
        display.appendChild(ul);
    });
});
