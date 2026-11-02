button = document.getElementById("askButton");
input = document.getElementById("inputASK");
errorMsg = document.getElementById("errorMsg");
successMsg = document.getElementById("successMsg");

button.addEventListener("click", checkError());

function checkError(){
    if(input.value == ""){
        errorMsg.style.display = "block";
        successMsg.style.display = "hidden";
    }
    else{
        errorMsg.style.display = "hidden";
        successMsg.style.display = "block";
    }
}

