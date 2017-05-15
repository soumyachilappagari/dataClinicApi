


module.exports.collectFullPostCodeInformation = function(oraganisationList,fullPostCode){

	
	var matchedOrganisation = [];

	 matchedOrganisation = oraganisationList.filter(function (eachOrganisation) {

		return eachOrganisation.postcode === fullPostCode;
	});


	 return matchedOrganisation.map(function (eachOrganisation) {

	 	return {
	 		"organisation_id" : eachOrganisation.organisation_id,
	 		"name"			  : eachOrganisation.name
	 	};

	 });

};



module.exports.countNumberOfPartialPostCodes = function(oraganisationList){

	var partialPostCodesData = {};

	oraganisationList.forEach(function (eachOrganisation) {
		
		var partialPostCode = eachOrganisation.partial_postcode;

		partialPostCodesData[partialPostCode] = (partialPostCodesData[partialPostCode] || 0) + 1;
	});

	return partialPostCodesData;

}


