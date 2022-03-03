"use strict";

//Jag skapar ett nytt objekt som sedan returnerar konstnären

function CreateNewArtist(name, style, birth, death){
    let artist = {
        name: name,
        style: style,
        birth: birth,
        death: death,
    };

    return artist;
}

//Nu lägger jag till en konstnär till min databas.

function AddArtistToDatabase (database, artist) {
    database.push (artist);
}

//Tar bort en konstnär baserat på ens namn, för detta skapar jag en funktion där jag itirerar en for loop 

function RemoveArtistById (artists, id){
    for (let i=0; i < artists.length; i++) {
        let artist = artist [i];
        //här itirerar jag en if loop 
        if (artist.id == id){
            artist.splice (i,1);
            return;
        }
    }
}

function GetArtistsByStyle (artists, style) {
    let ArtistsByStyle = [];

    for (let artist of artist){
        if (artist.style.toLowerCase ()== style.toLowerCase ()){
            GetArtistsByStyle.push(artist);
        }
    }

    return ArtistsByStyle;
}

//Nu försöker jag ta reda på alla konstnärers medellivslängd. För detta behöver jag skapa en mer komplicerad average funktion.

function getAverageLifeSpan (artists) {
    
   
    let sumOfBirth = 0;
    let sumOfDeath = 0;
    let averageLife = sumOfBirth + sumOfDeath;

    for (let artist of artists){
        averageLife = (sumOfBirth + artist.birth) + (sumOfDeath + artist.death);

    }

    return Math.round (averageLife / artists.length);
}


function renderArtist (artist) {
    let div = document.createElement ("div");
    div.classList.add ("artist");
    div.id = artist.id;

    div.innerHTML = `
        <div>${artist.name}</div>
        <div>${artist.style}</div>
        <div>${artist.birth}</div>
        <div>${artist.death}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

function renderArtists (artists){
    let artistsElement = document.getElementById ("artists");
    console.log("test",artists);
    artistsElement.innerHTML = "";

    for (let artist of artists){
        let artistElement = renderArtist (artist);
        artistsElement.appendChild(artistElement);
    }
    setRemoveArtistHandlers ();
}

function onAddArtistSubmit (event) {
    event.preventDefault ();

    let name = document.getElementById ("name").value;
    let style = document.getElementById ("style").value;
    let birth = document.getElementById ("birth").value;
    let death = document.getElementById ("death").value;

    let artist = CreateNewArtist (name, style, birth, death);
        console.log("artist",artist);
    artist.id = database[database.length - 1].id + 1;
    AddArtistToDatabase (database, artist);
    renderArtists (database);

    let form = document.getElementById ("add-artist-form");
    form.reset ();

}

const myForm = document.getElementById("add-style-form");
myForm.addEventListener("submit", (e)=>{
    e.preventDefault ();
    console.log("event",e);
    let name = document.getElementById ("name").value;
    let style = document.getElementById ("style").value;
    let birth = document.getElementById ("birth").value;
    let death = document.getElementById ("death").value;

    let artist = CreateNewArtist (name, style, birth, death);
        console.log("artist",artist);
    artist.id = database[database.length - 1].id + 1;
    AddArtistToDatabase (database, artist);
    renderArtists (database);

    let form = document.getElementById ("add-artist-form");
    myForm.reset();
});

function onAddArtistClick (){
    let buttons = document.querySelectorAll(".add button");
    let id= buttons.parentElement.id;
    AddArtistToDatabase (database);
    renderArtists(database);
}

function setAddArtistHandler (){
    let buttons = document.querySelectorAll(".add button");
    for (let button of buttons){
         button.addEventListener("click", onAddArtistClick);
    }
       
}

function onRemoveArtistClick (event){
    let button = event.target;
    let id = button.parentElement.id;
    RemoveArtistById (database, id);
    renderArtists (database);
}

function setRemoveArtistHandlers (){
    let buttons = document.querySelectorAll (".artist button");
    for (let button of buttons){
        button.addEventListener ("click", onRemoveArtistClick);
    }
}

function onFilterByNameSubmit(event){
    event.preventDefault();
    let filterarray = [];
    console.log("2");
    let name = document.getElementById ("filter-name").value;
    let artists = database;
    console.log(artists);
        artists.forEach(element => {
            console.log(element.name);
            if(element.name.includes(name)){
                console.log(element.name,"hej");
                filterarray.push(element);
            }
            
        });
    renderArtists(filterarray);
    
}

function onFilterByBirthSubmit(event){
    event.preventDefault();
    let birth = document.getElementById ("filter-birth").value;
    let artists = getArtistsByBirth (database, birth);
    renderArtists (artists);

}

function onFilterByDeathSubmit(event) {
    event.preventDefault();
    let style = document.getElementById ("filter-style").value;
    let artists = getArtistsByStyle (database, style);
    renderArtists (artists);

}


function onFilterByStyleSubmit (event) {
    event.preventDefault();
    let style = document.getElementById ("filter-style").value;
    let artists = getArtistsByBirth (database, birth);
    renderArtists (artists);

}


function onShowAllClick(){
    console.log("kommerjagfram");
    document.getElementById("filter-style").value = "";
    document.getElementById ("filter-birth").value = "";
    document.getElementById ("filter-death").value ="";
    document.getElementById ("filter-name").value ="";
    console.log("kommerjaghit2");
    renderArtists (database);

}

function setFilterArtistHandlers (){
    let styleForm = document.getElementById ("filter-by-style");
    let birthForm = document.getElementById ("filter-by-birth");
    let deathForm = document.getElementById ("filter-by-death");
    let nameForm = document.getElementById ("filter-by-name");
    let showAll = document.getElementById ("show-all");

    styleForm.addEventListener ("submit",(e)=>{
        e.preventDefault();
        onFilterByStyleSubmit(e);
    });
    birthForm.addEventListener ("submit", (e)=>{
        e.preventDefault();
        onFilterByBirthSubmit(e);
    });
    deathForm.addEventListener ("submit", (e)=>{
        e.preventDefault();
        onFilterByDeathSubmit(e);
    });
    nameForm.addEventListener ("submit",(e)=>{
        e.preventDefault();
        onFilterByNameSubmit(e);
    });
    showAll.addEventListener ("click", (e)=>{
        e.preventDefault();
        onShowAllClick(e);
    });
}

renderArtists (database);
setAddArtistHandler ();
setFilterArtistHandlers ();