'use strict'

const pacer = require('./pacer.js');

module.exports.hello = (event, context, callback) => {
  console.log('Event: '+JSON.stringify(event, null, 2));
  // call to open the skill will have no intent
  if (!event.request.intent) {
    callback(null,
      responseBuilder(
        {
          type: 'PlainText',
          text: `Welcome to Pace Calculator. To get your marathon pace, say marathon in 3 hours (or whatever time you're aiming at).`
        },
        false
      )
    );
    return;
  }
  // built-in intents
  else if (event.request.intent.name === 'AMAZON.StopIntent' || event.request.intent.name == 'GetPaceCancel') {
    callback(null, {version: '1.0',response: { shouldEndSession: true }});
    return;
  }
  else if (event.request.intent.name === 'AMAZON.HelpIntent') {
    callback(null,
      responseBuilder(
        {
          type: 'PlainText',
          text: `The skill will calculate your marathon pace given a duration. Try saying marathon in 3 hours (or whatever time you're aiming at).`
        },
        false
      )
    );
    return;
  }


  const duration = event.request.intent.slots.Duration.value || 0;
  console.log("Duration: "+duration);


  if (duration === 0) {
    var outputSpeechRes = {type: 'PlainText', text: `Try saying marathon in 3 hours. Try with a sensible time, like under 10 hours.`};
    callback(null, responseBuilder(outputSpeechRes));
    return;
  }

  var paceStr = pacer.paceStringWithDurationString(duration);

  var outputSpeechRes = {
    type: 'SSML',
    ssml: `<speak>
            Your pace should be<say-as interpret-as="time">`+paceStr+`</say-as> per Kilometer.
           </speak>`
  };

  console.log("Response: "+JSON.stringify(responseBuilder(outputSpeechRes),null,2));

  callback(null, responseBuilder(outputSpeechRes));

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

function responseBuilder(outputSpeechRes, closeSession = true) {
  return {
    version: '1.0',
    response: {
      outputSpeech: outputSpeechRes,
      shouldEndSession: closeSession,
    },
  };
}
