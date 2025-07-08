// Weather Application (Assignment -11)
// Author: SREE HARSHA BATHULA
// Date:  04-11-2024
// Description: This program will display the weather of a location.
// It will take the location name as input from the user.
// It will then display the weather of the city or state or country.
// Weather images are stored in the staticresources Folder and accessing them here

import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/WeatherController.getWeather'; // importing getWeather method from the weatherController class
import SUNNY_IMAGE from '@salesforce/resourceUrl/sunny_image'; //importing images from the staticresources folder
import CLOUDY_IMAGE from '@salesforce/resourceUrl/cloudy_image';
import RAINY_IMAGE from '@salesforce/resourceUrl/rainy_image';
import CLEARSKY_IMAGE from '@salesforce/resourceUrl/clearsky_image';

export default class WeatherApp extends LightningElement {
    @track cityName = '';
    @track weatherData = {};
    @track image = '';
    @track weatherDescription = ''; // New variable for weather description  (light rain or clear sky and soon)

    handleCityInput(event) {
        this.cityName = event.target.value;
        this.weatherData = {};
        this.image = '';
        this.weatherDescription = '';
    }

    async searchWeather() {
        try {
            const data = await getWeather({ cityName: this.cityName }); // calling getWeather method by passing location
            this.weatherData = data; //  storing the data in weatherData variable to access it for temperature ,humidity and soon in template
            console.log('data:  ', data);
            
            this.weatherDescription = data.weather[0].description;//storing the weather description
            console.log(this.weatherDescription);

            
            const weatherMain = data.weather[0].main;  // getting the main weather condition
            console.log(weatherMain); 

            // display image based on weather condition
            if (weatherMain === 'Clear') {  
                this.image = SUNNY_IMAGE;
            } else if (weatherMain === 'Clouds') {
                this.image = CLOUDY_IMAGE;
            } else if (weatherMain === 'Rain') {
                this.image = RAINY_IMAGE;
            } else if (weatherMain === 'Clear') {
                this.image = CLEARSKY_IMAGE;
            }
        
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
}
