function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}
//Codigo a Ejecutar al Cargar la Pagina

function myOnLoad() {
 cargar_provincias()
}
myOnLoad();

// funcion para Cargar Provincias al campo <select>
function cargar_provincias() {
    var array = [" Colombia ", "Chile", "Brasil", "Venezuela",
 "Argentina", "Ecuador", "Bolivia", "Paraguay",  "Uruguay", "Peru"
];

 // Ordena el Array Alfabeticamente, es muy facil ;)):
 array.sort();

 addOptions("provincia", array);
}

// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {
 var select = document.getElementsByName(domElement)[0];

 for (value in array) {
  var option = document.createElement("option");
  option.text = array[value];
  select.add(option);
 }
}

function traerCapitales() {
    console.log("ejecutado")
    fetch(  `https://restcountries.eu/rest/v2/region/`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
     
    })
} 
    function traer() {
    console.log(pais)
    fetch(  `https://restcountries.eu/rest/v2/name/${pais}`)
    .then(res => res.json())
    .then(data => {

        console.log(data) 
        let ciudad = data[0].capital
        let calling = data[0].callingCodes[0]
        let poblacion = data[0].population
        let moneda = data[0].currencies[0].name
        let region = data[0].region
        let subregion = data[0].subregion

        contenido.innerHTML = `
        <div style="display: block; margin: auto;">
         <img style="display: block; margin: auto; height: 100px;" src="${data[0].flag}" > 
        <p style="text-align: center;">Pais: ${data[0].name}  <br>
            Capital: ${ciudad} <br>
            Dialing Code : + ${calling} <br>
            Poblacion : ${poblacion} <br>
            Moneda : ${moneda}  <br>
            Region : ${region} <br>
            Subregion : ${subregion}

            </p>
            
        </div>`

        console.log(ciudad)
        //traer datos meteorologicos
      

        fetch(  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=0efb008fb6ef10a0ccc4dc8d1bffdf89`)
        .then(res => res.json()).then(
            data => {
                
                let datos = data;
                console.log(datos.coord);
                let temMax = datos.main.temp_max  - 273.15;
                let temMin = datos.main.temp_min  - 273.15;
                let temAct =datos.main.temp  - 273.15;
                let descripcion = datos.weather[0].description;
                let country =datos.sys.country;
                latitud = datos.coord.lat
                longitud = datos.coord.lon

                document.getElementById("temperaturaMaxima").innerText = temMax.toFixed(2)+"°C" ;
                document.getElementById("temperaturaMinima").innerText = temMin.toFixed(2)+"°C" ;
                document.getElementById("temperaturaActual").innerText = temAct.toFixed(2)+"°C" ;
                document.getElementById("descripcion").innerText = descripcion ;
                document.getElementById("pais").innerText = country ;

                iniciarMap();
                
            }
        )
        
    })
} 

latitud = -34.5956145
longitud = -58.4431949
  
function iniciarMap(){
    var coord = {lat: latitud ,lng: longitud};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

var pais;
const selectElement = document.querySelector('.provincia');

selectElement.addEventListener('change', (event) => {
    console.log(event.target.value)
    pais = event.target.value
    traer();
});
