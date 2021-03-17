// Sets API key for accessing Cloud Natural Language API.
var myApiKey = "AIzaSyCidrhoYLfZ_ZyCn5FcsWByunUYBY6oUFM";


function getSentiment(feedback){

  
  var resp = retrieveEntitySentiment(feedback);
          
       
  var sentiment = (resp.documentSentiment.score *2)-1;
  

   
return sentiment;
}


function retrieveEntitySentiment(line) {

  var apiKey = myApiKey;
  var apiEndpoint = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + apiKey;
  // Creates a JSON request, with text string, language, type and encoding
  var nlData = {
    document: {
      language: 'en-us',
      type: 'PLAIN_TEXT',
      content: line
    },
    encodingType: 'UTF8'
  };
  // Packages all of the options and the data together for the API call.
  var nlOptions = {
    method : 'post',
    contentType: 'application/json',  
    payload : JSON.stringify(nlData)
  };
  // Makes the API call.
  var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
  console.log(JSON.parse(response));
  return JSON.parse(response);
};