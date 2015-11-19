#! /usr/local/bin/node

var util = require('util'),
    fs = require('fs'),
    request = require('request'),
    argv = require('minimist')(process.argv.slice(2)),
    filePath = argv._[0],
    emojisUrl = "https://api.github.com/emojis",
    emojisOb = {},
    options = {
      url: emojisUrl,
      headers: {
        'User-Agent': 'Awesome-Octocat-App'
      }
    },
    re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/gim;

console.log('starting');

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var fCt = 0;
    var mCt = 0;
    emojisOb = JSON.parse(body);
    var fileNameAr = fs.readdirSync(filePath);
    for( var i=0; i<fileNameAr.length; i++ ){
        var curVal = filePath+fileNameAr[i];
        if( curVal.substr(-3) === '.md' ){
            var file = curVal;

            var contents = fs.readFileSync(file, 'utf-8');

            //fs.readFile(file, 'utf-8', function(err, contents){
                fCt++;
                if( re.test(contents) ){
                    console.log('match found in '+file);
                    mCt++;
                    var result = contents;
                    var foundMatch = false;
                    for( var prop in emojisOb ){
                        if( contents.indexOf(':'+prop+':') > -1 ){
                            foundMatch = true;
                            console.log('found a match for '+prop+' in '+file);
                            var nwRe = new RegExp(":"+prop+":","gi");
                            result = result.replace(nwRe, '<img src="'+'/images/emoji/'+prop+'.png'+'" alt="'+prop+'" style="height:auto;width:21px;">');
                        }
                    }
                    if(foundMatch){
                        fs.writeFile(file, result, 'utf-8', function(er){
                            if(er){
                                console.log('error: '+er);
                            }else{
                                console.log('writing file back with updates')
                            }
                        });
                    }
                }
            //});
        }
    }
    console.log('found '+fCt+' .md files and '+mCt+' emoji short name occurrences');
  }else{
    console.log('error getting '+emojisUrl+', response status code: '+response.statusCode);
    console.log('nothing to do, exiting');
  }
});

console.log('done');
