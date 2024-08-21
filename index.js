const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const weatherCard=document.querySelector(".weatherCard");
const apikey="8eef1c282adaf6375ed428fcf7532b1b"
weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityInput.value
    if(city){
        try{
            const weatherData=await  getWeatherData(city)
            displayWeatherInfo(weatherData)
            
        }catch(error){
            console.log(error);
            displayError(error)
        }
    }else{
        displayError("please enter a city")
    }


});
async function getWeatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiurl);
   if(!response.ok){
    throw new Error("could not fetch weather Api");
   }
   return await response.json();

}
function displayWeatherInfo(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,icon}]}=data;

    weatherCard.textContent="";
    weatherCard.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const desDisplay=document.createElement("p");
    const weatherEm=document.createElement("img");


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desDisplay.classList.add("desDisplay");
    weatherEm.classList.add("weatherEm");


    cityDisplay.textContent=city;
    tempDisplay.textContent=` ${(temp-273).toFixed(1)}°C`
    humidityDisplay.textContent=`Humidity : ${humidity}%`;;
    desDisplay.textContent=`Description : ${description}`;
    weatherEm.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;


    weatherCard.appendChild(cityDisplay);
    weatherCard.appendChild(tempDisplay);
    weatherCard.appendChild(humidityDisplay);
    weatherCard.appendChild(desDisplay);
    weatherCard.appendChild(weatherEm)
    
    
       

}
function displayError(message){
    const erroDisplay=document.createElement('p');
    erroDisplay.textContent=message;
    erroDisplay.classList.add("erroDisplay")
    weatherCard.textContent="";
    weatherCard.style.display="flex"
    weatherCard.appendChild(erroDisplay);
}