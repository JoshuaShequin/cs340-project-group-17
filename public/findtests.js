function send_search_data() {
    var oReq = new XMLHttpRequest();

    oReq.open("POST", "/findtests");
    /*
    test_ID, summary, number_of_questions, name, user_name
    */

   
    var test_ID = document.getElementById('test-id-search-input-box').value;
    test_ID = test_ID.replace(/[^a-zA-Z0-9] /g,);
    test_ID.replace(/\s+/g, " ").trim();
    var summary = document.getElementById('test-summary-search-input-box').value;
    summary = summary.replace(/[^a-zA-Z0-9] /g,);
    summary.replace(/\s+/g, " ").trim();
    var number_of_questions = document.getElementById('test-number-of-questions-search-input-box').value;
    number_of_questions = number_of_questions.replace(/[^a-zA-Z0-9] /g,);
    number_of_questions.replace(/\s+/g, " ").trim();
    var name = document.getElementById('test-name-search-input-box').value;
    name = name.replace(/[^a-zA-Z0-9] /g,);
    name.replace(/\s+/g, " ").trim();
    var user_name = document.getElementById('test-username-search-input-box').value;
    user_name = user_name.replace(/[^a-zA-Z0-9] /g,);
    user_name.replace(/\s+/g, " ").trim();

    //console.log("==search querys", test_ID, summary, number_of_questions, name, user_name);

    search_query = {
        test_ID: test_ID,
        summary: summary,
        number_of_questions: number_of_questions,
        name: name,
        user_name: user_name
    };
    //console.log("==CLIENT search query", search_query);



    var requestBody = JSON.stringify(search_query);
    oReq.setRequestHeader('Content-Type', 'application/json');
    //console.log("==request body", requestBody);
    oReq.send(requestBody);

    oReq.addEventListener('load', function (event) {
        var response_data = JSON.parse(event.target.response);
        //console.log("==CLIENT: server response:", response_data, response_data.length);
        
        // remove past
        var table = document.getElementById("find-test-table");

        while (table.rows.length > 1) {
          table.deleteRow(1);
        }
        
        if (event.target.status === 200) {
            for (x = 0; x < response_data.length; x++) { 
                var search_query_HTML = Handlebars.templates.findTestColumn(response_data[x]);
                var test_table_container = document.getElementById("find-test-table");
                test_table_container.insertAdjacentHTML('beforeend', search_query_HTML);
            } 
        } else {
            var message = event.target.response;
            alert("Error on server: " + message);
        }
    });
  
};

// function get_recent_made_tests() {
//     var oReq = new XMLHttpRequest();

//     oReq.open("POST", "/findrecentmadetests");

//     oReq.send();
// };

// function get_recent_taken_tests() {
//     var oReq = new XMLHttpRequest();

//     oReq.open("POST", "/findrecenttakentests");

//     oReq.send();
// };

window.addEventListener('DOMContentLoaded', function() {
    // create an event listener for the search buttons
    var findTestButton = document.getElementById('find-tests-button');
    if (findTestButton) {
        findTestButton.addEventListener('click', send_search_data);
    }
    var findRecentTakenTestButton = document.getElementById('find-recent-tests-taken-button');
    if (findRecentTakenTestButton) {
        findRecentTakenTestButton.addEventListener('click', get_recent_taken_tests);
    }
    var findRecentMadeTestButton = document.getElementById('find-recent-tests-made-button');
    if (findRecentMadeTestButton) {
        findRecentMadeTestButton.addEventListener('click', get_recent_made_tests);
    }
    var input = document.getElementById("test-id-search-input-box");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("find-tests-button").click();
		}
	});
    var input = document.getElementById("test-summary-search-input-box");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("find-tests-button").click();
		}
	});
    var input = document.getElementById("test-number-of-questions-search-input-box");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("find-tests-button").click();
		}
	});
    var input = document.getElementById("test-name-search-input-box");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("find-tests-button").click();
		}
	});
    var input = document.getElementById("test-username-search-input-box");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("find-tests-button").click();
		}
	});
});

function clearSearch() {

    document.getElementsById('find-tests-button').value = "";
    document.getElementsById('find-recent-tests-made-button').value = "";
    document.getElementsById('find-recent-tests-taken-button').value = "";
  
};