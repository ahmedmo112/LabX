
// function init()
// {
// var request = new XMLHttpRequest();
// request.overrideMimeType("application/json");
// request.open("GET", "../assets/storage/labs.json", true);
// request.onreadystatechange =  function() {
//     if (request.readyState === 4 && request.status === 200) {
//         // console.log('response =', request.responseText);
//         var json;
//         json = JSON.parse(request.responseText);
//         setLabDataToStorage(json);
//         getLabs(json);

//     }
// };
// request.send(null);
// }

// window.onload = init();


// function loadProblemsFromJson()
// {
// var request = new XMLHttpRequest();
// request.overrideMimeType("application/json");
// request.open("GET", "../assets/storage/reported_problems.json", true);
// request.onreadystatechange =  function() {
//     if (request.readyState === 4 && request.status === 200) {
//         // console.log('response =', request.responseText);
//         var json;
//         json = JSON.parse(request.responseText);
//         console.log(json);
//         setReportsToStorage(json);
//         // getLabs(json);

//     }
// };
// request.send(null);
// }

// window.onload = loadProblemsFromJson();

function setLabDataToStorage(data) {
    localStorage.setItem('labs-data', JSON.stringify(data));
}

function getLabDataFromStorage() {
    if (localStorage.getItem('labs-data')) {

        return localStorage.getItem('labs-data');
    } else {
        return "[]";
    }
}


function getReportsFromStorage() {
    if (localStorage.getItem('reported-problems-data')) {

        return localStorage.getItem('reported-problems-data');
    } else {
        return "[]";
    }
}

function setReportsToStorage(data) {
    localStorage.setItem('reported-problems-data', JSON.stringify(data));
}

class LabInfo {
    constructor(id, n, pcs, building, floor, cap, chairs, stat) {
        this.lab_id = id;
        this.name = n;
        this.num_pcs = pcs;
        this.building_number = building;
        this.floor_number = floor;
        this.capacity = cap;
        this.num_chairs = chairs;
        this.status = stat;
    }
}

class ReportInfo {
    constructor(report_id, lab_id, lab_name, num_pcs, problem_type, description, reported_date, isRepaired) {
        this.report_id = report_id;
        this.lab_id = lab_id;
        this.lab_name = lab_name;
        this.num_pcs = num_pcs;
        this.problem_type = problem_type;
        this.description = description;
        this.reported_date = reported_date;
        this.isRepaired = isRepaired;
    }
}


var data = JSON.parse(getLabDataFromStorage());
var problemsData = JSON.parse(getReportsFromStorage());

function getPCs() {
    var PCs = 0;
    for (var i = 0; i < data.length; i++) {
        PCs += data[i].num_pcs;
    }
    return PCs;
}



function setAnimatedValue() {
    var totalLabs = data.length;
    document.getElementById('val').innerHTML = +totalLabs;
    var totalPCs = getPCs();
    document.getElementById('pcs-button').value = +totalPCs;
    document.getElementById('laps-button').value = totalLabs;
    var reportedSum = 0;
    for (var i = 0; i < problemsData.length; i++) {
        if (!problemsData[i].status) {
            reportedSum = +reportedSum + +problemsData[i].num_pcs;
        }
    }
    console.log(+reportedSum);
    console.log(+totalPCs);
    var workingPCs = +totalPCs - +reportedSum;
    document.getElementById('working-pcs').value = workingPCs;
    var reportedProbs = problemsData.filter((item) => !item.status).length;
    document.getElementById('probs-button').value = reportedProbs;
}

if (window.location.href.includes('index.html')) {
   
    setAnimatedValue();
}



function getLabs(data) {
    let table = document.getElementById('view-labs-table');
    if (table) {
        table.innerHTML = ``;
        if (data.length != 0) {

            if (table) {
                var keys = ['lab_id', 'name', 'num_pcs', 'status'];
                for (var i = 0; i < data.length; i++) {
                    var row = table.insertRow(i);
                    for (var j = 0; j < keys.length; j++) {
                        row.insertCell(j).innerHTML = data[i][keys[j]];
                    }
                    row.insertCell(keys.length).innerHTML = `<div class="table-actions">
                   <a id="report" href="report_lab_problem.html?id=`+ data[i]['lab_id'] + `">Report</a>
                   <a id="view" href="view_lab.html?id=`+ data[i]['lab_id'] + `">
                       <img src="../assets/icons/eye.svg" height="26px" />
                   </a>
                   <a href="edit_lab.html?id=`+ data[i]['lab_id'] + `" id="edit">
                       <img src="../assets/icons/edit.svg" height="26px" />
                   </a>
                    <img src="../assets/icons/delete.svg" onclick="deleteLab(`+ data[i]['lab_id'] + `) " />
                   </div>`;
                }
                console.log(table);
            }
        } else {
            table.innerHTML = `<h4 class="not-found">No Labs Found</h4>`;
        }
    }
}

