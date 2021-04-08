const fs = require("fs");
var path = require('path');

/**
 * Twitch Request Bot for Microsoft Flight Simulator
 */
//const request_file = fs.readFileSync("../../../data/request_queue.json");
const datapath = path.join(__dirname, '../../../data');
const request_file = datapath + "/request_queue.json";
const request_queue = require(request_file);
//const request_queue = JSON.parse(request_file);

/**
 * Define Request Commands Namespace
 */
let self = {};
self.namespace = "request";

/**
 * !add command, adds requests to the queue
 * Usage: !add <departureCode> <arrivalCode> [<timeofDay> <description>]
 * Example: !add PDX SEA MORNING Short flight from Portland to Seattle
 * 
 * @param {STRING} dep - Departure Airport Code
 * @param {STRING} arr - Arrival Airport Code
 * @param {STRING} desc - Description of Flight
 * @param {STRING} tod - Time of Day
 * @param {STRING} user - Username of Requester 
 */
self.add = function (commandText,context,channel,source) {
  /* This is to add entries to the request queue [User] */
  let user = streamer = null;
  if (source == "twitch") {
    streamer = channel.substring(1).toLowerCase();
    user = context.username;
  } else if (source == "discord") {
    user = context.author.username;
  }
  if (!commandText) return `You're request cannot be empty!`;
  const request = commandText.split(" ");
  const dep = (request[0]) ? request[0] : null;
  const arr = (request[1]) ? request[1] : null;
  const tod = (request[2]) ? request[2] : null;
  const desc = (request[3]) ? request.slice(3).join(" ") : "";  
  
  if (dep && arr) { 
    const response = addReqEntry(arr,dep,user,tod,desc);
    if (response) return response;
    return `@${user}: Unable to add request, please try again!`;
  } else {
    return `@${user}: Departure and Arrival Airport Codes or Cities are required, please try again!`;
  }
};

self.queue = function () {
/* This is to view the request queue [Mod] */

};

self.list = function () {
/* This is to view the list of people in the request queue [User] */

};

self.current = function() {
/* This is to see the current request entry [User] */

};

self.del = function() {
/* This is to delete a request entry [Mod] */

};

self.oops = function() {
/* This is to delete your last request entry [User] */

};

/**
 * Export the functions assigned to self
 */
module.exports = self;

/**
 * Queries Queue for Existing Request
 * @param {str} arr 
 * @param {str} dep 
 * @return {array} username or false
 */
function queryReqQueue(arr, dep, current_queue) {
  const checked = current_queue.map(function(entry) {
    console.log(entry);
    const exists = (entry.arr == arr && entry.dep == dep);
    const response = (exists) ? entry : null;
    if (response) {
      return response;
    }
  })
}

/**
 * Adds Entry to Queue
 * @param {str} arr 
 * @param {str} dep 
 * @param {str} desc 
 * @param {str} tod 
 * @param {str} user 
 */
function addReqEntry(arr,dep,user,tod,desc = "") {
  const current_queue = request_queue;
  const existingRequest = queryReqQueue(arr,dep,current_queue);
  if (existingRequest) {
    return `Sorry, @${user}, ${existingRequest.username} already requested ${existingRequest.arr} to ${existingRequest.dep}!`
  }
  const newEntry = { "skipped": false, "played": false, "deleted": false, "timestamp": Date.now() };
  console.log(request_queue);
  const [lastEntry] = current_queue.slice(-1);
  newEntry.id = lastEntry.id + 1;
  newEntry.arr = arr;
  newEntry.dep = dep;
  newEntry.desc = desc;
  newEntry.tod = tod;
  newEntry.user = user;
  current_queue.push(newEntry);
  const response = saveQueue(current_queue, request_file);
  if (response) {
    request_queue.push(newEntry);
    const time = (tod) ? `, time of day: ${tod}` : "";
    if (response) return `@${user}: Your request for ${arr} to ${dep}${time} was added!`;
  } else return false;
}

/**
 * Saves Queue back to JSON File
 * @param {JSON} queueData 
 * @param {PATH} fileName 
 */
function saveQueue(queueData, fileName) {
  console.log(queueData);
  data = JSON.stringify(queueData);
  fs.writeFileSync(fileName, data);
  console.log(`Saved queue to ${fileName}`);
  return true;
}