/*
We will create a client and server interface so that the api key does not get exposed
The server will return a response when a POST request is sent from the client
The server may be able to act as a client in early stages, as the "makeAPICall" function that directly calls the api is called as of 11:41 AM on Nov. 4. However, this function DIRECTLY calls the api. What we want to do is forward the request to the client so they do not access the api key, because that is STUPID

*/