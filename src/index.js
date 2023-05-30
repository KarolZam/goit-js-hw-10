import './css/styles.css';
const _ = require('lodash');
const DEBOUNCE_DELAY = 300;
import Notiflix from 'notiflix';
const searchBox = document.querySelector("#search-box")
const ul = document.querySelector(".country-list")
const url = "https://restcountries.com/v3.1/name/"
let country = searchBox
let data = []


searchBox.addEventListener("input",_.debounce(()=>{
    getUrl(url,country) .then((data) => {
        // console.log(data)
        ul.innerHTML = ""
        drawResults(data)
      }).catch((error)=> console.log("error"))
         }, DEBOUNCE_DELAY))


function getUrl(url,country){return new Promise((resolve, reject) => {
    fetch (`${url}${country.value}`)
    .then((response)=>{
    // console.log(response)
    if(response.url === "https://restcountries.com/v3.1/name/"  ){
       return 
    }
    if(response.status===404){
        Notiflix.Notify.failure('Oops, there is no country with that name"');
    }
   return response.json()})
   .then((data)=>{
    resolve(data)
})
.catch((error)=>reject(error))
})}

function drawResults(data){
if(data.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}
else{
    for (let i=0; i<data.length; i++){
       const li=document.createElement('li');
        if(data.length<2){
            let img = document.createElement("img")
            img.src = `${data[i].flags.svg}`
            img.alt = `${data[i].flags.alt}`
            img.classList.add("flag-elarge")
            li.appendChild(img)
            ul.appendChild(li);
            li.innerHTML=li.innerHTML + data[i].name.official 
             li.classList.add("li-enlarge")
             
             const li1=document.createElement('li');
             ul.appendChild(li1);   
             li1.innerHTML=` Capital:<span style="font-weight:400">  ${data[i].capital}</span>`
             li1.classList.add("under")
             
             const li2 = document.createElement('li');
             ul.appendChild(li2)
             li2.innerHTML=` Population:<span style="font-weight:400"> ${data[i].population}</span>`
             li2.classList.add("under")
             
             const li3 = document.createElement('li');
             ul.appendChild(li3)
             li3.classList.add("under")
             li3.innerHTML=` Languages: <span style="font-weight:400">${Object.values(data[i].languages)}</span>`
                                }
                                
   else{  
    let img = document.createElement("img")
   img.src = `${data[i].flags.svg}`
   img.alt = `${data[i].flags.alt}`
   img.classList.add("flag")
   li.appendChild(img)
   ul.appendChild(li);
   li.innerHTML=li.innerHTML + data[i].name.official; 
   
} } }}

