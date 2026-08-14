function getLunar(year, month, day){


    let solar =
    Solar.fromYmd(
        year,
        month,
        day
    );


    let lunar =
    solar.getLunar();


    console.log(
        year,
        month,
        day,
        lunar.toString()
    );


    return lunar.getDayInChinese();


}


let notes =
JSON.parse(localStorage.getItem("notes"))
|| [];


const days =
document.getElementById("days");


const now =
new Date();


let viewYear = now.getFullYear();

let viewMonth = now.getMonth();


document.getElementById("lunar").innerHTML =
`
农历${getLunar(
now.getFullYear(),
now.getMonth()+1,
now.getDate()
)}
`;


function createCalendar(){

    days.innerHTML="";


    let year = viewYear;

    let month = viewMonth;


    document.getElementById("monthTitle")
    .innerHTML =
    `${year}年 ${month+1}月`;



    let first =
    new Date(year,month,1)
    .getDay();


    let total =
    new Date(year,month+1,0)
    .getDate();



    // 补空白

    for(let i=0;i<first;i++){

        days.innerHTML +=
        "<div></div>";

    }



    // 生成日期

    for(let i=1;i<=total;i++){


        let d =
        document.createElement("div");


        d.className="day";



        // 今天标记

        if(
            year===now.getFullYear()
            &&
            month===now.getMonth()
            &&
            i===now.getDate()
        ){

            d.classList.add("today");

        }



        d.innerHTML=
        `
        <span class="lunar-day">
	${getLunar(year,month+1,i)}
        </span>

        <span class="solar-day">
        ${i}
        </span>
        `;



        d.onclick=()=>{


            document.getElementById(
                "noteDate"
            ).value =

            `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;


            openNote();


        };



        days.appendChild(d);


    }


}


createCalendar();


function changeMonth(step){


    viewMonth += step;



    if(viewMonth > 11){

        viewMonth = 0;

        viewYear++;

    }



    if(viewMonth < 0){

        viewMonth = 11;

        viewYear--;

    }



    createCalendar();


}


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