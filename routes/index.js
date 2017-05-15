var express = require('express');
var router = express.Router();
var request = require('request');

var util = require('./../helper/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/clinics/postcode/:postcode', function(req,res,next){

	var fullPostCode = req.params.postcode; 

	var postcode = req.params.postcode.split(' ')[0];
	
	request.get('https://data.gov.uk/data/api/service/health/clinics/partial_postcode?partial_postcode='+postcode,
		function(error,response,body){


			if(error) {

				res.json({
					"message" : "We are sorry! There is some technical difficulty. Please try again later!"
				});	
			}


			if(JSON.parse(body).success){
	
				var responseArray = JSON.parse(body).result;

				var responseObject = {
					results: []
				};

				responseObject.results = util.collectFullPostCodeInformation(responseArray,fullPostCode);
			
				res.json(responseObject);	
			}else{
				res.json({
					"message" : "We are sorry! There is some technical difficulty. Please try again later!"
				});		
			}

	});

});


router.get('/clinics/city/:name',function(req,res){

	cityName = req.params.name;

	cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

	request.get('https://data.gov.uk/data/api/service/health/clinics?city='+cityName,
		function(error,response,body){

			if(error) {

				res.send({
					"message" : "We are sorry! There is some technical difficulty. Please try again later!"
				});	
			}


			if(JSON.parse(body).success){
				var responseArray = JSON.parse(body).result;

				var responseObject = {
					results: {}
				};

			responseObject.results = util.countNumberOfPartialPostCodes(responseArray);	

			res.json(responseObject);	
			} else{
				res.json({
					"message" : "We are sorry! There is some technical difficulty. Please try again later!"
				});			
			}

			
		});

});



module.exports = router;
