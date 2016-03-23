var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var config = require('./config');

var GITHUB_USERNAME = config.github.username;
var GITHUB_TOKEN = config.github.token;

if(process.argv.length < 3 || process.argv[2].split("/").length != 2) {
	console.error("\nPlease specify the full user/repo name, e.g.\n\tnode git-tag-archives.js user/repo\n");
	process.exit(0);
}

var repo_path = process.argv[2];
var repo_name = repo_path.split("/")[1];
var home_dir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var root_dir = home_dir + '/Downloads/' + repo_name;

mkdirp(root_dir,function(e){
	if(e) {
		console.error('Error creating directory: ' + err);
		process.exit(0);
	}
});

var options = {
	headers:{'user-agent':'Mozilla/5.0'},
	auth: GITHUB_USERNAME + ':' + GITHUB_TOKEN,
	host: 'api.github.com',
	path: '/repos/' + repo_path + '/tags'
};

callback = function(response) {
	var str = '';

	response.on('data', function (chunk) {
		str += chunk;
	});

	console.log('Fetching tags from ' + options.host + options.path + ' ...');
	response.on('end', function () {
		var releases = JSON.parse(str);
		releases.forEach(function(r){
			var zip_name = repo_name + '-' + r.name + '.zip';
			var file = fs.createWriteStream(root_dir + '/' + zip_name);
			options.host = 'codeload.github.com'
			options.path = '/' + repo_path + '/legacy.zip/' + r.name;
			console.log('Downloading from https://' + options.host + options.path + ' ...');
			https.request(options,function(zip_response){
				var newDir = root_dir + '/' + r.name;
				zip_response.on('data',function(data){
					file.write(data);
				});
			}).end();
		});
		console.log(releases.length + ' releases');
	});
};

https.request(options, callback).end();