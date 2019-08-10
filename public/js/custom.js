// const fetch = require('fetch');

const weather_form = document.querySelector('form');

weather_form.addEventListener('submit', (e) => {
  e.preventDefault();
  let address = document.getElementById('search').value;

  fetch('http://localhost:3000/weather?address=' + address).then((res) => {
    res.json().then((data) => {
      if(data.error){
        console.log(data.error);
        alert("Oops! Something went wrong please try again.");
        return ;
      }

      console.log(data);
      document.getElementById('address').textContent += data.location;
      document.getElementById('forecast').textContent += data.forecast;
    });
  })
})
