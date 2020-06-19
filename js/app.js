console.log("File included succesfully");
showNotes();

//if user adds a note add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");

  let notes = localStorage.getItem("notes");


  

  if (notes == null) {
    notesObj = [];
  }
   else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTitle.value,
    text:addTxt.value

  }
  notesObj.push(myObj);

  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTxt.value = " ";
  addTitle.value = " ";

  showNotes();
});

//functions to get elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];

  }
   else {
    notesObj = JSON.parse(notes);
  }

  let html = " ";
  notesObj.forEach((element, index) => {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text" >${element.text}</p>
          <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</a>
        </div>
      </div>`;
  });

  let notesElm=document.getElementById('notes');
  if(notesObj.length!=0)
  {
      notesElm.innerHTML=html;
  }
  else
  {
    notesElm.innerHTML=`Nothing to show! Use "Add Note" feature to add a Note... `; 
  }
}

function deleteNote(index)
{
    console.log(`I am deleting ${index} Note`);

    let notes=localStorage.getItem('notes');
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);

    localStorage.setItem('notes',JSON.stringify(notesObj));

    showNotes();

    
}

let search=document.getElementById('searchTxt');

search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    
    
    let noteCards=document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach((element)=>{
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }



    })

})
