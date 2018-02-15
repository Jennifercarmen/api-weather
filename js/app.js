$(document).ready(function() {

  let btnForecast = $('.forecast');
  let temperature = $('.temperature');
  let wind = $('#wind');
  let humidity = $('#humidity');
  let uvIndex = $('#uvindex');
  let pressure = $('#pressure');
  let imgindex = $('.imgindex');
  let box_Week = $('#week');

  btnForecast.on('click', seeWeek);
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  function seeWeek() {
    window.location.href = 'views/home.html';
  }
 const searchPosition=() => {
    let latitude, longitude;
    const Successfunction = function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.darksky.net/forecast/6c7b63ac161e0727b15172d8d3b22090/${latitude},${longitude}?units=si`;
      $.ajax({
        url: proxy + url,
        success:getforecast
      });

    };
    const Errorfunction = function(error) {
      alert('tenemos un problema con encontrar tu ubicacion');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(Successfunction, Errorfunction);
    }
  }
  const getforecast=(data) => {
    console.log(data);
    // view 1 today

    let today = data.currently;
    let icon = today.icon;
    imgindex.attr('src', `assets/images/${icon}.png`);
    wind.text(today.windSpeed + 'm/s');
    humidity.text(today.humidity + '%');
    uvIndex.text(today.uvIndex);
    pressure.text(today.pressure + 'hPa');
    temperature.text(today.temperature + '°');

    // view semana
    const week = data.daily.data;
    week.length=7;
    week.forEach((value, index) => {
      let html = `<div class = "row">
      <div class="col-xs-2"></div>
    <div class="col-xs-10"><img class="imgindex" src="../assets/images/${value.icon}.png"></div>
    <div class="col-xs-2"></div>
    <div class="col-xs-3"><p>${days[index]}</p></div>
    <div class="col-xs-2"><p>MIN-${value.temperatureMin}°</p></div>
    <div class="col-xs-2"><p>MAX-${value.temperatureMax}°</p></div>
    </div>`;
    box_Week.append(html);
    });
  
  }

  const backgroundbody =()=> {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="landscapes"&api_key=4723d78d1d4ae324fe34315b643fd01f`;
      $.ajax({
        url: proxy + url,
        success:backgroundbody_s
       
      });
    
  }

  function backgroundbody_s(rsp){
    var apiKey =  '4723d78d1d4ae324fe34315b643fd01f' ;
	// $ . getJSON ( ' http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key= '  + apiKey +  ' & amp; photoset_id = 72157619415192530 & amp; format = json & amp; jsoncallback =? ' ,

  //     // for (var i=0; i<rsp.items.length; i++){
  //     //   var blog = rsp.items[i];
  //     //   var div = document.createElement('div');
  //     //   var txt = document.createTextNode(blog.name);
  //     //   div.appendChild(txt);
  //     //   document.body.appendChild(div);
  //     // }
    }
  
  backgroundbody();
  searchPosition();
});
