# LIRI Node App
__LIRI is a Language Interpretation and Recognition Interface and a command line node app that takes in parameters and gives you back data.__

### How it Works

To begin, type `node` and one of the following commands:
 - my-tweets
 - spotify-this-song
 - movie-this
 - do-what-it-says

### What Each Command Does

`node my-tweets` will display the last ten Tweets from a dummy Twitter account. You didn't think I'd put a real one here, did you?  :wink:

`node liri.js spotify-this-song '<song name here>'` will show the following information about the song in your terminal/bash window:
 - Artist(s)
 - The song's name
 - A preview link of the song from Spotify
 - The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

`node liri.js movie-this <movie name here>` will output the following information to your terminal/bash window:
 - Title of the movie
 - Year the movie came out
 - IMDB Rating of the movie
 - Country where the movie was produced
 - Language of the movie
 - Plot of the movie
 - Actors in the movie
 - Rotten Tomatoes URL

`node liri.js do-what-it-says` will take the text inside of random.txt and then use it to call one of LIRI's commands.
