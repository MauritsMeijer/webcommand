var test = require("tap").test;
var commandServer= require('../index');
var stream = require('event-stream');

test("make sure fmt works", function (t) {
	var commandServer=createCommandServer();
	var iStream= stream.through();
	var oStream= stream.through();
	var err=false;
	var cStream=commandServer.webCommand('fmt',['-c'],iStream, oStream);
	cStream.on('error', function(error){
		err=true;
	});
	cStream.on('end', function(){
	    t.equal(err,false, "no error was emited");
	    t.end();
	});
	
	iStream.write('boo,*,23\nfoo,*,32\npoo,*,3\ndoo,*,2');
	iStream.write(null);
});

test("make sure fmt doesn't work with the wrong parameters", function (t) {
	var commandServer=createCommandServer();
	var iStream= stream.through();
	var oStream= stream.through();
	var err=false;
	var cStream=commandServer.webCommand('fmt',['-t', ',', '-klalala', '3', '-n', '-r'  ],iStream, oStream);
	cStream.on('error', function(error){
		err=true;
	});
	cStream.on('end', function(){
	    t.equal(err,true, "error was emited");
	    t.end();
	});

	iStream.write('boo,*,23\nfoo,*,32\npoo,*,3\ndoo,*,2');
	iStream.write(null);
});