var rel_eval = function(tweet) {
	//Time
	created_at = new Date(tweet.created_at);
	cur_time = new Date();
	life_time = cur_time - created_at;

	//Likes
	retwets = tweet.retweet_count;
	favs = tweet.favorite_count;

	//Actual rel index calculation
	f = (1 - life_time/86400000) * (favs + retwets)
	if (f > 0) {
		return Math.round(f)
	} 
	else {
		return 0;
	}
};

module.exports.rel_eval = rel_eval;