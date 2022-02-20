    function replaceParamVal(url, paramName, replaceWith) {
        var re = eval('/('+ paramName+'=)([^&]*)/gi');
        var newUrl = url.replace(re, paramName + '=' + replaceWith);
        return newUrl;
    };
	//Portal Page Configuration
	//IP address of the CoovaChilli controller
    chilliController.host = getURLParameter('uamip');
    //UAM port to controller
    chilliController.port = getURLParameter('uamport');
	chilliController.uamService = getURLParameter('uamservice');
    //UAM secret between portal server and controller
    chilliController.uamSecret = "vhsFKxXW68Me7CZ";
    //Poll the gateway every interval, in seconds
    chilliController.interval = 30;
	//Assign portal page UI updating function
    chilliController.onUpdate = updateUI;
    //Assign portal page error handling function
    chilliController.onError = handleErrors;
    //get Client IP
    chilliController.client = getURLParameter('ip');

    //get L2 portal Status
    chilliController.isL2 = getURLParameter('isL2') == 1;
    // get location.search( url params)
    chilliController.search = location.search + "&bgcolor=FF9D12";
    //replace userurl
    var portalPageUrl = window.location.origin + window.location.pathname;
    chilliController.search = replaceParamVal(chilliController.search, "userurl", portalPageUrl);

    // when the reply is ready, this handler function is called
    function updateUI(cmd) {
        
        
        //chilliController.stateCodes: UNKNOWN:-1 , NOT_AUTH:0 , AUTH:1 , AUTH_PENDING:2 , AUTH_SPLASH:3
        if (chilliController.clientState === chilliController.stateCodes.AUTH) {
              alert('Exito! deberias de poder navegar')
        } 
    }

    // If an error occurs, this handler will be called instead
    function handleErrors(code) {
        console.log("handleErrors(code): The last contact with the Controller failed. Error code = " + code);
    }

	

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }

    // finally, get current state
    if(!chilliController.isL2){
        chilliController.refresh();
    }else{
        if(getURLParameter('auth')){
            if(getURLParameter('auth')==1)
                chilliController.clientState = chilliController.stateCodes.AUTH;
            else
                chilliController.clientState = chilliController.stateCodes.NOT_AUTH;
            updateUI(); 
        }
    }
