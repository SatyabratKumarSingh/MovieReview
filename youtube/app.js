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
        oauth.setCredentials(tokens);
		getYoutubeData();
        lien.end("The video is being uploaded. Check out the logs in the terminal.");

    });
});

var async = require('async');
var firebase = require('firebase');




firebase.initializeApp({
serviceAccount: {
    projectId:   FireConfig.projectId,
    clientEmail: FireConfig.clientEmail,
    privateKey:  FireConfig.privateKey
  },
  databaseURL: FireConfig.kDBBaseRef
});

var db = firebase.database();

var videoDict = {};
var userArray = [];

var videoKeys = ["title", "thumbnail", "createdDate"];


function getYoutubeData(){
   async.waterfall([
    	function(callback){
    		Youtube.searchFunctions.simpleSearch('upcoming trailers').then(function (data) {
    		callback(null, data);
		});
    },
    function(arg1, callback){
		callback(null,arg1);
    }
  ], function (err, result) {
  		if(err != null){
    	}
    	saveData(result);
  });
}

function createLog(msg){
	var startTime = firebase.database.ServerValue.TIMESTAMP;
	var log = {};
	log['msg'] = msg;
	log['time'] = startTime;
	return log;
}

function saveData(result){

	result.forEach(function(json){
		var video = {};
		var videoValue = [];
		var vId = json.videoId;
		var vTitle = json.title;
		var vCreatedTime = Date.parse(json.publishedAt)/1000;
		var thumbnails = json.thumbnails.default;
	
		videoValue.push(vTitle);
		videoValue.push(thumbnails);
		videoValue.push(vCreatedTime);


// 		
		for(var i=0; i<videoKeys.length;i++){
			if(typeof videoValue[i] == 'undefined'){
				video[videoValue[i]] = '';
			}
			else{
				video[videoKeys[i]] = videoValue[i];
			}
		}
		videoDict[vId] = video;

	});
	
	// saving data to firebase
	
	async.series
    ([  
        function (callback)
        {
        	saveToDatabaseWithRef(FireConfig.kDBVideoRef,videoDict);   
            callback();
        }
       
    ]
    ,
    function(err) 
    {
    	if(err != null){
    		saveLogs(FireConfig.kDBLogRef,createLog(err));
    	}
		saveLogs(FireConfig.kDBLogRef,createLog('saving data'));
        console.log("Done !");
    });
}


var onComplete = function(error) {
  if (error) {
    if(error != null){
    		console.log(error);
    		saveLogs(FireConfig.kDBLogRef,createLog(error));
    	}
  } else {
    console.log('Synchronization succeeded');
    process.exit();
  }
};
function saveToDatabaseWithRef(childRef, data){
	var videoRef = db.ref(childRef);
// 	videoRef.update(data);
	videoRef.update(data,onComplete);

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


