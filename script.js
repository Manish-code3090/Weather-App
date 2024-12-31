
import{API_KEY} from './hide.js';
import{BASE_URL} from './hide.js';

// if you are clonening the project  then go on 'https://www.weatherapi.com/' and get your api key 
// and put it with base url 'http://api.weatherapi.com/v1'
// more detail read the documentation 

// gatting latitude and longitude 
async function getLocation() {
  if (navigator.geolocation) {
    return new Promise ((resolve,reject)=>{ 
  navigator.geolocation.getCurrentPosition(
       async (position) => {
            const myLatitude =  position.coords.latitude;
            const myLongitude = position.coords.longitude;   
          const weatherData = await WeatherRequest(myLatitude,myLongitude);
           // while wating for this to execute the outer function geolocation 
          // ran out so we have to wrap all this into a promiss
          resolve(weatherData);
         
        }
        
        )
    })
   
} else {
alert("try another brouser")
}
}

async function WeatherRequest(latiotude,longitude){
  try {
    const data = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${latiotude},${longitude}&aqi=yes`)
  if(!data.ok){
    throw new Error(`HTTP error! status: ${data.status}`);
    return;
  }else{
    const result = await data.json();
   const ProcessedData = await dataprocesser(result);
   return ProcessedData; 
  }
    
  } catch (error) {
    // alert("Open your location");
    console.error('error: ',error);
  }
}
 async function dataprocesser(data){
function InformationExtractor (country,state,city,temperature,winsdpeed,humidity,isday,icon){
this.Yourcountry=  country;
this.Yourstate= state;
this.Yourcity= city;
this.Yourtemperature=temperature;
this.Yourwindspeed = winsdpeed;
this.Yourhumidity=humidity;
this.DayOrNight = isday;
this.Youricon = icon;
}

let information =  new InformationExtractor(data.location.country,data.location.region,data.location.name,
  data.current.temp_c,data.current.wind_kph,data.current.humidity,data.current.is_day,data.current.
  condition.icon); 
  return information;
}
async function DomImplimentation(){

  let ProcessedData = await getLocation();

// DOM elements sellection 
let countryname= document.querySelector('.location');
let stateandcity = document.querySelector('#stateandcity');
let Temprature = document.querySelector('#Temprature');
let Windspeed = document.querySelector('#Windspeed');
let Humidity = document.querySelector('#Humidity');
let DayOrNight = document.querySelector('#Dayheading');
let bodyimage = document.querySelector('.Icon');
// manipulating DOM
countryname.innerHTML = `Your location: ${ProcessedData.Yourcountry}`;
stateandcity.innerHTML= `${ProcessedData.Yourstate}  (${ProcessedData.Yourcity})`;
Temprature.innerHTML = `Temperature (C) : ${ProcessedData.Yourtemperature}`;
Windspeed.innerHTML = `Wind spid (KPH) : ${ ProcessedData.Yourwindspeed}`;
Humidity.innerHTML= `Humidity : ${ProcessedData.Yourhumidity}`;
(ProcessedData.DayOrNight==0)? DayOrNight.innerHTML=`Night` : DayOrNight.innerHTML=`Day`;
bodyimage.src=`${ProcessedData.Youricon}`;

}
document.addEventListener("DOMContentLoaded", function () {
  myFunction();
  DomImplimentation();
});

function myFunction() {
  console.log("DOM is fully loaded");
}
