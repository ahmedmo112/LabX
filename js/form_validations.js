
function validate(id){
    var elem = document.getElementById(id);
    if(elem.value == "" || elem.value == null){
        elem.setCustomValidity("Please fill in the " + id + ".");
        elem.style.outlineColor = "red";
        return false;
    } else if (elem.value < 1){
        elem.setCustomValidity("Input must be greater than 0.");
        elem.style.outlineColor = "red";
        return false;
    } else {
        elem.setCustomValidity("");
        elem.style.outlineColor = "#5358E3";
    }
    return true;
}


function validateLabName(){
    var labName = document.getElementById("lab-name");
    var RE = /^[a-zA-Z 0-9]+$/;
    if(labName.value == "" || labName.value == null){
        labName.setCustomValidity("Please fill in the lab name.");
        labName.style.outlineColor = "red";
    }
    else if(!RE.test(labName.value)){
        labName.setCustomValidity("Please enter a valid lab name.");
        labName.style.outlineColor = "red";
    } else if(labName.value.length > 20){
        labName.setCustomValidity("Lab name cannot exceed 20 characters.");
        labName.style.outlineColor = "red";
    } else {
        labName.setCustomValidity("");
        labName.style.outlineColor = "#5358E3";
    }
}



function CheckValidation(){
    validate("lab-id");
    validateLabName();
    validate("building-number");
    validate("floor-number");
    validate("lab-pcs");
    validate("capacity");
    validate("lab-chairs");
}





// function validateSelect(id){
//     var elem = document.getElementById(id);
//     console.log(elem.value);
//     if(elem.value === "" ){
//         alert("Please Select Lab.");
//         // elem.setCustomValidity("Please Select Lab.");
//         // elem.style.outlineColor = "red";
//     } else {
//         // elem.setCustomValidity("");
//         // elem.style.outlineColor = "black";
//     }
// }


// function CheckReportValidation(){
//     validateSelect("select");
//     validate("lab-pcs");
// }

function validateDate(){
    var datetimeInput = document.getElementById('date_time');
        datetimeInput.addEventListener('input', function () {
            var selectedDate = new Date(datetimeInput.value);
            if (selectedDate.getTime() > now.getTime()) {
                datetimeInput.setCustomValidity("Please select a date and time that is not in the future.");
            } else {
                datetimeInput.setCustomValidity("");
            }
        });
}

