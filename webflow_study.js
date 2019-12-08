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
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    console.log('update_learning_content got user: ' + user.uid)
	    
	    var query = db
	    	.collection('cards')
	    	.where('user', '==', user.uid)
	    	.orderBy('spacingLastDue')
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
	});
};

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
	console.log('About to set card w/ id', currentCardId, ' to difficulty ', difficulty);
	// console.log('The lastInterval is ', 
	// currentCardAsObject['testSetting'] = 'Look ma';
	// https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
	updates = {};
	updates.notePost = 'Look, I modified the postnote on Dec 8.';

	if (difficulty == 'Again') 
	{
		updates.spacingDue = currentCardNextDueAgain;
	} 
	else if (difficulty = 'Good') 
	{
		updates.spacingDue = currentCardNextDueGood;
	}
	else 
	{
		updates.spacingDue = currentCardNextDueBest;
	}

	db.collection('cards').doc(currentCardId).update(updates)
		.then(function() {
			console.log(currentCardId, ': ', updates.spacingDue);
		})
		.catch(function(error) {
			console.log('WTF? Doc was not written! Error was ', error);
		});
}

// function calculateNextDue(spacingLastDue, spacingLastInterval, spacingLastMultiplier)
// {
// 	spacingLastDue spacingLastInterval * spacingLastMultiplier
// }
// active_tf: true
// clozeNum: 1
// contentClozed: "政府的[decision]引起了很多不同的指責。"
// contentNativeTranslation: "The government's decision gave rise to a lot of criticism."
// contentOriginal: "政府的決定引起了很多不同的指責。"
// note: "yGhZnyAQ3SEvGKAxniX0"
// notePost: "This is a sample post-note, but mod for card 1."
// notePre: "This is a sample pre-note for card 1"
// spacingDue: uo {seconds: 1575223340, nanoseconds: 372809000}
// spacingLastDue: uo {seconds: 1575216140, nanoseconds: 372809000}
// spacingLastInterval: 50
// spacingLastMultiplier: 2
// user: "S4BpEFgxflezIHhuzUH19819mg93"
// __proto__: Object

$(this).ready
(
	function() {
		attachCardSnapshotListener($(this));
		console.log('Done.')
	}
)
