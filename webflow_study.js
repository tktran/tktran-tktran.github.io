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

attachCardSnapshotListener = function(thisObj)
{
	var user = firebase.auth().currentUser;
  if (user) {
    console.log('update_learning_content got user: ' + user.uid)
    
    var query = db
    	.collection('cards')
    	.where('user', '==', user.uid)
    	.orderBy('spacingDue')
    	.limit(1);

		query.onSnapshot(function(snapshot) {
			if (!snapshot.size) {
				console.log('snapshot empty')
				return;
			}
			snapshot.forEach(function(doc) {
				console.log(doc.id, ' -> ', doc.data());
				currentCardId = doc.id;
				currentCardLastDue = doc.get('spacingLastDue').toDate();
				console.log('currentCardLastDue: ', currentCardLastDue);

				// figure out why this isn't working
				temp_moment = moment(currentCardLastDue);
				temp_moment.add(1, 'hours');
				currentCardNextDueAgain = temp_moment.toDate();

				temp_moment = moment(currentCardLastDue);
				temp_moment.add(1, 'days');
				currentCardNextDueGood = temp_moment.toDate();

				temp_moment = moment(currentCardLastDue);
				temp_moment.add(1, 'weeks');
				currentCardNextDueBest = temp_moment.toDate();

				console.log('currentCardNextDueAgain: ', currentCardNextDueAgain);
				console.log('currentCardNextDueGood: ', currentCardNextDueGood);
				console.log('currentCardNextDueBest: ', currentCardNextDueBest);

				$("#clozedContent").html(doc.get('contentClozed'));
				$("#nativeTranslation").html(doc.get('contentNativeTranslation'));
				$("#preNote").html(doc.get('notePre'));
				$("#postNote").html(doc.get('notePost'));
				$("#originalContent").html(doc.get('contentOriginal'));
			});
		});
	} else {
		console.log('no auth user')
	}
};

attachCardSnapshotListener =
$("#showAnswerButton").click
(
	function()
	{
		console.log("showAnswerButton click");
		$("#clozedContent").hide();
		$("#originalContent").show();

		$("#postNote").show();

		$("#showAnswerDiv").hide();
		$("#setIntervalGrid").show();
	}
)

$("#buttonAgain").click
(
	function()
	{
		console.log("buttonAgain click.");
		setLearningDifficulty("Again");
	}
)

$("#buttonGood").click
(
	function()
	{
		console.log("buttonGood click.");
		setLearningDifficulty("Good");

	}
)

$("#buttonBest").click
(
	function()
	{
		console.log("buttonBest click.");
		setLearningDifficulty("Best");
	}
)

function setLearningDifficulty(difficulty) {
	// console.log('The lastInterval is ', 
	// currentCardAsObject['testSetting'] = 'Look ma';
	// https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
	updates = {};
	updates.notePost = 'Look, I modified the postnote on Dec 8.';

	if (difficulty == 'Again') 
	{
		console.log('About to set card w/ id', currentCardId, ' to Again.');
		updates.spacingDue = currentCardNextDueAgain;
	} 
	else if (difficulty == 'Good') 
	{
		console.log('About to set card w/ id', currentCardId, ' to Good.');
		updates.spacingDue = currentCardNextDueGood;
	}
	else 
	{
		console.log('About to set card w/ id', currentCardId, ' to Best.');
		updates.spacingDue = currentCardNextDueBest;
	}

	db.collection('cards').doc(currentCardId).update(updates)
		.then(function() {
			console.log('Success. ', currentCardId, ': ', updates.spacingDue);
		})
		.catch(function(error) {
			console.log('WTF? Doc was not written! Error was ', error);
		});
}

$(this).ready
(
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('this ready -> user snapshot attachment succeeded');
			attachCardSnapshotListener($(this));
		}
		else
		{
			console.log('No user is signed in.');
		}
	})
)
