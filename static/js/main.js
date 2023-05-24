function getCSRFToken() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
        return decodeURIComponent(cookie.substring(10));
        }
    }
    return null;
}

function addCSRFToken(xhr) {
    var csrftoken = getCSRFToken();
    if (csrftoken) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
}



//! add lab

var myForm = document.getElementById('myForm');
if (myForm) {
    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addLab();
       
    });
}

function addLab() {
    // var lab_id = document.getElementById('lab-id').value;
    var name = document.getElementById('lab-name').value;
    var num_pcs = document.getElementById('lab-pcs').value;
    var building_number = document.getElementById('building-number').value;
    var floor_number = document.getElementById('floor-number').value;
    var capacity = document.getElementById('capacity').value;
    var num_chairs = document.getElementById('lab-chairs').value;
    var status = document.querySelector('input[name="status"]:checked').value;

    var formData = new FormData();
    // formData.append('lab_id', lab_id);
    formData.append('name', name);
    formData.append('num_pcs', num_pcs);
    formData.append('building_number', building_number);
    formData.append('floor_number', floor_number);
    formData.append('capacity', capacity);
    formData.append('num_chairs', num_chairs);
    formData.append('status', status);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add-lab/');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.redirect) {
                window.location.href = response.redirect;
            } else {
                // Handle error case
            }
        } else {
            // Handle error case
        }
    };
    xhr.send(formData);
    return false;
}

//******************************************************************************************************/



//! edit lab
var editLabForm = document.getElementById('editLabForm');
if (editLabForm) {
    editLabForm.addEventListener('submit', function (event) {
        event.preventDefault();
        editLabInfo();
    });
}

function getLabInfoToEdit(id=null) {
    // var labId = getSelectedLabId();
    if (id != null) {
        fetchLabData(id);
    }else{
        var url = window.location.pathname; // Get the current URL
        var parts = url.split('/'); // Split the URL by '/'
        var id_i = parts[parts.length - 2]; // Access the second-to-last part
        fetchLabData(id_i);
    }
}


function populateFormFields(labData) {
    document.getElementById('lab-name').value = labData.name;
    document.getElementById('lab-pcs').value = labData.num_pcs;
    document.getElementById('building-number').value = labData.building_number;
    document.getElementById('floor-number').value = labData.floor_number;
    document.getElementById('capacity').value = labData.capacity;
    document.getElementById('lab-chairs').value = labData.num_chairs;
    var status = document.getElementsByName('status');
    for (var i = 0; i < status.length; i++) {
        if (status[i].value == labData.status) {
        status[i].checked = true;
        break;
        }
    }
}

function fetchLabData(labId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get-lab-data/' + labId + '/');
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var labData = JSON.parse(xhr.responseText);
            populateFormFields(labData);
        } else {
        console.error('Failed to fetch lab data');
        }
    }
    };
    xhr.send();
}

if (window.location.href.includes('edit-lab')) {
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
    var status = document.querySelector('input[name="status"]:checked').value;

    var formData = new FormData();
    formData.append('lab_id', lab_id);
    formData.append('name', name);
    formData.append('num_pcs', num_pcs);
    formData.append('building_number', building_number);
    formData.append('floor_number', floor_number);
    formData.append('capacity', capacity);
    formData.append('num_chairs', num_chairs);
    formData.append('status', status);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/edit/', false);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.redirect) {
                window.location.href = response.redirect;
            } else {
                // Handle error case
            }
        } else {
            // Handle error case
        }
    }
    xhr.send(formData);
    return false;
}


function deleteLab_fromEdit(lab_id = null) {
    var id = null;
    var selectedData = document.getElementById('select');
    if (selectedData) { 
        id = selectedData.value;
    }

    if (id == null) {
        var url = window.location.pathname; // Get the current URL
        var parts = url.split('/'); // Split the URL by '/'
        id = parts[parts.length - 2];
    }

    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/delete-lab/" + id + "/";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    addCSRFToken(ajax);
    
    ajax.send();
    ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var response = JSON.parse(ajax.responseText);
        if (response.redirect) {
            console.log(response.redirect);
            window.location.href = response.redirect;
            }
        }
    }
}

function deleteLab(lab_id = null) {
    // delete lab using ajax
    var confirmation = confirm("Are you sure you want to delete this lab?");
    if (!confirmation) {
        return;
    }
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/delete-lab/" + lab_id+"/";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    addCSRFToken(ajax);
    console.log("test");
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var table = document.getElementById('view-labs-table');
            var rows = table.querySelectorAll('tbody tr');
            console.log(rows);
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].children[0].innerHTML === lab_id.toString()) {
                rows[i].remove();
                }
            }
        }
    }
}

var selectedData = document.getElementById('select');
if (selectedData) {
    selectedData.addEventListener('change', function (event) {
        var id = selectedData.value;
        if (window.location.href.includes('edit-lab')) {
            getLabInfoToEdit(id);
        }
    }
    );
}


//***************************************************************/

//! used in edit and report
function getLabIdName() {
    console.log("test3");

    var url = window.location.pathname; // Get the current URL
    var parts = url.split('/'); // Split the URL by '/'
    var id = parts[parts.length - 2]; // Access the second-to-last part

    var xml = new XMLHttpRequest();
    xml.open("GET", "/labs/", true);
    xml.send();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            var data = JSON.parse(xml.responseText)["labs"];
            console.log(data);
            
            var select = document.getElementById('select');
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].id;
                option.innerHTML = data[i].id + '  -  ' + data[i].name;
                if (id && id == data[i].id) {
                    option.selected = true;
                }
                select.appendChild(option);
            }
        }
    }

}

if (window.location.href.includes('report-problem') || window.location.href.includes('edit-lab')) {
    console.log("report_lab_problem");
    getLabIdName();
}

//***************************************************************/

//! used view lab

function addPC() {
    var id = document.getElementById('lab-id').innerHTML;
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add-pc/'+id+'/')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers
    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            
            if (response.redirect) {
                
                window.location.href = response.redirect;
            } 
        } 
    };
}

//! valiadte add pc
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

//***************************************************************/

//! repair in reports table
function markAsDone(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/repair/'+id+'/')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers
    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            
            if (response.redirect) {
                
                window.location.href = response.redirect;
            } 
        } 
    };
}

//***************************************************************/

//! report problem

function reportProblem() {
    
    var id = document.getElementById('lab-id').innerHTML;
    window.location.href = "/report-problem/" + id+"/";
}

function addToProblemData() {
    
    var lab_id = document.getElementById('select').value;
    var lab_pcs = document.getElementById('lab-pcs').value;
    var description = document.getElementById('descp').value;
    var date_time = document.getElementById('date_time').value;
    var status =  document.querySelector('input[name="status"]:checked').value;
    
    var formData = new FormData();
    formData.append('lab_id', lab_id);
    formData.append('lab_pcs', lab_pcs);
    formData.append('description', description);
    formData.append('date_time', date_time);
    formData.append('status', status);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/report/');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.redirect) {
                
                window.location.href = response.redirect;
            } 
        }
    };
    xhr.send(formData);
    return false;
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

//****************************************************************/
