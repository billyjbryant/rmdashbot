var AWS = require('aws-sdk');
var say = require('say');

const options = {
  'region': process.env.AWS_REGION,
  'api_key': process.env.AWS_ACCESS_KEY_ID,
  'secret': process.env.AWS_SECRET_ACCESS_KEY
}

let self = {};
self.speak = function (Text, OutputFormat, VoiceId) {
  let params = {};
  params.Text = (Text) ? Text : "Welcome to Billy J Bryant's Channel!";
  params.OutputFormat = (OutputFormat) ? OutputFormat : 'pcm';
  params.VoiceId = (VoiceId) ? VoiceId : 'Brian';

  say.speak(Text, (err) => {
    if (err) {
      return console.error(err)
    }
  
    console.log('Text has been spoken.')
  });
}

/**
 * Export the functions assigned to self
 */
module.exports = self;