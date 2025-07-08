public with sharing class WeatherController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getWeather(String cityName) {
       //  Weather API URL with the access key
        String apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=56dd0ceca2158ff118de13582bc283c0' ;

        HttpRequest req = new HttpRequest(); //  Create a new HttpRequest object
        req.setEndpoint(apiUrl); //  Setting the endpoint URL
        req.setMethod('GET'); //  Setting the request method to GET
        req.setHeader('Content-Type', 'application/json'); //  Setting the request header to JSON

        Http http = new Http(); //  Create a new Http object
        HttpResponse res = http.send(req); //  Sending the request and getting the response

        if (res.getStatusCode() == 200) { // if  the status code is 200 (success)
            return (Map<String, Object>) JSON.deserializeUntyped(res.getBody());//  Deserializing the JSON response
        } else {
            throw new CalloutException('Error fetching weather data: ' + res.getBody());  //   If the status code is not 200, throw an exception
        }
    }
}
