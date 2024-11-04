function objectToQueryParams(obj) {
    return (
      '?' +
      Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) //k = key, v = value
        .join('&')
    );
  }

function getID() {
    return "TESTING"
  }

function doGet(e) {
  //var response = UrlFetchApp.fetch("https://huggingface.co/dhiraj122/vivaai");
  //return HtmlService.createHtmlOutput(response)
  var app = HtmlService.createHtmlOutputFromFile("new_index")
  //const id = getID() //get stuff from the other project, it will interface similarly, no logging

  //var response = UrlFetchApp.fetch(ScriptApp.getService().getUrl(), smth)

  //return HtmlService.createHtmlOutput("<iframe src='https://go.boarddocs.com/vsba/loudoun/Board.nsf/files/BRQ3VQ08B7BB/$file/Academies%20of%20Loudoun%20Admissions%202020_072020.pdf' title='test' width='100%' height='500px'>")
  //Logger.log(e.parameter);
  return HtmlService.createHtmlOutputFromFile('new_index');
  //return HtmlService.createHtmlOutput("")
}

var messages = [{"role": "system", "content": "Follow what the user says."}] //changing this when the program actually works
const url = "https://api.openai.com/v1/chat/completions";
const apiKey = "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" //add later

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

function testAPICaller() {
  return makeAPICall_([{role: "user", content: "Say this is probably a test."}])
}

function apiTest() {
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
  //var parsedResponse = JSON.parse()
  
  var data = JSON.parse(response.getContentText());
  Logger.log("raw response: " + data);
  var parsedResponse = data.choices[0].message.content;
  Logger.log("parsed response: " + parsedResponse);
  return parsedResponse;

}

function doPost(e) {
  return makeAPICall_(e.postData.message_history)
}
