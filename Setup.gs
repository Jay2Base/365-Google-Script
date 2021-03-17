function setActionProperties() {
var actionProperties = 
{ "check": 
  { 
  "requiredArgsCount": 0, 
  "helpText": [{ "text": "Type /feedb check" }], 
  "args": { "0": [] }, 
  "execute": "getLastFive" ,
  "vars": "(from)"
  }, 
  "send": 
  { 
    "requiredArgsCount": 1, 
    "helpText": [{ "text": "Type /feedb send feedback for <@someone> to send feedback" }], 
    "args": { "0": ["^(?!.*@\\w.*@\\w).*@\\w.*", "Sorry at this time you can only send feedback to one person at a time. Please check"] }, 
    "execute": "writeFeedback", 
    "vars": "(args, from)"
  } ,
    "anon": 
  { 
    "requiredArgsCount": 1, 
    "helpText": [{ "text": "Type /feedb send feedback for <@someone> to send feedback" }], 
    "args": { "0": ["^(?!.*@\\w.*@\\w).*@\\w.*", "Sorry at this time you can only send feedback to one person at a time. Please check"] }, 
    "execute": "writeFeedbackAnon", 
    "vars": "(args, from, \"Anon\")"
  } ,
   "score": 
  { 
  "requiredArgsCount": 0, 
  "helpText": [{ "text": "Type /feedb score" }], 
  "args": { "0": [] }, 
  "execute": "getScore" ,
  "vars": "(from)"
  },
     "help": 
  { 
  "requiredArgsCount": 0, 
  "helpText": [{ "text": "Type /feedb help" }], 
  "args": { "0": [] }, 
  "execute": "getHelp" ,
  "vars": "()"
  }
};

   if(PropertiesService.getScriptProperties().getProperty("actionsProp"))
    {
      PropertiesService.getScriptProperties().deleteProperty("actionsProp");
    }
   
   PropertiesService.getScriptProperties().setProperty("actionsProp", JSON.stringify(actionProperties));
console.info(PropertiesService.getScriptProperties().getProperty("actionsProp"));
}