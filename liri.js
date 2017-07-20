//LOOK INTO SWITCH() instead of all these if statements.... 07/18/17

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

//TWITTER SEARCH
if (nodeArg === 'my-tweets') {
	var params = {screen_name: 'MediaGeek303', count: '20'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
   // console.log(tweets);
	   for (var i = 0; i < tweets.length; i++) {
		   console.log("Tweet " + (i+1) + ": " + tweets[i].text)
		   console.log("====================")
   		}
	});
};

//SPOTIFY SEARCH
if (nodeArg === 'spotify-this-song' && nodeQuery === '') {
	
		spotify.search({ type: 'track', query: 'I saw the sign', limit: '1'}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data, null, 2));
			var singleSong = "You didn't search anything, so here's this one... \r\nArtists: " + JSON.stringify(data.tracks.items[i].artists[0].name) + 
				"\r\nSong name: " + JSON.stringify(data.tracks.items[i].name) + "\r\nPreview Link: " + 
				JSON.stringify(data.tracks.items[i].external_urls.spotify) + "\r\nAlbum: " + 
				JSON.stringify(data.tracks.items[i].album.name) + 
				'\r\n===============================================================\r\n';

			console.log(singleSong);
			// write data to file
			fs.appendFile("log.txt", singleSong, function(error, data) {
			  if (error) {
			    return console.log(error);
			  	} // console.log("file updated!");
			});
		});
	};

if (nodeArg === 'spotify-this-song' && nodeQuery != '') {

	spotify.search({ type: 'track', query: nodeQuery, limit: '5'}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data, null, 2));
		for (var i = 0; i < data.tracks.items.length; i++) {
			// console.log(JSON.stringify(data, null, 2 ));
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
	})
};

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",");
    process.argv[2] = data[0];
    process.argv[3] = data[1];

    console.log (process.argv[2] + " - " + process.argv[3]);

  });