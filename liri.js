var sourceFile = require('./keys.js'); //links or 'requires' this JS file
//REQUIRED NODE MODULES
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var client = new Twitter({
       consumer_key: sourceFile.twitterKeys.consumer_key,
       consumer_secret: sourceFile.twitterKeys.consumer_secret,
       access_token_key: sourceFile.twitterKeys.access_token_key,
       access_token_secret: sourceFile.twitterKeys.access_token_secret
   });

var spotify = new Spotify({
  id: 'ecf38321fbbc4324940145467aa1e13a',
  secret: '3acbb3ea7bd549caba249f3663c84f70'
});

var nodeArg = process.argv[2];
var nodeQuery = process.argv.slice(3).join(' ');

function runThisSwitch() {
	switch (nodeArg) {
	  case "spotify-this-song":
	    spotifySearch();
	    break;

	  case "my-tweets":
	  	myTwitter();
	  	break;
	  
	    case "movie-this":
	  	movieSearch();
	  	break;
	  
	  case "do-what-it-says":
	  	doThis();
	  	break;
	  }
};

runThisSwitch();

//TWITTER SEARCH
function myTwitter() {
	var params = {screen_name: 'MediaGeek303', count: '20'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
   // console.log(tweets);
	   for (var i = 0; i < tweets.length; i++) {
		   console.log("Tweet " + (i+1) + ": " + tweets[i].text + "\r\n====================");
		}
	});
};
//SPOTIFY SEARCH
function spotifySearch() {
	if (nodeQuery === '') {
		nodeQuery = 'I-saw-the-sign'
	}
	spotify.search({ type: 'track', query: nodeQuery, limit: '5'}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}

		for (var i = 0; i < data.tracks.items.length; i++) {
			var songInfo = "Artists: " + JSON.stringify(data.tracks.items[i].artists[0].name) + 
				"\r\nSong name: " + JSON.stringify(data.tracks.items[i].name) + "\r\nPreview Link: " + 
				JSON.stringify(data.tracks.items[i].external_urls.spotify) + "\r\nAlbum: " + 
				JSON.stringify(data.tracks.items[i].album.name) + 
				'\r\n===============================================================\r\n';

			console.log(songInfo);
			// write data to file
			fs.appendFile("log.txt", songInfo, function(error, data) {
			  if (error) {
			    return console.log(error);
			  	} // console.log("file updated!");
			});
		};
	});
};

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var splitData = data.split("\r\n");

      for (var i = 0; i < splitData.length; i++) {
	    parseData = splitData[i].split(",");
	    nodeArg= parseData[0];
	    nodeQuery = parseData[1];

		runThisSwitch(nodeArg);
		}
  });
};