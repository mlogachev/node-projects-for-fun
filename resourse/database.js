var nano = require('nano')('http://localhost:5984');

var tweetz = nano.db.use('tweetz');

tweetz.update = function(obj, key, callback){
 	var db = this;
 	db.get(key, function (error, existing){ 
    	if(!error) obj._rev = existing._rev;
    	db.insert(obj, key, callback);
 	});
}

module.exports = tweetz;