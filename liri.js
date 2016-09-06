var keys = require;
var command = process.argv[2];
var fs = require('fs');
var Twitter = require('twitter');
var keys = require ("./keys.js");
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret,
});

if (command == "my-tweets") {
	var params = {screen_name: 'ShaanObney', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("Some clown tweeted: " +tweets[i].text+ " on " +tweets[i].created_at);
			}
		}
	});
}

if (command == "spotify-this-song") {
	var songName = process.argv[3];
	var spotify = require('spotify');
	
	if (songName === undefined) {
		songName = "The Sign";
	}
	
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	if ( err ) {
    		console.log('Error occurred: ' + err);
    		return;
    	}

    	var items = data.tracks.items;

    	for (var i = 0; i < items.length; i++) {
    		console.log("Song Name: "+items[i].name);

    		for (var j = 0; j < items[i].artists.length; j++) {
		    	console.log("Artist: "+items[i].artists[j].name);
		      	console.log("Album: "+items[i].album.name);
		      	console.log("Link: "+items[i].preview_url);
	      }
	  }
	});
}

if (command == "movie-this") {
	var movie = process.argv[3];
	var request = require('request');
	request('http://www.omdbapi.com/?t='+ movie +'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
	if (!error && response.statusCode == 200) {
	   var json = JSON.parse(body);
	   console.log("Title: "+json.Title);
	   console.log("Year: "+json.Year)
	   console.log("Imbd rating: "+json.imdbRating);
	   console.log("Country: "+json.Country);
	   console.log("Language: "+json.Language);
	   console.log("Plot: "+json.Plot);
	   console.log("Actors: "+json.Actors);
	   console.log("Rotten Tomatoes: "+json.tomatoRating);
	   console.log("Rotten Tomatoes URL: "+json.tomatoURL);
	}
 });
}

if (command == "do-what-it-says") {
	var spotify = require('spotify');
	var media = fs.readFileSync('random.txt' , "utf8");
	spotify.search({ type: 'track', query: media }, function(err, data){
		if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	
	var items = data.tracks.items;
    for (var i = 0; i < items.length; i++) {
    	console.log("Song Name: "+items[i].name);
    	for (var j = 0; j < items[i].artists.length; j++) {
	    	console.log("Artist: "+items[i].artists[j].name);
	      	console.log("Album: "+items[i].album.name);
	      	console.log("Link: "+items[i].preview_url);
	      }
	  }
	});
}