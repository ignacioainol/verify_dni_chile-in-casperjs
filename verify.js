var casper = require('casper').create({
	clientScripts: ['jquery.min.js']
});
//utils para setear argumentos
var utils = require("utils");
var url = "https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml";

casper.start(url,function(){
    this.echo(this.getTitle());
});

casper.waitForResource(url,function() {
    this.fillSelectors('#form', {
        //'input[name="form:run"]' : '17899729-7',
        'input[name="form:run"]' : casper.cli.args[0],
        'select[name="form:selectDocType"]':'CEDULA',
        //'input[name="form:docNumber"]':'514998583'
        'input[name="form:docNumber"]':casper.cli.args[1]
    }, true);
});

casper.then(function(){
	this.click('a.volver');
});

casper.wait(4000,function(){
	casper.capture("verify.png",{top:0,left:0,width:1200,height:720});
});

casper.then(function(){
	var result = casper.evaluate(function(){
		return $('.setWidthOfSecondColumn').text();
	});	
	 	if(result){
	 		this.echo(result);
	 	}
		//this.echo(result);	
});

casper.run();