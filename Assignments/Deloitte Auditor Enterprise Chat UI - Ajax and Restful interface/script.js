var input="";
var output="";

async function send()
{
    let message = $('#message-send').val();
    input = message;
    let messages = [{ role: "system", content: "You are Auditor, you should answer Tax & Audit related questions only " }];
    messages.push({ role: "user", content: message });
    var response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer "+TOKEN,
            },
            method: "POST",
            body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 512
            })
        }
    );
    const data = await response.json();
    document.getElementById("response-box").innerText = data.choices[0].message.content; 
    output = data.choices[0].message.content;
}

function cancel(){
    document.getElementById("message-send").value = "";
    document.getElementById("response-box").value = "";
}

function downloadTextFile() {
    if(input!="" && output!=""){
        var t_p="Tax Prompt : "+input;
        var r="Response : "+output;
        var text = t_p+"\n\n"+r;
        var blob = new Blob([text], { type: "text/plain" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "good_job2.txt";
        a.click();
        URL.revokeObjectURL(a.href);
    }
    else if(input==""){
        alert("Please enter the Tax Prompt");
    }
    else if(input!="" && output==""){
        alert("Please click Send / Please wait for the response to load")
    }
}