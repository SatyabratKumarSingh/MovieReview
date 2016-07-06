"use strict";

var youtubeAPI = require("youtube-api")
  , YConfig = require("./config").youtube
  , FireConfig = require("./config").fbase;
 
const fs = require("fs")
    , readJson = require("r-json")
    , Lien = require("lien")
    , Logger = require("bug-killer")
    , opn = require("opn")
    , prettyBytes = require("pretty-bytes")
    ;
    
const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
let server = new Lien({
    host: "localhost"
  , port: 5000
});

let oauth = youtubeAPI.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.web.client_id
  , client_secret: CREDENTIALS.web.client_secret
  , redirect_url: CREDENTIALS.web.redirect_uris[0]
});

opn(oauth.generateAuthUrl({
    access_type: "offline"
  , scope: ["https://www.googleapis.com/auth/youtube"]
}));
// oauth.setCredentials("ya29.CjAXA_r_zlk58QjcN3g9C3hcHKhSwjyIPa4Y1vCL7AuJAQoB8cWxCzkVftA9_jCLwKI");

var Youtube = {
    searchFunctions: require('./lib/search-functions'),
};



server.addPage("/oauth2callback", lien => {
    Logger.log("Trying to get the token using the following code: " + lien.query.code);
    oauth.getToken(lien.query.code, (err, tokens) => {

        if (err) {
            lien.lien(err, 400);
            return Logger.log(err);
        }

        Logger.log("Got the tokens.");
		console.log(tokens);
        oauth.setCredentials(tokens);
		getYoutubeData();
        lien.end("The video is being uploaded. Check out the logs in the terminal.");

    });
});

var async = require('async');
var firebase = require('firebase');




// firebase.initializeApp({
// serviceAccount: {
//     projectId:   FireConfig.projectId,
//     clientEmail: FireConfig.clientEmail,
//     privateKey:  FireConfig.privateKey
//   },
//   databaseURL: FireConfig.kDBBaseRef
// });
// 
// var db = firebase.database();
// 
// 
// var postResults = [];
// var userResults = [];
// var postDict = {};
// var imageDict = {};
// var userArray = [];
// 
// var postKeys = ["id", "title","url", "thumbnail", "createdDate"];
// 	console.log(YConfig.API);


function getYoutubeData(){
   async.waterfall([
    	function(callback){
    		Youtube.searchFunctions.simpleSearch('trailers').then(function (data) {
    		console.log(data);
    		callback(null, data);
		});
    },
    function(arg1, callback){
		callback(null,arg1);
    }
  ], function (err, result) {
  		if(err != null){
    	}
  });
}

function createLog(msg){
	var startTime = firebase.database.ServerValue.TIMESTAMP;
	log = {};
	log['msg'] = msg;
	log['time'] = startTime;
	return log;
}

var onComplete = function(error) {
  if (error) {
    if(error != null){
    		saveLogs(FireConfig.kDBLogRef,createLog(error));
    	}
  } else {
    console.log('Synchronization succeeded');
    process.exit();
  }
};
function saveToDatabaseWithRef(childRef, data){
	var postRef = db.ref(childRef);
	postRef.update(data);
// 	postRef.update(data,onComplete);

}

function saveLogs(childRef, data){
	var postRef = db.ref(childRef);
// 	data.forEach(function (value){
		postRef.push().set(data);
// 	});
// 	postRef.push().update(data,onComplete);
}


// reading data from database
// function readDataFromChild(childRef){
// 	var ref = db.ref(childRef);
// 	ref.on("value", function(snapshot) {
//   		console.log(snapshot.val());
// 	}, function (errorObject) {
//   	console.log("The read failed: " + errorObject.code);
// 	});
// }


