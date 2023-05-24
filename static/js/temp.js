function SetLab(value) {

    localStorage.setItem("Data", value);
}
function Getvalue() {
    let value = localStorage.getItem("Data");
    if (value)
    {
        return value; 
    }
    console.log(value);
    return "[]";
}
var Data = JSON.parse(Getvalue());
function AddLab() {
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
    var Lab = new LabInfo(lab_id, name, num_pcs, building_number, floor_number, capacity, num_chairs, selectedValue);
    Lab = JSON.stringify(Lab);
    Data.push(Lab);
    SetLab(Data);
    window.location.href = "view_lab.html";

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
var myForm = document.getElementById('myForm');
if (myForm) {
    myForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
        AddLab();
    });
}
