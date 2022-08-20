var loc = document.getElementById("location");
var tempicon = document.getElementById("temp-icon");
var tempvalue=document.getElementById("temp-value");
var climate=document.getElementById("climate");
var iconfile;
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

// this below code is for any city in the world
searchButton.addEventListener('click',(e)=>{

       e.preventDefault();
       getWeather(searchInput.value);
       searchInput.value='';
 });

 const getWeather=async (city)=>{
      
        try{
            const response = await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a6a78ebf707692ce49b4579b91ef25f1`)
            const weatherData= await response.json();
            console.log(weatherData);
            const{name}=weatherData;
            const{feels_like}=weatherData.main;
            const{id,main}=weatherData.weather[0]; 
            loc.textContent=name;
            tempvalue.textContent=Math.round(feels_like-273);
            climate.textContent=main;
            if(id<300 && id>200)
                {
                    tempicon.src="./icons/thunderstorm.png";
                }
                else if(id<400 && id>300)
                {
                    tempicon.src="./icons/cloud.png";
                }
                else if(id<600 && id>500)
                {
                    tempicon.src="./icons/rain.png";
                }
                else if(id<700 && id>600)
                {
                    tempicon.src="./icons/snow.png";
                }
                else if(id<800 && id>700)
                {
                    tempicon.src="./icons/fog.png";
                }
                else if(id>800)
                {
                    tempicon.src="./icons/clouds.png";
                }
        }
        catch(error)
        {
            alert(`city not found`);
        }

 };

  
// this below code is for particular location of user

window.addEventListener("load",()=>{
    var long;
    var lat;
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
             
              
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a6a78ebf707692ce49b4579b91ef25f1`;
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data => {
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];
                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                if(id<300 && id>200)
                {
                    tempicon.src="./icons/thunderstorm.png";
                }
                else if(id<400 && id>300)
                {
                    tempicon.src="./icons/cloud.png";
                }
                else if(id<600 && id>500)
                {
                    tempicon.src="./icons/rain.png";
                }
                else if(id<700 && id>600)
                {
                    tempicon.src="./icons/snow.png";
                }
                else if(id>=800)
                {
                    tempicon.src="./icons/clouds.png";
                }
                
                console.log(data);
            })
        })
    }
})