
function openPop(id =null){
    if (id) {
        var select = document.getElementById("select"); 
        var id = select.value;
        if (id != "Select the lab ID - Name") {
            document.getElementById("show").style.display = "block";
        } else {
            alert("Please select the lab.");
        }
    }else{
        document.getElementById("show").style.display = "block";
    }

    
}

function closePop(){
    if(document.getElementById("addPc")){
        document.getElementById("addPc").reset()
    }
    document.getElementById("show").style.display = "none";
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup_cancel").style.display = "none";
    document.getElementById("popup_confirm").style.display = "none";
}

function goCancel_popup(){
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup_cancel").style.display = "block";
}

function goConfirm_popup(){
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup_confirm").style.display = "block";
}

function closeProblemDetailPopup(){
    var modal = document.getElementById("view-problem-popup");
    modal.style.display = "none";
}

function formatAMPM(date) {
    var dateStr =
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  ("00" + date.getDate()).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + ((date.getHours()%12)?(date.getHours()%12):12) ).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + " " + (date.getHours() >= 12 ? 'pm' : 'am');
return dateStr;
  }

function viewProblemDetail(id){
    var modal = document.getElementById("view-problem-popup");
    var problem = problemsData.find(problem => problem.report_id == id);
    document.getElementById('lab-reprted').innerHTML = `Report #`+problem.report_id;
    document.getElementById('lab-id').innerHTML = problem.lab_id;
    document.getElementById('lab-name').innerHTML = problem.lab_name;
    document.getElementById('problem-type').innerHTML = problem.problem_type;
    document.getElementById('problem-description').innerHTML = problem.description;
    document.getElementById('problem-status').innerHTML = problem.status?'Repaired':'In Progress';
    var date = new Date(problem.reported_date);
    document.getElementById('reoprt-date').innerHTML =formatAMPM(date);
    // document.getElementById('reoprt-date').innerHTML = problem.reported_date;
    document.getElementById('lab-pcs').innerHTML = problem.num_pcs;
    modal.style.display = "block";  
}