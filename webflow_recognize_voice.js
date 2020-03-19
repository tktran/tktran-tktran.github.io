// var ready_function = function() {
// 	  window.AudioContext = window.AudioContext || window.webkitAudioContext;
// 		navigator.mediaDevices.getUserMedia(
// 	    {   
// 	    audio: {
// 	    mandatory: {
// 	        googEchoCancellation: 'false',
// 	        googAutoGainControl: 'false',
// 	        googNoiseSuppression: 'false',
// 	        googHighpassFilter: 'false',
// 	        },
// 	    },
// 		}).then(startRecording)
// 		    .catch( e => {
// 		   /* If there are some errors with parameter configurations or 
// 		   user didn’t give you the access to the microphone inside the browser, you end here. */
// 		    console.log(e);
// 		    }
// 		);
// };

// $( document ).ready(ready_function);


$(this).ready( function() {
	// https://codeburst.io/html5-speech-recognition-api-670846a50e92
	window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	if ('SpeechRecognition' in window) {
		console.log('SpeechRecognition is in window!.');

		let recognition = new window.SpeechRecognition();
		let final_transcript = '';

		recognition.interimResults = true;
		recognition.continuous = true;
		recognition.maxAlternatives = 10;
		recognition.lang = "vi"
		recognition.onresult = (event) => {
			console.log('recognition onResult event.');

			let interimTranscript = '';
			for (let i = event.resultIndex, len = event.results.length; i < len; i++) 
			{
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					final_transcript += transcript;
					console.log('Final transcript: ', final_transcript);
					$("#recognizedTextField").text( final_transcript );
				} else {
					interimTranscript += transcript;
					console.log('Interim transcript: ', interimTranscript);
					$("#recognizedTextField").text( interimTranscript );

				}
			}
		}
		
		recognition.start();
	}
});
