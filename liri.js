var sourceFile = require('./keys.js'); //links or 'requires' this JS file
// console.log(sourceFile.twitterKeys.consumer_key); // this is how I call the keys from the key.js file
//REQUIRED NODE MODULES
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs"); //required to read files


var spotify = new Spotify({
  id: 'ecf38321fbbc4324940145467aa1e13a',
  secret: '3acbb3ea7bd549caba249f3663c84f70'
});


//SPOTIFY SEARCHspotify
var spotifyArg = process.argv[2];
var spotifyQuery = process.argv.slice(3).join(' ');
// var spotifyQuery = process.argv.slice(3).reduce(function(sum, currentVal){
// 	return sum + " " + currentVal;
// }); //takes everything entered from index 3 and on, then smashes it together to one item

console.log("Query: " + spotifyQuery);

if (spotifyQuery === ' ') {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log("I'm here " + data);
	});
}

if (spotifyArg === 'spotify-this-song' && spotifyQuery != '') {

	spotify.search({ type: 'track', query: spotifyQuery}, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data, null, 2));
		for (var i = 0; i < data.tracks.items.length; i++) {
			// console.log(JSON.stringify(data, null, 2 ));
			// // Artist(s)
			console.log("Artists: " + JSON.stringify(data.tracks.items[i].artists[0].name, null, 2)); 
			// Song's name
			console.log("Song name: " + JSON.stringify(data.tracks.items[i].name, null, 2)); 
			// Preview link of the song from Spotify
			console.log("Preview Link: " + JSON.stringify(data.tracks.items[i].external_urls.spotify, null, 2)); //MOST PREVIEW LINKS WERE NULL, SO I HAD TO USE THE LINK THE THE EXTERNAL PLAYER
			// Album that the song is from
			console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name, null, 2)); 
			console.log('===============================================================');
		};

	})
};