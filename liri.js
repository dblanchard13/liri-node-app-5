nodeArgs = process.argv;

var songsName = "";
var moviesName = "";


function myTweets() {
	var keys = require('./keys.js');

	var Twitter = require('twitter');

	var client = new Twitter ({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	})
      client.get('statuses/user_timeline', function(error, tweets, response) {

		console.log(tweets)

		if(error) throw error;

		for (i=0; i<20; i++)
        {
            
            returned += '\n'+tweets[i].user.screen_name;
            returned += '\n'+tweets[i].text;
            returned += '\n'+tweets[i].created_at;
            returned += '\r\n';
        }
        console.log(returned);
		  
	   
	  });
}

	
function myMovie() {
	var request = require('request');
	
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
		moviesName = moviesName + "+" + nodeArgs[i];
		} else {
			moviesName += nodeArgs[i]; 
		}
	}

	request('http://www.omdbapi.com/?t=' + moviesName, function (error, response, body) {
 		if (error) {
 			console.log(error);
 		} else if (moviesName === "") {
 		
		console.log('If you haven\'t watched "Mr. Nobody," then http:www.imdb.com/title/tt0485947/');
		console.log("It is on Netflix!");
		
		} else {
 		
 		console.log("Title: " + JSON.parse(body).Title);
 		console.log("Year: " + JSON.parse(body).Year);
 		console.log("IMDB Rating: " + JSON.parse(body).IMDBRating);
 		console.log("Country: " + JSON.parse(body).Country);
 		console.log("Language: " + JSON.parse(body).Language );
 		console.log("Plot: " + JSON.parse(body).Plot);
 		console.log("Actors: " + JSON.parse(body).Actors);
 		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
 		console.log("Rotten Tomatoes URL: " + JSON.parse(body).Rotten Tomatoes URL);
 		
 		}
	});	
}

//  Spotify //
function mySong() {
	var spotify = require('spotify');
	
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			songsName = songsName + "+" + nodeArgs[i];
		} else {
			songsName += nodeArgs[i]; 
		}
	}

	
	if (songName === "") {
		spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
			if ( err ) {
		        console.log('Error' + err);
		        return;
	        } else {
	    	
	 		console.log("Artist(s): " + data.artists[0].name);
	 		console.log("Song Name: " + data.name);
	 		console.log("Spotify Preview Link: " + data.preview_url);
	 		console.log("From the album: " + data.album.name);
	 		
	 		}	
		});
	
	} else {
		spotify.search({ type: 'track', query: songName, }, function(err, data) {
		    if ( err ) {
		        console.log('Error' + err);
		        return;
		   	} else {
		 	
		 	console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
		 	console.log("The Song's Name: " + data.tracks.items[0].name);
		 	console.log("A Preview Link of Spotify Song: " + data.tracks.items[0].preview_url);
		 	console.log("The album that the song is from: " + data.tracks.items[0].album.name);
		 	
		 	}
		});
	}
}
	
// do-what-it-says//
function getText() {
 	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {
  	
  	var dataArray = data.split(",");

		if (dataArray[0] === "spotify-this-song") {
		  	songsName = dataArray[1];
		  	song();
	  	} else if (dataArray[0] === "movie-this") {
	  		moviesName = dataArray[1];
	  		movie();
	  	} else if (dataArray[0] === "my-tweets") {
	  		tweets();
	  	}
  	});
}

if (cmd === "spotify-this-song") {
	song();
} else if (cmd === "my-tweets") {
	tweets();
} else if (cmd === "movie-this") {
	movie();
} else if (cmd === "do-what-it-says") {
	getText();
}
