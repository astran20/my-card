button = document.getElementById("askButton");
input = document.getElementById("inputASK");
errorMsg = document.getElementById("errorMsg");
successMsg = document.getElementById("successMsg");

errorMsg.style.display = "none";
successMsg.style.display = "none"
button.addEventListener("click", checkError);

function checkError(){
    if(input.value == ""){
        errorMsg.style.display = "block";
        successMsg.style.display = "none";
    }
    else{
        errorMsg.style.display = "none";
        successMsg.style.display = "block";
    }
}

