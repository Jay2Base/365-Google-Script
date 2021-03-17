  var sheet = SpreadsheetApp.getActiveSheet();
  var peeps = sheet.getRange("users").getValues();
  var actions = sheet.getRange("actions").getValues();
  var sit = sheet.getRange("situation").getValues();
  var start = new Date(sheet.getRange("startDate").getValue());
  var actSent = sheet.getRange("actSent").getValues();
  var sitSent = sheet.getRange("sitSent").getValues();

  var noOfLines = sheet.getRange("howMany").getValue();

function generateFakeData() {
  
  //load the data

  
  
  var results = [];
  
  for(var i=1; i<=noOfLines; i++){
   
      var line = [];

    line.push(randomDate());
    line.push(randomPerson("f"));
    
    var to = randomPerson();
    line.push(to);
    
    var _randomAction = randomAction();
    var _randomSit = randomSit();
    var fb = "TEST: I Think " + to + " " + _randomAction.action + " " + _randomSit.situation;
    
    line.push(fb);
    
    var overallSentiment = (_randomAction.sentiment * _randomSit.sentiment * 2);
    line.push(overallSentiment)
    
    results.push(line)
         
    
  }
  
  var sheet = SpreadsheetApp.getActive().getSheetByName("generator");
  
  var writeTo = sheet.getRange(2,8,noOfLines,5);
  writeTo.setValues(results);
  writeTo.sort(8);

}

function randomDate(){
    var date = new Date(start);  
    date.setDate(date.getDate() + Math.floor((Math.random() * 365) ));

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();

    var someFormattedDate = mm + '/'+ dd + '/'+ y;   
    
    return someFormattedDate; 
}

function randomPerson(who){
    var noOfPeople = peeps.length;
    var rando = Math.floor((Math.random() * noOfPeople) )
    
    var guy = peeps[rando][0].toString();

    return guy;

}  


function randomAction(){
 
  var noOfActions = actions.length;
  var rando =  Math.floor((Math.random() * noOfActions) )
  
  var actionObj = {
    action: actions[rando][0].toString(),
    sentiment: actSent[rando][0]
  };
  return actionObj;
  
}
  
function randomSit(){
   var noOfSit = sit.length;
   var rando =  Math.floor((Math.random() * noOfSit) )
  
   var sitObj = {
     situation: sit[rando][0].toString(),
     sentiment: sitSent[rando][0]
   };
   
   return sitObj;
   
}

