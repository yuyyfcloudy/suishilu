let notes =
JSON.parse(localStorage.getItem("notes"))
|| [];


const days =
document.getElementById("days");


const now =
new Date();


document.getElementById("today").innerHTML =
`${now.getFullYear()}年
${now.getMonth()+1}月
${now.getDate()}日`;



function createCalendar(){

    days.innerHTML="";


    let year =
    now.getFullYear();


    let month =
    now.getMonth();



    let first =
    new Date(year,month,1)
    .getDay();


    let total =
    new Date(year,month+1,0)
    .getDate();



    for(let i=0;i<first;i++){

        days.innerHTML+="<div></div>";

    }



    for(let i=1;i<=total;i++){

        let d=document.createElement("div");

        d.className="day";

        d.innerHTML=i;


        d.onclick=()=>{

            document.getElementById("noteDate").value=
            `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;

            openNote();

        };


        days.appendChild(d);

    }

}



createCalendar();



function openNote(){

    document.getElementById("modal")
    .style.display="flex";

}



function closeNote(){

    document.getElementById("modal")
    .style.display="none";

}



function saveNote(){

    let note={

        date:
        noteDate.value,

        time:
        noteTime.value,

        text:
        noteText.value

    };


    notes.push(note);


    localStorage.setItem(
    "notes",
    JSON.stringify(notes)
    );


    closeNote();

    showNotes();

}



function showNotes(){

    let box=
    document.getElementById("notes");


    box.innerHTML="";


    notes.forEach(n=>{

        box.innerHTML+=`

        <div class="note">

        ${n.date}
        ${n.time}

        <br>

        ${n.text}

        </div>

        `;

    });

}


showNotes();



// 每分钟检查提醒

setInterval(()=>{


let now =
new Date();


let current =
now.toISOString()
.slice(0,10);



let time =
now.toTimeString()
.slice(0,5);



notes.forEach(n=>{


if(
n.date===current &&
n.time===time
){

document.getElementById(
"reminderText"
).innerHTML=n.text;


document.getElementById(
"reminder"
)
.style.display="flex";


}



});


},60000);



function closeReminder(){

document.getElementById(
"reminder"
)
.style.display="none";

}