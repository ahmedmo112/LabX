function searchLabs(searchData = null) {
    var search;
    if (searchData) {
        document.getElementById('search-bar').value = searchData;
        search = searchData;
    } else {
        search = document.getElementById('search-bar').value;
    }
    console.log(search);
    if (search) {
        window.location.href = "/view-labs/"+search+"/";
    } else {
        window.location.href = "/view-labs/";
    }
}

function searchProblems() {
    
    var search = document.getElementById('search-bar').value;
    if (search) {
        window.location.href = "/view-problems/"+search+"/";
    } else {
        window.location.href = "/view-problems/";
    }
}

var searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('keyup', function (event) {
        if (searchBar.value) {
            event.preventDefault();
            document.getElementById('search_close_icon').style.display = "inline-block";
            // searchLabs();
            // searchProblems();
        } else {
            document.getElementById('search_close_icon').style.display = "none";
            // searchLabs();
            // searchProblems();
        }
    });
}


function resetSearch() {
    document.getElementById('search-bar').value = "";
    document.getElementById('search_close_icon').style.display = "none";
    searchLabs();
}



function searchFromHome() {
    var search = document.getElementById('search-bar').value;
    window.location.href = "/view-labs/"+search+"/";
    
}
