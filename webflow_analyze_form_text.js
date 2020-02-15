var currentCardId = "NA";
var currentCardLastDue = null;
var currentCardLastInterval = null;
var currentCardLastMultiplier = null;

var currentCardNextDueAgain = null;
var currentCardNextDueGood = null;
var currentCardNextDueBest = null;

const settings = {};

var db = firebase.firestore();
db.settings(settings);

// https://www.sitepoint.com/use-jquerys-ajax-function/
// https://stackoverflow.com/questions/4159701/jquery-posting-valid-json-in-request-body
submitTextButton_success = function(data)
{
	var user = firebase.auth().currentUser;
	if (user)
	{
		console.log('User exists.');
	}

	// This works!
	console.log(data["0"]);

	// Testing this.
	// https://stackoverflow.com/questions/2342371/jquery-loop-on-json-data-using-each
	$.each(data, function(index, element) {
		console.log('data[', index, ']=', data[index]);
		// console.log('element = ', element);
	})
};

submitTextButton_failure = function(jqxhr, status, exception)
{
	var user = firebase.auth().currentUser;
	if (user)
	{
		$("#resultDiv").html("AJAX call failed with exception " + exception);
	}
	else
	{
		$("#resultDiv").html("AJAX call failed.");
	}
};

data_tables_init = function()
{
	// https://datatables.net/examples/server_side/post.html
	console.log('json_data in data_tables_init: ', json_data)
	datatables_config = {
		"ajax": {
			"url": "https://us-central1-memotori.cloudfunctions.net/hello_firestore_http",
			"type": 'POST',
			"data": $('#inputTextField').val(),
			"contentType": "application/json",
			"dataSrc": '',
		},
		"columns": [
			{"data": "i"},
			{"data": "token"}
		]
	};

	$('#table_id').DataTable(datatables_config);
}

submitTextButton_click = function()
{
	console.log("submitTextButton_click.")
	gcf_url = "https://us-central1-memotori.cloudfunctions.net/hello_firestore_http";
	json_data = JSON.stringify({'text': $('#inputTextField').val()});

	// $.ajax(
	// 	{
	// 		url: gcf_url,
	// 		type: 'POST',
	// 		data: json_data,
	// 		dataType: 'json',
	// 		contentType: "application/json",
	// 		success: submitTextButton_success,
	// 		error: submitTextButton_failure
	// 	});

	data_tables_init();
};

$("#submitTextButton").click(submitTextButton_click);

// (
// 	function()
// 	{
// 		var user = firebase.auth().currentUser;

// 		if (user) {
// 			$("#resultDiv").html("User ID is " + user.uid);
// 		}
// 		else {
// 			$("#resultDiv").html("User not logged in. ");
// 		}
// 	}
// )

// $("#submitTextButton").click
// (
// 	function()
// 	{
// 		var user = firebase.auth().currentUser;

// 		if (user) {
// 			console.log("submitTextButton click.");
// 			console.log("User ID is ", user.uid);

// 			text_doc = db.collection('pending_text_docs').doc()
// 			text_doc.set(
// 				{
// 					'text': $('#inputTextField').val(),
// 					'user': user.uid
// 				}
// 			)

// 			// // It's user.uid, not user.id!
// 			// // should be spacingDue descending or ascending?
// 			// var query = db
// 			// 	.collection('users')
// 			// 	.doc(user.uid) 
// 			// 	.collection('progress')
// 			// 	.where('content_type', 'in', [check1, check2, check3, check4])
// 			// 	.orderBy('spacingDue')
// 			// 	.limit(100);
// 			// console.log(query);

// 			// NEXT STEP - ADD MORE LEARNING CONTENT, CATEGORIZED AS SHOWN ABOVE, AND TEST IT ALL OUT!

// 		}
// 		else {
// 			console.log('User not logged in');
// 		}
// 	}
// )

// attachCardSnapshotListener = function(thisObj)
// {
// 	var user = firebase.auth().currentUser;
//   if (user) {
//     console.log('update_learning_content got user: ' + user.uid)
    
