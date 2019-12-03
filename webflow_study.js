function update_learning_content(thisObj)
{
	// Task 2: using Firestore, retrieve next card and update values in boxes
	var db = firebase.firestore();
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    console.log('update_learning_content got user: ' + user.uid)

	    // var query = db.collection('notes').where('user', '==', user.uid);
	    var query = db.collection('notes').where('user', '==', user.uid).orderBy('spacingLastDue');
	    query.get()
	    	.then
	    	(
	    		function(querySnapshot) 
	    		{
	    			querySnapshot.forEach
	    			(
	    				function(doc) 
	    				{
	    				console.log(doc.id, ' => ', doc.data());
	    				}
	    			);
	    		}
	    	)
	    	.catch
	    	(
	    		function(error)
	    		{
	    			console.log('Error getting documents: ', error);
	    		}
	    	);
	  } else {
	    console.log('update_learning_content got user: ' + 'NONE')
	  }
	});

    // $.ajax(
    // 	{
    // 		url: '../ajax/get_next_card/', 
    // 		dataType: 'json', 
    // 		success: function(data) 
    // 		{ 
    // 			// do these first so the text is not shown at all
    // 			$("#showAnswerButton").show();
    // 			$("#answerButtons").hide();
    // 			$("#postnoteP").hide();

    // 			// set the new cloze (target) and source text
    // 			console.log("succeeded: " + data.clozed_text);
    // 			$("#targetP").html(data.target_full_clozed);
    // 			$("#sourceP").text(data.native_full);
    //             $("#prenoteP").text(data.pre_note);
    //             $("#postnoteP").text(data.post_note);

    //             // For interview
    //             $("#targetP").html("Why on earth did you stay up so late?!");
    //             $("#sourceP").text("¿Por qué diablos te quedaste despierto tan tarde?");
    //             $("#prenoteP").text("Este es un idioma, no un significado literal!");
    //             $("#postnoteP").text("Aprendimos este idioma en el episodio 5.");

    // 			$("#audioP").html('<a href="' + media_url + data.audio_file + '">Clic en este botón para audio.</a>');

    // 			// ######## JQUERY DATA #######
    // 			// need to save card id so it can be updated later
    // 			$("#targetP").data('card_id', data.card_id);
    // 			console.log('prompt -> card_id is... ' + $("#prompt").data('card_id'))
    // 		},
    // 		error: function() { console.log("update_learning_content failed.")}
    // 	}
    // )
}

// https://codelabs.developers.google.com/codelabs/firestore-web/#6
// In this section, you'll learn how to retrieve data from Cloud 
// Firestore and display it in your app. The two key steps are 
// creating a query and adding a snapshot listener. This listener 
// will be notified of all existing data that matches the query 
// and will receive updates in real time. [Have to do it this way.
// Can't just get the list of cards all at once, because failed cards
// need to be able to pop up again]

getAllCards = function(renderer)
{
  var query = db
  	.collection('notes')
  	.where('user', '==', user.uid)
  	.orderBy('spacingLastDue')
  	.limit(1);
  this.getDocumentsInCardQuery(query, renderer);
}

// getDocumentsInCardQuery = function(query, renderer)
// {
// 	query.onSnapshot(function(snapshot) {
// 		if (!snapshot.size) return;

// 		snapshot.docChanges().forEach(function(change) {
// 			if (change.type == 'removed') {
// 				renderer.remove(change.doc);
// 			} else {
// 				renderer.display(change.doc);
// 			}
// 		});
// 	});
// };


getDocumentsInCardQuery = function(thisObj)
{
	var db = firebase.firestore();

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
		getDocumentsInCardQuery($(this));
		console.log('Done.')
	}
)

$("#showAnswerButton").click
(
	function()
	{
			$("#clozedContent").hide();
			$("#originalContent").show();

			$("#preNote").hide();
			$("#postNote").show();

			$("showAnswerButton").hide();
			$("setIntervalDiv").show();
	}
)
