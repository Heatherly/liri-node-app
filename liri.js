var sourceFile = require('./keys.js'); //links or 'requires' this JS file
// console.log(sourceFile.twitterKeys.consumer_key); // this is how I call the keys from the key.js file
//REQUIRED NODE MODULES
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// var fs = require("fs"); //required to read files - NOT SURE I NEED THIS NOW

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
	
		spotify.search({ type: 'track', query: 'The Sign'}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data, null, 2));
			// // Artist(s)
			console.log("Artists: " + JSON.stringify(data.tracks.items[0].artists[0].name)); 
			// Song's name
			console.log("Song name: " + JSON.stringify(data.tracks.items[0].name)); 
			// Preview link of the song from Spotify
			console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].external_urls.spotify)); //MOST PREVIEW LINKS WERE NULL, SO I HAD TO USE THE LINK THE THE EXTERNAL PLAYER
			// Album that the song is from
			console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name)); 
			console.log('===============================================================');
		});
	};

if (nodeArg === 'spotify-this-song' && nodeQuery != '') {

	spotify.search({ type: 'track', query: nodeQuery}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data, null, 2));
		for (var i = 0; i < data.tracks.items.length; i++) {
			// console.log(JSON.stringify(data, null, 2 ));
			// // Artist(s)
			console.log("Artists: " + JSON.stringify(data.tracks.items[i].artists[0].name)); 
			// Song's name
			console.log("Song name: " + JSON.stringify(data.tracks.items[i].name)); 
			// Preview link of the song from Spotify
			console.log("Preview Link: " + JSON.stringify(data.tracks.items[i].external_urls.spotify)); //MOST PREVIEW LINKS WERE NULL, SO I HAD TO USE THE LINK THE THE EXTERNAL PLAYER
			// Album that the song is from
			console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name)); 
			console.log('===============================================================');
		};

	})
};


			// READING FROM FILE _ NOT USING AT THE MOMENT
			// fs.readFile("random.txt", "utf8", function(error, data) {
			//   if (error) {
			//     return console.log(error);
			//   }

			//   // We will then print the contents of data
			//   console.log("I'm here " + data);
			// });
