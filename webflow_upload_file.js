$(this).ready( function() {
	$("#recognizedTextField").text( "一二三你好中文" );
	data_tables_init( "recognizedTextField" );

	// https://codeburst.io/html5-speech-recognition-api-670846a50e92
	window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	if ('SpeechRecognition' in window) {
		console.log('SpeechRecognition is in window!.');

		let recognition = new window.SpeechRecognition();
		let final_transcript = '';

		recognition.interimResults = true;
		recognition.continuous = true;
		recognition.maxAlternatives = 10;
		recognition.lang = "zh-CN"
		recognition.onresult = (event) => {
			console.log('recognition onResult event.');

			let interimTranscript = '';
			for (let i = event.resultIndex, len = event.results.length; i < len; i++) 
			{
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					final_transcript += transcript;
					console.log('Final transcript: ', final_transcript);
					$("#recognizedTextField").text( 'Final: ' + final_transcript );

					// Should run the datatables init now
					data_tables_init( "recognizedTextField" );
				} else {
					interimTranscript += transcript;
					console.log('Interim transcript: ', interimTranscript);
					$("#recognizedTextField").text( 'Interim: ' + interimTranscript );

				}
			}
		}
		
		recognition.start();
	}
});


ajaxCallButton_click = function()
{
	console.log("submitTextButton_click.");
	gcf_url = "https://us-central1-memotori.cloudfunctions.net/hello_firestore_http";

	$.ajax({
	  url: gcf_url,
	  type: "POST",
`		  data: {
	  	uploadType: 'resumable',
	  	'name': 'test.mp3',
	  	},
	  contentType: "application/json; charset=utf-8",
	  dataType:"json",
	  headers: {
	  	"X-Test-Content-Type": "application/octet-stream",
	  	}
	  success: function(res, status, xhr)
	  {
	  	alert( xhr.getResponseHeader("myHeader") )
	  }
	})
};

$("#ajaxCallButton").click(ajaxCallButton_click);
