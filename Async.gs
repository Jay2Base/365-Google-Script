//this runs on the trigger, returns the properties as an array
function exampleTriggerFunction(event) {
  var functionArguments = handleTriggered(event.triggerUid);
  console.info(functionArguments.type);
  
  writeFeedbackAsync(...functionArguments);
  
  console.info("Function arguments: %s", functionArguments);

//pass agrymnts to other function

}

//part that retieves the properties
function handleTriggered(triggerUid) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var triggerData = JSON.parse(scriptProperties.getProperty(triggerUid));

  if (!triggerData["recurring"]) {
    deleteTriggerByUid(triggerUid);
  }

  return triggerData["triggerArgs"];
}

//part that deletes the trigger

function deleteTriggerByUid(triggerUid) {
  if (!ScriptApp.getProjectTriggers().some(function (trigger) {
    if (trigger.getUniqueId() === triggerUid) {
      ScriptApp.deleteTrigger(trigger);
      return true;
    }

    return false;
  })) {
    console.error("Could not find trigger with id '%s'", triggerUid);
  }

  deleteTriggerArguments(triggerUid);
}

//delete the properties
function deleteTriggerArguments(triggerUid) {
  PropertiesService.getScriptProperties().deleteProperty(triggerUid);
}  

///////////////////////////

function writeFeedbackAsync(args, from, anon){
 //extract from, to and text from message
  var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();

    var someFormattedDate = mm + '/'+ dd + '/'+ y;  
   
  var to = getTo(args);
  
  var from = from;
  if(anon == true){var isAnon = "Anon"};
  var text = args.replace(/\+/g," ");
  var sentiment = getSentiment(text)
 
  
  //write feedback to sheet
  var valuesToWrite = [];
  

  
  
  valuesToWrite[0] = someFormattedDate;
  valuesToWrite[1] = from;
  valuesToWrite[2] = to;
  valuesToWrite[3] = isAnon;
  valuesToWrite[4] = text;
  valuesToWrite[5] = sentiment;
    console.info(valuesToWrite);

  var sheet = SpreadsheetApp.getActive().getSheetByName("feedback");
  var lastRow = sheet.getDataRange().getValues().length+1;
  console.info("row" + lastRow)
  var writeTo = sheet.getRange(lastRow,1,1,6);
  
      writeTo.setValues([valuesToWrite]);
  

 
  var rngToCopy = sheet.getRange(lastRow,7,1,1).offset(-1, 0, 1, 10);
  var rngToPaste = sheet.getRange(lastRow,7,1,10);
 
  rngToCopy.copyTo(rngToPaste, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  


}
