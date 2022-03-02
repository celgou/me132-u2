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
    for (let i=0; i < artist.length; i++) {
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


function renderArtist (artists) {
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

    let artist = createNewArtist (name, style, birth, death);

    artist.id = database[database.length - 1].id + 1;
    AddArtistToDatabase (database, artist);
    renderArtists (database);

    let form = document.getElementById ("add-artist-form");
    form.reset ();

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

function onFilterByBirthSubmit (event) {
    event.preventDefault ();
    let birth = document.getElementById ("filter-birth").value;
    let artists = getArtistsByBirth (database, birth);
    renderArtists (artists);

}

function onShowAllClick(){
    document.getElementById("filter-style").value = "";
    document.getElementById ("filter-birth").value = "";
    document.getElementById ("filter-death").value ="";
    document.getElementById ("filter-name").value ="";

    renderArtists (database);

}

function setFilterArtistHandlers (){
    let styleForm = document.getElementById ("filter-by-style");
    let birthForm = document.getElementById ("filter-by-birth");
    let deathForm = document.getElementById ("filter-by-death");
    let
}