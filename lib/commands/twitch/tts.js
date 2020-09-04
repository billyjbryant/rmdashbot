var AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');

const options = {
  'region': process.env.AWS_REGION,
  'api_key': process.env.AWS_ACCESS_KEY_ID,
  'secret': process.env.AWS_SECRET_ACCESS_KEY
}

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: options.region
});

// Create the Speaker instance
const Player = new Speaker({
channels: 1,
bitDepth: 16,
sampleRate: 16000
});


self = {};

self.speak = function (Text, OutputFormat, VoiceId) {
  let params = {};
  params.Text = (Text) ? Text : "Welcome to Billy J Bryant's Channel!";
  params.OutputFormat = (OutputFormat) ? OutputFormat : 'pcm';
  params.VoiceId = (VoiceId) ? VoiceId : 'Brian';
  
  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code);
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough();
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream);
            // Pipe into Player
            bufferStream.pipe(Player);
        }
    }
  });
}

/**
 * Export the functions assigned to self
 */
module.exports = self;