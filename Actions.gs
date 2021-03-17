

  ///////////////////////////

  //first create the trigget to run in 5 seconds
function writeFeedback(_args, _from) {
 var trigger = ScriptApp.newTrigger("exampleTriggerFunction").timeBased()
    .after(1 * 1000)
    .create();

  setupTriggerArguments(trigger, [_args,_from, false], false);
  
  return "Thanks, your feedback has been submitted, have a nice day";
}

  function writeFeedbackAnon(_args, _from) {
 var trigger = ScriptApp.newTrigger("exampleTriggerFunction").timeBased()
    .after(1 * 1000)
    .create();

  setupTriggerArguments(trigger, [_args,_from, true], false);
  
  return "Thanks, your feedback has been submitted, have a nice day";
}


//add the arguments to the script properties
function setupTriggerArguments(trigger, functionArguments, recurring) {
  var triggerUid = trigger.getUniqueId();
  var triggerData = {};
  triggerData["recurring"] = recurring;
  triggerData["triggerArgs"] = functionArguments;

  PropertiesService.getScriptProperties().setProperty(triggerUid, JSON.stringify(triggerData));
}

function getLastFive(_from) {
  
 var sheet = SpreadsheetApp.getActive().getSheetByName("Last 5"); 
 var r = sheet.getDataRange();

 var fiveArray = r.getValues();

for(var i = 0; i<=fiveArray[0].length; i++ ){

  if(fiveArray[0][i] == _from){
    var lastFive = [];
    for (var y = 0; y<=5; y++){
lastFive.push(fiveArray[y][i]);   
}
 console.info(lastFive);   
    return lastFive.join("\n");
    break;
  }
  
}
return "Hmm.... cant find you on the list, are you new?";
}

function getScore(_from){
var sheet = SpreadsheetApp.getActive().getSheetByName("score"); 
 var r = sheet.getDataRange();

 var scoreArray = r.getValues();

 for(var i = 0; i<=scoreArray[0].length; i++ ){

  if(scoreArray[1][i] == _from){
    var score = scoreArray[2][i];
    return  "Your current score is " + score + "  ...well done"; 
    break;
  } 
  }
   return "Hmm.... cant find you on the list, are you new?";
 }

function getHelp(){

var _help = "365ThreeSixty (c) is a microfeedback tool that enables you to send and recieve small, regular bits of feedback using Slack. \n \n" +
"Each piece of feedback is given a score based on stuff including the content of the feedback, who sent it and when, creating an objective view of your overall feedback \n \n"+
"To send some feedback type `/360 send <your feedback>` . Make sure to use the persons @tag in your feedback. At present you can only provide feedback to one person at a time \n \n"+
"To send anonomous feedback type '/360 anon <your feedback>'"
"To see your last 5 pieces of feedback type `/360 check` \n\n"+
"and to see your score, type `/360 score`";

return _help;

}

