function getLunar(day){

let lunar=[
"十七",
"十八",
"十九",
"二十",
"廿一",
"廿二",
"廿三",
"廿四",
"廿五",
"廿六",
"廿七",
"廿八",
"廿九",
"三十",
"初一",
"初二",
"初三",
"初四",
"初五",
"初六",
"初七",
"初八",
"初九",
"初十",
"十一",
"十二",
"十三",
"十四",
"十五",
"十六"
];


return lunar[(day-1)%30];

}

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

        if(
		i===now.getDate()
	){
		 d.classList.add("today");
	}

        d.innerHTML=
	`
	<span class="lunar-day">
	${getLunar(i)}
	</span>

	<span class="solar-day">
	${i}
	</span>
	`;


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

    let box =
    document.getElementById("notes");


    box.innerHTML="";

    if(notes.length===0){

	box.innerHTML=
	`
	<div class="empty">
	暂无笺录
	</div>
	`;

	return;

	}


notes.forEach((n,index)=>{


        box.innerHTML+=`

        <div class="note">


            <div class="note-head">


                <div>
                ${n.date}
                ${n.time}
                </div>


                <button 
                class="delete-btn"
                onclick="deleteNote(${index})">

                删除

                </button>


            </div>


            <p>
            ${n.text}
            </p>


        </div>

        `;


    });


}


showNotes();



// 每秒检查提醒

let reminded=[];


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
n.time===time &&
!reminded.includes(n)
){

document.getElementById(
"reminderText"
).innerHTML=n.text;



document.getElementById(
"reminder"
)
.style.display="flex";



reminded.push(n);


}



});


},1000);



function closeReminder(){

document.getElementById(
"reminder"
)
.style.display="none";

}



function deleteNote(index){


    if(!confirm("确定删除这一笺吗？")){
        return;
    }


    notes.splice(index,1);


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    showNotes();

}