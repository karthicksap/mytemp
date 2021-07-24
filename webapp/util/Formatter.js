sap.ui.define([

], function() {

	return {

		convertStatus: function(sValue) {
			
			switch(sValue){
				case "Available":
					return "Success";
				case "Out of Stock":
					return "Error";
				case "Discontinued":
					return "Warning";
			}
		
		}

	};

});