//     var query = db
//     	.collection('users')
//     	.doc(user.id)
//     	.collection('cloze_progress')
//     	.where('spacingDue', '<=', moment().unix())
//     	.orderBy('spacingDue')
//     	.limit(100)
// 		query.onSnapshot(function(snapshot) {
// 			if (!snapshot.size) {
// 				console.log('snapshot empty')
// 				return;
// 			}
// 			snapshot.forEach(function(doc) {
// 				console.log('card snapshot listener was triggered w/', doc.id, ' -> ', doc.data());
// 				currentCardId = doc.id;
// 				currentCardLastDue = doc.get('spacingLastDue').toDate();
// 				console.log('currentCardLastDue: ', currentCardLastDue);

// 				temp_moment = moment(currentCardLastDue);
// 				temp_moment.add(1, 'hours');
// 				currentCardNextDueAgain = temp_moment.toDate();

// 				temp_moment = moment(currentCardLastDue);
// 				temp_moment.add(1, 'days');
// 				currentCardNextDueGood = temp_moment.toDate();

// 				temp_moment = moment(currentCardLastDue);
// 				temp_moment.add(1, 'weeks');
// 				currentCardNextDueBest = temp_moment.toDate();

// 				console.log('currentCardNextDueAgain: ', currentCardNextDueAgain);
// 				console.log('currentCardNextDueGood: ', currentCardNextDueGood);
// 				console.log('currentCardNextDueBest: ', currentCardNextDueBest);

// 				$("#clozedContent").show();
// 				$("#originalContent").show();
// 				$("#preNote").show();
// 				$("#postNote").hide();
// 				$("#showAnswerDiv").show();
// 				$("#setIntervalGrid").hide();

// 				$("#clozedContent").html(doc.get('contentClozed'));
// 				$("#nativeTranslation").html(doc.get('contentNativeTranslation'));
// 				$("#preNote").html(doc.get('notePre'));
// 				$("#postNote").html(doc.get('notePost'));
// 				$("#originalContent").html(doc.get('contentOriginal'));
// 			});
// 		});
// 	} else {
// 		console.log('no auth user')
// 	}
// };

// $("#showAnswerButton").click
// (
// 	function()
// 	{
// 		console.log("showAnswerButton click");
// 		// $("#clozedContent").show();
// 		// $("#originalContent").show();
// 		// $("#preNote").show();
// 		$("#postNote").show();
// 		$("#showAnswerDiv").hide();
// 		$("#setIntervalGrid").show();
// 	}
// )

// $("#buttonAgain").click
// (
// 	function()
// 	{
// 		console.log("buttonAgain click.");
// 		setLearningDifficulty("Again");
// 	}
// )

// $("#buttonGood").click
// (
// 	function()
// 	{
// 		console.log("buttonGood click.");
// 		setLearningDifficulty("Good");

// 	}
// )

// $("#buttonBest").click
// (
// 	function()
// 	{
// 		console.log("buttonBest click.");
// 		setLearningDifficulty("Best");
// 	}
// )

// function setLearningDifficulty(difficulty) {
// 	// console.log('The lastInterval is ', 
// 	// currentCardAsObject['testSetting'] = 'Look ma';
// 	// https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
// 	updates = {};
// 	updates.notePost = 'Look, I modified the postnote on Dec 8.';

// 	if (difficulty == 'Again') 
// 	{
// 		console.log('About to set card w/ id', currentCardId, ' to Again.');
// 		updates.spacingDue = currentCardNextDueAgain;
// 	} 
// 	else if (difficulty == 'Good') 
// 	{
// 		console.log('About to set card w/ id', currentCardId, ' to Good.');
// 		updates.spacingDue = currentCardNextDueGood;
// 	}
// 	else 
// 	{
// 		console.log('About to set card w/ id', currentCardId, ' to Best.');
// 		updates.spacingDue = currentCardNextDueBest;
// 	}

// 	db.collection('cards').doc(currentCardId).update(updates)
// 		.then(function() {
// 			console.log('Success. ', currentCardId, ': ', updates.spacingDue);
// 		})
// 		.catch(function(error) {
// 			console.log('WTF? Doc was not written! Error was ', error);
// 		});
// }

$(this).ready();
