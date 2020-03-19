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

// https://codeburst.io/html5-speech-recognition-api-670846a50e92
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
if ('SpeechRecognition' in window) {
	const recognition = new window.SpeechRecognition();
	console.log('const recognition succeeded.');

	recognition.onresult = (event) => {
	  const speechToText = event.results[0][0].transcript;
	  console.log(speechToText);
	}
	recognition.interimResults = true;
	recognition.continuous = true;
	
	recognition.start();

} else {
  console.log('SpeechRecognition not in window');
}
