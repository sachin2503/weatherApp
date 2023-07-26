// const apikey = "ffccf94e1316b3de410eb63d24fb0f8f";
// async function showWeather(){
//     let city = "goa";
//     const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
//     const data = await responce.json();

//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} C`
//     document.body.appendChild(newPara);
// }





const searchTab = document.querySelector("[data-searchWeather]");
const userTab = document.querySelector("[data-userWeather]");

const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;
const apikey = "ffccf94e1316b3de410eb63d24fb0f8f";
currentTab.classList.add("current-tab");


function switchTab(clickedTab) {
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
    

    if(!searchForm.classList.contains("active")){
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }

    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getformSessionStorage();
        }
    }   
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

function getformSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }

    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

 async function fetchUserWeatherInfo(coordinates){
    const {lat , lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try{

    const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
        const data  = await response.json(); 
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    

    catch(err){
        loadingScreen.classList.remove("active");
           console.log('hii');
    }
} 

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const contoryIcon = document.querySelector("[data-contoryIcon]");
    const desc = document.querySelector("[ data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weather-icon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    contoryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;
}

function getlocation () {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
        alert("No geolocation support available");

    }
}

function showPosition(position){
    const usercoordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude,

    }
    sessionStorage.setItem("user-coordinate", JSON.stringify(usercoordinates));
    fetchUserWeatherInfo(usercoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click' , getlocation );

let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchInput.value === "") {
        return;
    }
    fetchSearchWeatherInfo(searchInput.value);
});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    // searchForm.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    // loadingScreen.classList.add("active");
    try{

       
const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
const data = await responce.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
}
catch(err){
alert('please enter valid city');
}
}
// weatherInfo