function getReportedProblems(data) {
    let table = document.getElementById('view-problems-table');
    if (table) {
        table.innerHTML = ``;

        var keys = ['report_id', 'lab_id', 'lab_name', 'num_pcs', 'problem_type'];
        for (var i = 0; i < data.length; i++) {
            var row = table.insertRow(i);
          
            for (var j = 0; j < keys.length; j++) {
                row.insertCell(j).innerHTML = data[i][keys[j]];
                row.cells[j].setAttribute("onclick", `viewProblemDetail(` + data[i]['report_id'] + `)`);
            }
            if (data[i]['status']) {
                row.insertCell(keys.length).innerHTML = `Repaired`;
                row.insertCell(keys.length + 1).innerHTML = ``;
            } else {
                row.insertCell(keys.length).innerHTML = `In Progress`;
               
                row.insertCell(keys.length + 1).innerHTML = `<button class="doneBtn" onclick="markAsDone(` + data[i]['report_id'] + `)">Mark As Done</button>`;

            }
        }
        console.log(table);
    }
}



if (window.location.href.includes('view_search_labs.html')) {
    getLabs(data);
}


if (window.location.href.includes('view_all_labs_problems.html')) {
    getReportedProblems(problemsData);
}


var getCellValue = function (tr, idx) { return tr.children[idx].innerText || tr.children[idx].textContent; }

var comparer = function (idx, asc) {
    return function (a, b) {
        return function (v1, v2) {
            return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
        }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
    }
};

