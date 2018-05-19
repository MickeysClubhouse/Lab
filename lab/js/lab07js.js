let selectFunction=document.getElementById("selectFunction");
let createTable=document.getElementById("createTable");
let colNum=document.getElementById("colNum");
let commit=document.getElementById("commit");
let selectTable=document.getElementById("selectTable");
let name=document.getElementById("name");
let table=document.getElementById("table");
let addRow=document.getElementById("addRow");
let deleteRow=document.getElementById("deleteRow");
let warning=document.getElementById("warning")

let tables=[];//table1,table2,...

function Table() {
    this.tableName="";
    this.col=0;
    this.row=0;//包含th
    this.content=[];//tr[] tr[] tr[]...
}

commit.onclick=function (ev) {
    if(selectFunction.value==="CREATE TABLE"){
        selectTable.classList.remove("off");
        addOptions();//第二个下拉框
        initializeTable();//新表对象创建
    }
    else if(selectFunction.value==="ADD ROW"){
        addAttributes();
    }
    else if(selectFunction.value==="DELETE ROW"){
        doDelete();
    }
    else if(selectFunction.value==="DELETE TABLE"){
        tableDelete();
    }
};

function changeIt(o) {
    switch (o.value){
        case "SELECT ONE":warning.style.display="none";createTable.classList.remove("off");break;
        case "CREATE TABLE":warning.style.display="none";fresh1();break;
        case "ADD ROW":warning.style.display="none";showInputs();break;
        case "DELETE ROW":warning.style.display="none";showInputs();break;
        case "DELETE TABLE":showWarning();break;
    }
}


colNum.onchange=function () {
    showAttrs();
};


function showAttrs() {
    let numOfCol=document.getElementById("colNum").value;
    let colExist=document.getElementsByClassName("isAttr");
    let colExistLength=colExist.length;

    if(numOfCol!==0){
        commit.classList.remove("off")
    }
    else {
        commit.style.display("none");
    }
    if(numOfCol>colExistLength){
        for(var i=0;i<numOfCol-colExistLength;i++){
            let inputAttr=document.createElement("input");
            inputAttr.placeholder="Attributes";
            inputAttr.classList.add("isAttr");
            createTable.appendChild(inputAttr);
        }
    }

    if(numOfCol<colExistLength){
        for(i=0;i<colExistLength-numOfCol;i++){
            createTable.removeChild(colExist[0]);
        }
    }
}

function addOptions() {
    let option=document.createElement("option");
    let text=document.createTextNode(name.value);
    option.appendChild(text);
    selectTable.appendChild(option);
    //移动光标
    let opts=selectTable.children;
    for(var i=0;i<opts.length;i++){
        if(opts[i].value===name.value){
            opts[i].selected=true;
        }
    }

}

function initializeTable() {
    let numOfCol=document.getElementById("colNum").value;
    //创建对象
    var oTable=new Table();
    oTable.tableName=name.value;
    oTable.row=1;
    oTable.col=numOfCol;
    var aRow=[];
    for(var i=0;i<numOfCol;i++){
        //第一行，attr名字
        aRow[i]=document.getElementsByClassName("isAttr")[i].value;
    }
    oTable.content[0]=aRow;
    draw(oTable);
    //加入数组中
    let count=tables.push(oTable);
}

function draw(o){
    table.classList.remove("off");
    //清空
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }
    //添加节点
    for(var i=0;i<o.row;i++){
        let tr=document.createElement("tr");
        if(i%2===0){tr.classList.add("notEven")}
        table.appendChild(tr);
        for(var j=0;j<o.col;j++){
            if(i===0){
                let td=document.createElement("th");td.innerHTML=o.content[i][j]; tr.appendChild(td);}
                else{
                let td=document.createElement("td");td.innerHTML=o.content[i][j];tr.appendChild(td);
            }
        }
    }
}

function showInputs() {
    fresh2();
    while(addRow.hasChildNodes()){
        addRow.removeChild(addRow.firstChild);
    }
    //根据所选择的table添加options
    let tableSelected=document.getElementById("selectTable").value;
    let currentTable;
    for(var i=0;i<tables.length;i++){
        if(tables[i].tableName===tableSelected){
            currentTable=tables[i];
        }
    }
    for(var j=0;j<currentTable.content[0].length;j++){
        let attrProp=document.createElement("input");
        attrProp.placeholder=currentTable.content[0][j];
        attrProp.classList.add("isProp");
        addRow.appendChild(attrProp);
    }
}

function fresh1() {
    //隐藏add，delete显示create
    createTable.style.display="block";
    addRow.style.display="none";
    deleteRow.style.display="none";
}

function fresh2() {
    //隐藏create，delete显示create
    createTable.style.display="none";
    addRow.style.display="block";
    deleteRow.style.display="none";
}

function fresh3() {
    createTable.style.display="none";
    addRow.style.display="none";
    deleteRow.style.display="block";
}

function addAttributes(){
    let tableSelected=document.getElementById("selectTable").value;
    let currentTable;
    //确定当前table
    for(var i=0;i<tables.length;i++){
        if(tables[i].tableName===tableSelected){
            currentTable=tables[i];
        }
    }
    //添加attribute
    var aRow=[];
    for(var j=0;j<currentTable.col;j++){
        aRow[j]=document.getElementsByClassName("isProp")[j].value;
    }
    currentTable.content.push(aRow);
    currentTable.row++;
    draw(currentTable);
}


function doDelete(){
    // 获取用户输入
    let ruler=document.getElementsByClassName("isProp");
    let tableSelected=document.getElementById("selectTable").value;
    //确定当前table
    let currentTable;
    for(var i=0;i<tables.length;i++){
        if(tables[i].tableName===tableSelected){
            currentTable=tables[i];
        }
    }
    let toDelete=[];
    for(var j=1;j<currentTable.content.length;j++){//遍历每一行j
        let match=true;
        for(var k=0;k<currentTable.content[j].length;k++){//遍历每一列k
            //alert(j+" "+k+" "+currentTable.content[j][k]+" "+ruler[k].value+" "+match);
                if(currentTable.content[j][k]!==ruler[k].value){
                    match=false;
                    break;
                }
        }
        if(match){toDelete.push(j);}
}
//删除选中的行
    for(var m=0;m<toDelete.length;m++){
        var a=toDelete[m];
        currentTable.content.splice(a,1);
    }
draw(currentTable);
}


function tableDelete(){
    let tableSelected=document.getElementById("selectTable").value;
    //确定当前table
    let currentTable;
    for(var i=0;i<tables.length;i++){
        if(tables[i].tableName===tableSelected){
            currentTable=tables[i];
            tables.splice(i,1);
            let opts=selectTable.children;
            for(var j=0;j<opts.length;j++){
                if(opts[j].value===currentTable.tableName){
                    selectTable.removeChild(opts[j]);
                    if(tables.length!==0){opts[1].selected=true;}
                    else{opts[0].selected=true;}
                }
            }
        }
    }
    if(tables.length!==0){draw(tables[0]);}
    else{alert("empty!");
        table.classList.remove("off");
        //清空
        while(table.hasChildNodes()){
            table.removeChild(table.firstChild);
        }
    }

}

function tp() {
    let tableSelected=document.getElementById("selectTable").value;
    //确定当前table
    let currentTable;
    for(var i=0;i<tables.length;i++){
        if(tables[i].tableName===tableSelected){
            currentTable=tables[i];
        }
    }
    draw(currentTable);
}

function showWarning(){
    warning.style.display="block";
}
