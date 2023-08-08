// Création de l'objet "weather" qui contient les méthodes pour récupérer et afficher les données météo.
let weather = {
  apiKey: '8e21fee074028222f5ce56f9c0202547',

  // Méthode pour effectuer une requête à l'API de Open Weather Map et récupérer les données météo pour une ville donnée.
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  // Méthode pour afficher les données météo dans l'interface utilisateur.
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Mise à jour des éléments HTML avec les données météo.
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerHTML =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');

    // Changement de l'image de fond en fonction de la ville recherchée en utilisant l'API de Unsplash.
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  // Méthode pour lancer la recherche en utilisant la valeur entrée dans la barre de recherche.
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

// Écouteur d'événement pour le bouton de recherche.
document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

// Écouteur d'événement pour la touche "Enter" dans la barre de recherche.
document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });
