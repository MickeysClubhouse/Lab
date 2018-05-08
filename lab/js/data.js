window.onload=function () {
const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
for(var i=0;i<=3;i++){
let mainDiv=document.getElementsByClassName("flex-container justify")[0];
let division1=document.createElement("div");//四个分块
//内部分块
let inner1=document.createElement("div");
let inner2=document.createElement("div");
//添加class
division1.classList.add("item");
inner1.classList.add("inner-box");
inner2.classList.add("inner-box");
let innerTitle1=document.createElement("h3");
let innerTitle2=document.createElement("h3");
innerTitle1.innerText="Cities";
innerTitle2.innerText="Popular Photos";
inner1.appendChild(innerTitle1);
inner2.appendChild(innerTitle2);
//标题部分
let title1=document.createElement("h2");
let title2=document.createElement("h3");
//添加文字
let node1=document.createTextNode(countries[i].name);
title1.appendChild(node1);
let node2=document.createTextNode(countries[i].continent);
title2.appendChild(node2);
//添加ul
    let ul1=document.createElement("ul");
    inner1.appendChild(ul1);
    let pics=document.createElement("div");
    inner2.appendChild(pics);
    for(var j=0;j<countries[i].cities.length;j++){
        let list=document.createElement("li");
        list.innerText=countries[i].cities[j];
        ul1.appendChild(list);
    }
    var html='';
    for(var k=0;k<countries[i].photos.length;k++){
        html+='<img src="images/'+countries[i].photos[k]+'" class="photo"/>';
    }
    pics.innerHTML=html;


let bt=document.createElement("button");
bt.innerHTML="Visit";
division1.appendChild(title1);
division1.appendChild(title2);

division1.appendChild(inner1);
division1.appendChild(inner2);
division1.appendChild(bt);
mainDiv.appendChild(division1);
}
};