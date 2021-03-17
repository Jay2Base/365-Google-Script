
//web service function


 //for testing


function doPost(e){



  var req = null;
  try {
    
    var actionsString = PropertiesService.getScriptProperties().getProperty("actionsProp");
    var actions = JSON.parse(actionsString);
    req = queryStringToJSON(e.postData.contents);
    //req = queryStringToJSON(e);
    
   
   
    /* Extract the action from the request text */
    var action = getAction(req); //extracts first word of text -> the action word
  // console.info("1 got action");
    if (!actionIsValid(action, actions)) return quickResponse(composeResponse("Hi. You sent an invalid command")); //checks tos see if itsin the actions list vartiable
    //console.info("2 action valid check is done");
    /* Extract the action arguments from the request text */
    var args = getActionArgs(req, action);
     //console.info("3 got the action arguments");
    var from = getFrom(req);
     //console.info("4 got the from variable");
     //var to = getTo(args);
      //console.info("4b got the to variable");
      if (!actionParamIsValid(args, action, actions)){
        //console.info("5 action parameter check done");
        throw actions[action].args[0][1];
      }
  
    /* The result of the handler for any action is assigned to resText */
      var ex = actions[action].execute;
      var actionVars = actions[action].vars;
      var resText = eval(ex + actionVars);
    /* The response is composed and sent here */
    
    
    
    var res = composeResponse(resText);
     //console.info("7 got the result text");
       
    
    
    //console.info("Slack Message : " + resText);
    return quickResponse(res);
  } 
  
  catch (error) {
    //console.log(req);
    //var err = actions[action].helpText;
    if (!req || !req["text"]) {
      //console.info("no req");
      return quickResponse(composeResponse("Hey! You called me", actions[action].helpText[0].text));
      //return quickResponse(composeResponse(error));
    }
    
    var errorMessage = composeResponse(error, actions[action].helpText[0].text);
    //console.info("error message" + error);
    return quickResponse(errorMessage);
  }
}

//extract and validate data from payload

function queryStringToJSON (queryString) {
  if (!(queryString.indexOf("=") > -1)) return {};
  var queryStr = queryString.split("&");
  var queryJSON = {};
  queryStr.forEach(function(keyValue) {
    var keyValArr = keyValue.split("=");
    queryJSON[keyValArr[0]] = decodeURIComponent(keyValArr[1] || "");
  });
  return queryJSON;
}

function getAction(req) {
  var payload = req["text"];
  
  var wordCount = payload.indexOf("+");
  
  if(wordCount == -1) return payload;
  
  var action = payload.substr(0,wordCount);
  return action
}

function actionIsValid(action, actions) {
  var actionList = Object.keys(actions);
  if (actionList.indexOf(action) > -1) return true;
  return false;
}

function getActionArgs(req, action) {
  var payload = req["text"];
  var payloadObjects = payload.substr(payload.indexOf("+")+1);
  
  if (!payloadObjects[1]) {
    throw "Oops. You sent an incomplete command. Please type /listbot "+action+" for autocomplete options";
  }
  
  var args = payloadObjects;
  return args;
}

function actionParamIsValid(param, action, actions) {
  var patternString = actions[action].args[0][0];
  
  var pattern =  new RegExp(patternString);
  return pattern.test(param);
}

function getFrom(req){
  var From_id = req["user_id"];
  var u = SpreadsheetApp.getActive().getRangeByName("Tiers!userNames").getValues();
  
    for (var i = 0; i < u.length; i++){
      if(u[i][0] === From_id){
        var userName = u[i][1];
        return userName;
      }
    }
  
}

function getTo(args){
 
  var words = args.split("+");
  
  for (var i = 0; i < words.length; i++)
  {
    var initial = words[i].substring(0, 1);
    if (words[i].substring(0, 1) === "@")
    {
      var to = words[i];
      break;
    }
  }
    to = "@" + to.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");
    return to;
  }

//send a response

function composeResponse(text, attachments) {
  var res = {
    "response_type": "ephemeral",
    "text": text,
    "attachments": attachments || []
  };
  return res;
}

function quickResponse(res) {
  var resString = JSON.stringify(res);
  var JSONOutput = ContentService.createTextOutput(resString);
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput;
}




