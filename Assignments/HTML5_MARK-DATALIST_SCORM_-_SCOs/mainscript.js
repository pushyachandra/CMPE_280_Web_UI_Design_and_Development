function login(){
    if(document.getElementById("usr").value!="" && document.getElementById("pwd").value!=""){
        window.location.href="disclaimer.html";
    }
    else{
        alert("Username and/or Password not filled");
    }
}

function create_acc(){
    if(document.getElementById("cr_name").value!="" &&
    document.getElementById("cr_email").value!="" &&
    document.getElementById("cr_usrnm").value!="" &&
    document.getElementById("cr_pwd").value!="" &&
    document.getElementById("cr_rpwd").value!=""){
        window.location.href="home.html"
    }
    else{
        alert("Can not Create Account \nSome items are not filled in the Create Account section");
    }
}

function forgot_pass(){
    if(document.getElementById("fr_name").value!="" &&
    document.getElementById("fr_email").value!="" &&
    document.getElementById("fr_usrnm").value!="" &&
    document.getElementById("fr_pwd").value!="" &&
    document.getElementById("fr_rpwd").value!=""){
        window.location.href="home.html";
    }
    else{
        alert("Can not Reset Password \nSome items are not filled in the Reset Password section");
    }
}

function submit(question_num,next){
    var retuned_opt=[]
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    for(var i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].checked){
            retuned_opt.push(radioButtons[i].id);
        }
    }
    sessionStorage.setItem(question_num,retuned_opt);
    window.location.href=next;
}

function reset(){
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    for(var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

function getscore(){
    window.location.href="summary.html"
}

function calculateScore(){
    const qus1 = sessionStorage.getItem('qus1');
    const qus2 = sessionStorage.getItem('qus2');
    const qus3 = sessionStorage.getItem('qus3');
    const qus4 = sessionStorage.getItem('qus4');

    var quantAns=0;
    var quantCorr=0;
    var readAns=0;
    var readCorr=0;
    var avAns=0;
    var avCorr=0;

    if(qus1=="1"){
        quantAns++;
        quantCorr++;
    }
    else if(qus1==""){
        quantAns++;
    }
    if(qus2=="2"){
        quantAns++;
        quantCorr++;
    }
    else if(qus2==""){
        quantAns++;
    }
    if(qus3.split(",")[0]=="3a" && qus3.split(",")[1]=="3b"){
        readAns++;
        readCorr++;
    }
    else if(qus3==""){
        readAns++;
    }
    if(qus4=="4"){
        avAns++;
        avCorr++;
    }
    else if(qus4==""){
        avAns++;
    }
    
    document.getElementById('quantAns').textContent = quantAns;
    document.getElementById('quantCorr').textContent = quantCorr;
    var cal=((quantCorr/quantAns)*100);
    if(quantAns==0){
        cal=0
    }
    document.getElementById('quantScore').textContent = cal+"%";

    document.getElementById('readAns').textContent = readAns;
    document.getElementById('readCorr').textContent = readCorr;
    var cal=((readCorr/readAns)*100);
    if(readAns==0){
        cal=0
    }
    document.getElementById('readScore').textContent = cal+"%";

    document.getElementById('avAns').textContent = avAns;
    document.getElementById('avCorr').textContent = avCorr;
    var cal=((avCorr/avAns)*100);
    if(avAns==0){
        cal=0
    }
    document.getElementById('avScore').textContent = cal+"%";
}