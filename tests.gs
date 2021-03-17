function TestDoPost(){

var string1 = "token=9i9Sni8XRy55Pf47AQTLFM9I&team_id=T7YTC31R6&team_domain=signol-workspace&channel_id=D014LETDQMV&channel_name=directmessage&user_id=U015DRKAJTB&user_name=jay&command=";
var string2 = "&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT7YTC31R6%2F1470783313074%2FVDFmhCeVb6aHKFQyhR9D4TBn";

var goodCommand ="%2Ffeedb&text=send+%40jay+is+great+send+him+some+flowers";
var missingAction = "%2Ffeedb&text=%40jay+is+great+send+him+some+flowers";
var missingUser = "%2Ffeedb&text=send+is+great+send+him+some+flowers";
var getFive = "%2Ffeedb&text=check";
var getScore = "%2Ffeedb&text=score";
var getHelp = "%2Ffeedb&text=help";
var anonomous = "%2Ffeedb&text=anon+%40jay+is+great+send+him+some+flowers";

var cmd = [getFive ];


  for (var i = 0; i < cmd.length; i++){
 
 var e = {
   "postData": {
     "contents": string1 + cmd[i] + string2
     }
   };
var t = cmd[i];
console.log(t)
   doPost(e)
 
 };


}

function TestwriteFeedbackAsync(){
  var args = "@jay test";
  var from = "Divya";
  
  writeFeedbackAsync(args,from)
}
  
  function testTrigger(){

  var args = "Jay is a hell of a guy";
  var from = "@chris";


  writeFeedback(args, from)


}

function testLastFive(){
var from = "jay";

var r = getLastFive(from);
console.info(r);
}

function testGetScore(){
var from = "jay";

var s = getScore(from);
console.info(s);
}


function testHelp(){

var h = getHelp();
console.info(h);

}

