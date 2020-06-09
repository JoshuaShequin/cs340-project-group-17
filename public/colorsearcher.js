function searchReqListener(){
	var colorinput = document.getElementById("searchbox").value.trim().replace(/[^a-zA-Z0-9] /g, "");
	window.location.replace("/color/" + colorinput);
}

window.addEventListener('DOMContentLoaded', function () {

    var searchButton = document.getElementById('searchsubmit');
    searchButton.addEventListener('click', searchReqListener);
    
});

