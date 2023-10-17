



let names=document.querySelector(".names")
let results=document.querySelector(".results");

let user_set=new Set();
let id_set=new Set();



//about names
function get_names(){
  let response=new XMLHttpRequest();
  response.open("GET",'https://jsonplaceholder.typicode.com/posts')
  response.send()

  response.onreadystatechange=function(){
    if(response.status>=200&&response.status<300){
    document.querySelector(".circle").style.display='none';
    let json=response.responseText;
    json=JSON.parse(json);
    for(let i=0;i<json.length;i++){
     if(!user_set.has(json[i].userId)){
      user_set.add(json[i].userId);
      id_set.add(json[i].id);
     }
    }

    let arr=[...user_set];
    loop_on_names(json,id_set,arr);
}
else{
  document.querySelector(".container").style.opacity=".1";
  document.querySelector(".circle").style.display='block';
}
}

}

function loop_on_names(json,id_set,arr){
  names.innerHTML="";
  let i=0;
  for(let index of id_set){
    show_names(json[index],arr[i]);
    i+=1;
  }
}

function show_names(ele,index){
   let div=document.createElement("div");
   div.className='name';
   div.innerHTML=`
   <h4>${ele.title}</h4>
   <p >${ele.body}</p>
   `;

   div.onclick=function(){
     clicked(index,this);
   }
  names.append(div);
}

get_names();



// about articles
function get_articles(index){
  let response=new XMLHttpRequest();
  let link=`https://jsonplaceholder.typicode.com/posts?userId=${index}`;
  response.open("GET",link)
  response.send();
  response.onload=function(){
    json=JSON.parse(response.responseText)
    results.innerHTML="";
     json.forEach(element => {
      create_articles(element)
     });
  }
}
function create_articles(ele){
    let div=document.createElement("div");
    div.className='res';
    div.innerHTML=`
    <p>${ele.title}</p>
    <hr class="newhr">
    <p>${ele.body}</p>
    `;
    results.append(div)

}

function clicked(index,ele){
  get_articles(index);
  let x=document.getElementsByClassName("selected");
    for(let i of x){
      i.classList.remove("selected")
    }
  ele.classList.add("selected");
}