// do the work...
Array.prototype.slice.call(document.querySelectorAll('th')).forEach(function (th) {
    th.addEventListener('click', function () {
        var table = document.getElementById('view-labs-table');
        if (table) {
            while (table.tagName.toUpperCase() != 'TABLE') table = table.parentNode;
            Array.prototype.slice.call(table.querySelectorAll('tr:nth-child(n+1)'))
                .sort(comparer(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(function (tr) { table.appendChild(tr) });
        }

        table = document.getElementById('view-problems-table');
        if (table) {
            while (table.tagName.toUpperCase() != 'TABLE') table = table.parentNode;
            Array.prototype.slice.call(table.querySelectorAll('tr:nth-child(n+1)'))
                .sort(comparer(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(function (tr) { table.appendChild(tr) });
        }
    })
});

var myForm = document.getElementById('myForm');
if (myForm) {
    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (checkExistID()) {
            addLab();
        }else{
            alert("Lab ID already exists");
        }
    });
}

var editLabForm = document.getElementById('editLabForm');
if (editLabForm) {
    editLabForm.addEventListener('submit', function (event) {
        event.preventDefault();
        editLabInfo();
    });
}


function addLab() {
    var lab_id = document.getElementById('lab-id').value;
    var name = document.getElementById('lab-name').value;
    var num_pcs = document.getElementById('lab-pcs').value;
    var building_number = document.getElementById('building-number').value;
    var floor_number = document.getElementById('floor-number').value;
    var capacity = document.getElementById('capacity').value;
    var num_chairs = document.getElementById('lab-chairs').value;
    var status = document.getElementsByName('status');
    var selectedValue;
    for (var i = 0; i < status.length; i++) {
        if (status[i].checked) {
            selectedValue = status[i].value;
            break;
        }
    }

    var lab = new LabInfo(lab_id, name, num_pcs, building_number, floor_number, capacity, num_chairs, selectedValue);
    data.push(lab);
    setLabDataToStorage(data);
    console.log(lab);
    console.log(data);
    window.location.href = "view_lab.html?id=" + lab_id;
}


function getLabInfo() {
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    var id = searchPrams.get('id');
    var lab = data.find(lab => lab.lab_id == id);
    console.log(lab);
    document.getElementById('lab-id').innerHTML = lab.lab_id;
    document.getElementById('lab-name').innerHTML += lab.name;
    document.getElementById('lab-pcs').innerHTML = lab.num_pcs;
    document.getElementById('building-number').innerHTML = lab.building_number;
    document.getElementById('floor-number').innerHTML = lab.floor_number;
    document.getElementById('lab-capacity').innerHTML = lab.capacity;
    document.getElementById('lab-chairs').innerHTML = lab.num_chairs;
    document.getElementById('lab-status').innerHTML = lab.status;
}

if (window.location.href.includes('view_lab.html')) {
    console.log('view lab');
    getLabInfo();
}


function getLabInfoToEdit(lab_id = null) {
    var id;
    if (lab_id != null) {
        id = lab_id;
    } else {
        var link = window.location.href;
        var url = new URL(link);
        var searchPrams = url.searchParams;
        id = searchPrams.get('id');
        document.getElementById('select').value = id;
    }
    if (id != null) {
        var lab = data.find(lab => lab.lab_id == id);

        // document.getElementById('lab-id').value = lab.lab_id;
        document.getElementById('lab-name').value = lab.name;
        document.getElementById('lab-pcs').value = lab.num_pcs;
        document.getElementById('building-number').value = lab.building_number;
        document.getElementById('floor-number').value = lab.floor_number;
        document.getElementById('capacity').value = lab.capacity;
        document.getElementById('lab-chairs').value = lab.num_chairs;
        var status = document.getElementsByName('status');
        for (var i = 0; i < status.length; i++) {
            if (status[i].value == lab.status) {
                status[i].checked = true;
                break;
            }
        }
    }

}


function openEdit() {
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    var id = searchPrams.get('id');
    window.location.href = "edit_lab.html?id=" + id;
}

if (window.location.href.includes('edit_lab.html')) {
    console.log('edit lab');
    getLabInfoToEdit();
}


function editLabInfo() {
    var lab_id = document.getElementById('select').value;
    var name = document.getElementById('lab-name').value;
    var num_pcs = document.getElementById('lab-pcs').value;
    var building_number = document.getElementById('building-number').value;
    var floor_number = document.getElementById('floor-number').value;
    var capacity = document.getElementById('capacity').value;
    var num_chairs = document.getElementById('lab-chairs').value;
    var status = document.getElementsByName('status');
    var selectedValue;
    for (var i = 0; i < status.length; i++) {
        if (status[i].checked) {
            selectedValue = status[i].value;
            break;
        }
    }

    var lab = new LabInfo(lab_id, name, num_pcs, building_number, floor_number, capacity, num_chairs, selectedValue);
    var index = data.findIndex(lab => lab.lab_id == lab_id);
    data[index] = lab;
    setLabDataToStorage(data);
    console.log(lab);
    console.log(data);
    window.location.href = "view_lab.html?id=" + lab_id;
}

function deleteLab(lab_id = null) {
   
    var id;
    if (lab_id == null) {
        var link = window.location.href;
        var url = new URL(link);
        var searchPrams = url.searchParams;
        id = searchPrams.get('id');
        if (!id) {
            var select = document.getElementById("select"); 
            var idSelected = select.value;
            id = idSelected;
        }
    } else {
        id = lab_id;
        var confirmation = confirm("Are you sure you want to delete this lab?");
        if (!confirmation) {
            return;
        }
    }
    var index = data.findIndex(lab => lab.lab_id == id);
    data.splice(index, 1);
    deleteLabReports(id);
    setLabDataToStorage(data);
    window.location.href = "view_search_labs.html";
}


function deleteLabReports(lab_id){
    var reports = problemsData.filter(e => e.lab_id == lab_id);
    for (var i = 0; i < reports.length; i++) {
        var index = problemsData.findIndex(e => e.report_id == reports[i].report_id);
        problemsData.splice(index,1);
    }
    setReportsToStorage(problemsData);
}



function getLabIdName() {
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    var id = searchPrams.get('id');

    var select = document.getElementById('select');
    for (var i = 0; i < data.length; i++) {
        var option = document.createElement('option');
        option.value = data[i].lab_id;
        option.innerHTML = data[i].lab_id + '  -  ' + data[i].name;
        if (id && id == data[i].lab_id) {
            option.selected = true;
        }
        select.appendChild(option);
    }
}

if (window.location.href.includes('report_lab_problem.html') || window.location.href.includes('edit_lab.html')) {
    console.log("report_lab_problem");
    getLabIdName();
}


function addPC() {
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    var id = searchPrams.get('id');
    var lab = data.find(lab => lab.lab_id == id);
    lab.num_pcs++;
    setLabDataToStorage(data);
    window.location.href = "view_lab.html?id=" + id;
}

function validateSelect() {
    var selectedData = document.getElementById('select');
    var id = selectedData.value;
    console.log(id);
    if (id != "Select the lab ID - Name") {
        return false;
    } else {
        return true;
    }
}

function checkLabPcsNum() {
    var selectedData = document.getElementById('select');
    var id = selectedData.value;
    var lab = data.find(lab => lab.lab_id == id);
    return lab.num_pcs;
}

function validatePCsNum(id) {
    var elem = document.getElementById(id);
    if (validateSelect()) {
        alert("Please select a lab first.");
        return false;
    } else if (elem.value == "" || elem.value == null) {
        elem.setCustomValidity("Please fill in the " + id + ".");
        elem.style.outlineColor = "red";
        return false;
    } else if (elem.value < 1) {
        elem.setCustomValidity("Input must be greater than 0.");
        elem.style.outlineColor = "red";
        return false;
    } else if (parseInt(elem.value) > checkLabPcsNum()) {
        elem.setCustomValidity("Input must be less than " + checkLabPcsNum() + ".");
        elem.style.outlineColor = "red";
        return false;
    } else {
        elem.setCustomValidity("");
        elem.style.outlineColor = "#5358E3";
    }
    return true;
}

function validateAddPC(id) {
    var elem = document.getElementById(id);
    if (elem.value == "" || elem.value == null) {
        elem.setCustomValidity("Please fill in the " + id + ".");
        elem.style.outlineColor = "red";
        return false;
    } else if (elem.value < 1) {
        elem.setCustomValidity("Input must be greater than 0.");
        elem.style.outlineColor = "red";
        return false;
    }else {
        elem.setCustomValidity("");
        elem.style.outlineColor = "#5358E3";
    }
    return true;
}

function check_addPc() {
    if (validateAddPC("pc_id")) {
        addPC();
    }
}

var addPcForm = document.getElementById('addPc');
if (addPcForm) {
    console.log("addPcForm");
    addPcForm.addEventListener('submit', function (event) {
        event.preventDefault();
        check_addPc();
    });

}



var selectedData = document.getElementById('select');
if (selectedData) {
    selectedData.addEventListener('change', function (event) {
        var id = selectedData.value;
        if (window.location.href.includes('edit_lab.html')) {
            getLabInfoToEdit(id);
        }
    }
    );
}

function markAsDone(id) {
    var problem = problemsData.find(problem => problem.report_id == id);
    problem.status = true;
    setReportsToStorage(problemsData);
    window.location.href = "view_all_labs_problems.html";
}


function searchLabs(searchData = null) {

    var search;
    if (searchData) {
        document.getElementById('search-bar').value = searchData;
        search = searchData;
    } else {
        search = document.getElementById('search-bar').value;
    }
    if (search) {
        var filteredDataByName = data.filter(lab => lab.name.toLowerCase().includes(search.toLowerCase()));
        var filteredDataByID = data.filter(lab => lab.lab_id.toString().toLowerCase().includes(search.toLowerCase()));
        var filteredData = filteredDataByName.concat(filteredDataByID);
        getLabs(filteredData);
    } else {
        getLabs(data);
    }
}

function searchProblems() {

    var search = document.getElementById('search-bar').value;
    if (search) {
        var filteredDataByName = problemsData.filter(problem => problem.lab_name.toLowerCase().includes(search.toLowerCase()));
        var filteredDataByID = problemsData.filter(problem => problem.lab_id.toString().toLowerCase().includes(search.toLowerCase()));
        var filteredData = filteredDataByName.concat(filteredDataByID);
        getReportedProblems(filteredData);
    } else {
        getReportedProblems(problemsData);
    }
}

var searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('keyup', function (event) {
        if (searchBar.value) {
            event.preventDefault();
            document.getElementById('search_close_icon').style.display = "inline-block";
            searchLabs();
            searchProblems();
        } else {
            document.getElementById('search_close_icon').style.display = "none";
            searchLabs();
            searchProblems();
        }
    });
}


function resetSearch() {
    document.getElementById('search-bar').value = "";
    document.getElementById('search_close_icon').style.display = "none";
    searchLabs();
}



function searchFromHome() {
    window.location.href = "view_search_labs.html?search=" + document.getElementById('search-bar').value;
    // searchLabs();
}

if (window.location.href.includes('view_search_labs.html?search')) {
    window.onload = function () {
        var link = window.location.href;
        var url = new URL(link);
        var searchPrams = url.searchParams;
        var searchPram = searchPrams.get('search');
        searchLabs(searchPram);
    }
}


function reportProblem() {
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    var id = searchPrams.get('id');
    window.location.href = "report_lab_problem.html?id=" + id;
}

function addToProblemData() {
    var report_id = problemsData.length + 1;
    var lab_id = document.getElementById('select').value;
    var lab = data.find(lab => lab.lab_id.toString() == lab_id.toString());
    var lab_name = lab.name;
    var lab_pcs = document.getElementById('lab-pcs').value;
    var description = document.getElementById('descp').value;
    var date_time = document.getElementById('date_time').value;
    var status = document.getElementsByName('status');
    var statusValue;
    for (var i = 0, length = status.length; i < length; i++) {
        if (status[i].checked) {
            statusValue = status[i].value;
            break;
        }
    }
    var problemObj = new ReportInfo(report_id, lab_id, lab_name, lab_pcs, statusValue, description, date_time, false);
    problemsData.push(problemObj);
    setReportsToStorage(problemsData);
    window.location.href = "view_all_labs_problems.html";
}

var reportForm = document.getElementById('report');
if (reportForm) {
    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validatePCsNum("lab-pcs")) {
            addToProblemData();
        }
    });
}

function checkExistID() {
    var id = document.getElementById('lab-id').value;
    var lab = data.find(lab => lab.lab_id.toString() == id.toString());
    if (lab) {
        return false;
    }
    return true;
}



