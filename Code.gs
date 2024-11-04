function doGet(e) {
  //var app = HtmlService.createHtmlOutputFromFile("new_index")
  return HtmlService.createHtmlOutputFromFile('new_index'); //loads up the main index page
}

var system_prompt = "You are Aetherial AI, a helpful assistant utilizing OpenAI's gpt-4o-mini model to assist the user with whatever they ask. You are the first AI to utilize Google Apps Script as a backend for interfacing with the OpenAI API. Some advantages to using Google Apps Script over traditional systems are being able to covertly hide programs on Google Drive, reduce chances of having programs being blocked by schools or organizations, and allow programs to be easily spread on Google Drive, among others."
var messages = [{"role": "system", "content": system_prompt}]
const url = "https://api.openai.com/v1/chat/completions";
const apiKey = "" //add later

function makeAPICall_(message_history) {
  var message_history = message_history
  if (!message_history) {
    return "No message provided."
  }
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey,
  };

  var requestData = {
          model: "gpt-4o-mini",
          messages: message_history,
          temperature: 0.7,
          max_completion_tokens: 2048,

        };

  var options = { "method": "POST",
                  "headers": headers,
                  "payload" : JSON.stringify(requestData),
  };

  var response = UrlFetchApp.fetch(url, options);

  var data = JSON.parse(response.getContentText());
  Logger.log("raw response: " + data);
  var parsedResponse = data.choices[0].message.content;
  Logger.log("parsed response: " + parsedResponse);
  return parsedResponse;
}

function publicAPICaller(message_history) {
  return makeAPICall_(message_history)
}

function testAPICaller() { //this is for seeing if there's a bug with the publicAPICaller function
  return makeAPICall_([{role: "user", content: "Say this is probably a test."}])
}

function apiTest() { //this just tests if the api key works
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey,
  };

  const requestData = {
          model: "gpt-4o-mini",
          messages: [{"role": "user", "content": "Say this is a test."}],
          temperature: 0,
          max_completion_tokens: 10,
        };

  var response = UrlFetchApp.fetch(url, { "method": "POST",
                  "headers": headers,
                  "payload" : JSON.stringify(requestData),});
  
  var data = JSON.parse(response.getContentText());
  Logger.log("raw response: " + data);
  var parsedResponse = data.choices[0].message.content;
  Logger.log("parsed response: " + parsedResponse);
  return parsedResponse;

}

function doPost(e) {
  return makeAPICall_(e.postData.message_history)
}

//function getID() {
//    return "TESTING"
//  }
