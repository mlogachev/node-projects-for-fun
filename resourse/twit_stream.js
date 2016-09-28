var Twit = require('twit');
var credentials = require('./credentials');
var tweetz = require('./database');
var rel_eval = require('./super_math').rel_eval;

var t = new Twit(credentials);

var russian_alphabet = [
	'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й',
	'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у',
	'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч','Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я'
]

var stream = t.stream('statuses/filter', 
	{
		track: russian_alphabet, 
		lang : ['ru']
	});

stream.on('tweet', function(tweet) {

	if (tweet.hasOwnProperty('retweeted_status')) {
		origin = tweet.retweeted_status;
		cur_rel = rel_eval(origin);
		if (cur_rel > 100) {
			
			tweet = {
				text : origin.text,
				rel : 1/cur_rel
			};
			_id = origin.id_str;


			// tweetz.update(tweet, _id, function(err, res) {
			// 	if (err) {
			// 		if (err.statusCode == 409) {
			// 			console.log(err);
			// 		} else throw err;
			// 	}
			// })


			console.log(origin);
		}
	}
});

stream.on('error', function(error) {
	console.log(error.message);
	console.log(error.statusCode);
})

module.exports = stream;