"use strict";

//Min github länk: 
//Jag skapar ett nytt objekt som sedan returnerar konstnären
function CreateNewArtist(name, style, birth, death) {
	let artist = {
		name: name,
		style: style,
		birth: birth,
		death: death,
	};
	return artist;
}
//Nu lägger jag till en konstnär till min databas.
function AddArtistToDatabase(database, artist) {
	database.push(artist);
}

function GetArtistsByStyle(artists, style) {
	let ArtistsByStyle = [];
	for (let artist of artist) {
		if (artist.style.toLowerCase() == style.toLowerCase()) {
			GetArtistsByStyle.push(artist);
		}
	}
	return ArtistsByStyle;
}

//I denna funktion möjliggör den att visa konstnären genom att lägga till den i vår HTML. I detta fall har vi skapat en funktion som tar emot parametern artist. 
//Därefter har vi sparat en plats på minnet för li. Li skapar ett element "Li" (en lista). Därefter ger vi även ett id till artisten som skapas och lägger in den
//i vår HTML genom Template Literals. Samt att vi skapar en knapp för varje artist som läggs till.
function renderArtist(artist) {
	let li = document.createElement("li");
	li.classList.add("artist");
	li.id = artist.id;
	li.innerHTML = `
        <li>${artist.name}</li>
        <div>${artist.style}</div>
        <div>${artist.birth}</div>
        <div>${artist.death}</div>
        <button type="button">Remove</button>
    `;
	return li;
}

/* Här har jag skapat en funktion som tar emot parametern artists. Jag har därefter sparat en plats på minnet åt "artistsElement" som når artists genom att nåElementet från ID.
Därefter har jag itirerat en for loop som anropar funktionen renderArtist när artistElement kallas. Därefter i denna funktion anropar jag setRemoveArtistHandlers.
*/
function renderArtists(artists) {
	let artistsElement = document.getElementById("artists");
	artistsElement.innerHTML = "";
	for (let artist of artists) {
		let artistElement = renderArtist(artist);
		artistsElement.appendChild(artistElement);
	}
	setRemoveArtistHandlers();
}

/* I denna, den komplicerade funktionen tog det lite till för att få till den. Det jag gjort är att jag har givit myForm ett "konstant" värde som är document.getElementById ("add-style-form");
därefter lägger jag till en eventlistener till min "myForm" som lyssnar på "submit" som sker vid själva eventet. Jag har även använt arrow funktioner i denna för att jag djupgrävde lite i JS och tyckte att detta var enklare än att använda andra lösningar.
En arrowfunktion är ett snabbare sätt att skriva funktioner på att kortare sätt. Det underlättar i detta fall så att koden håller sig ren.*/

const myForm = document.getElementById("add-style-form");
myForm.addEventListener("submit", (e) => {
	e.preventDefault();

/* Här har jag sparat en plats på minnet åt varenda egenskap där det läggs in värdet som trycks in på hemsidan. Därefter har jag itirerat en if loop för att kunna skapa kriteriet att alla fält skall vara ifyllda. 
Jag har då skrivit att om längden på en egenskap eller om alla är lika med 0 så kommer det komma upp en "alert" som varnar användaren att fylla i alla fält. Om alla fält är ifyllda
fortsätter det med att skapa en ny konstnär och ger den ett Id samt lägger in den i databasen. Utöver det så resettas formuläret efter att den lagts till.
*/
	let name = document.getElementById("name").value;
	let style = document.getElementById("style").value;
	let birth = document.getElementById("birth").value;
	let death = document.getElementById("death").value;
	if (death.length == 0 || name.length == 0 || style.length == 0 || birth.length == 0) {
		alert("please fill in all empty fields")
	} else {
		let artist = CreateNewArtist(name, style, birth, death);
		artist.id = database[database.length - 1].id + 1;
		AddArtistToDatabase(database, artist);
		renderArtists(database);
		let form = document.getElementById("add-artist-form");
		myForm.reset();
	}
});

/* Här har jag skapat en funktion som gör att när knappen "add" trycks så läggs konstnären till databasen samt lägger in den. */
function onAddArtistClick() {
	let buttons = document.querySelectorAll(".add button");
	let id = buttons.parentElement.id;
	AddArtistToDatabase(database);
	renderArtists(database);
}

function setAddArtistHandler() {
	let buttons = document.querySelectorAll(".add button");
	for (let button of buttons) {
		button.addEventListener("click", onAddArtistClick);
	}
}

//Denna lägger upp en confirm prompt som ställer frågan "vill du verkligen göra detta?" om användaren trycker ja returneras värdet för oss som true vilket gör att konstnären tas 
//bort från databasen. Om användaren trycker nej returneras det som falskt för oss vilket gör att det står "you did not remove ..."
function onRemoveArtistClick(event) {
	let button = event.target;
	let id = button.parentElement.id;
	let p = confirm("Are you sure you want to remove this artist?");
	if (p == true) {
		RemoveArtistById(database, id);
		renderArtists(database);
	} else {
		alert("You did not remove the artist");
	}
}
//Tar bort en konstnär baserat på ens namn, för detta skapar jag en funktion där jag itirerar en for loop 
function RemoveArtistById(artists, id) {
	console.log(artists);
	console.log(id);
	for (let i = 0; i < artists.length; i++) {
		let artist = artists[i];
		//här itirerar jag en if loop som gör att den konstnären jag tycker på "remove" ska tas bort genom splice och att den endast tar bort denna tack vare att indexen väljs och endast 1.
		if (artist.id == id) {
			artists.splice(i, 1);
			return;
		}
	}
}

function setRemoveArtistHandlers() {
	let buttons = document.querySelectorAll(".artist button");
	for (let button of buttons) {
		button.addEventListener("click", onRemoveArtistClick);
	}
}

//Här har jag skapat filter för användaren att kunna använda. I detta fall har jag sparat en tom array på minnet åt filterarray. Därefter har jag skapat en forEach loop
//som kollar igenom varende namn av databasen för att se om något av namnen matchar filterönskan.
function onFilterByNameSubmit(event) {
	event.preventDefault();
	let filterarray = [];
	let name = document.getElementById("filter-name").value;
	let artists = database;
	artists.forEach(element => {
		if (element.name.includes(name)) {
			filterarray.push(element);
		}
	});
	renderArtists(filterarray);
}

//Detsamma men för födelseår, dödsår samt stil osv.

function onFilterByBirthSubmit(event) {
	event.preventDefault();
	let filterarray = [];
	let birth = document.getElementById("filter-birth").value;
	let artists = database;
	artists.forEach(element => {
		if (element.birth.includes(birth)) {
			filterarray.push(element);
		}
	});
	renderArtists(filterarray);
}

function onFilterByDeathSubmit(event) {
	event.preventDefault();
	let filterarray = [];
	let death = document.getElementById("filter-death").value;
	let artists = database;
	artists.forEach(element => {
		if (element.death.includes(death)) {
			filterarray.push(element);
		}
	});
	renderArtists(filterarray);
}

function onFilterByStyleSubmit(event) {
	event.preventDefault();
	let filterarray = [];
	let style = document.getElementById("filter-style").value;
	let artists = database;
	artists.forEach(element => {
		if (element.style.includes(style)) {
			filterarray.push(element);
		}
	});
	renderArtists(filterarray);
}

//Denna funktion gör så att alla filter values töms och att alla konstnärer visas på nytt genom att anropa renderArtists från databasen.

function onShowAllClick() {

	document.getElementById("filter-style").value = "";
	document.getElementById("filter-birth").value = "";
	document.getElementById("filter-death").value = "";
	document.getElementById("filter-name").value = "";
	renderArtists(database);
}

/* Detta göt att jag lägger till eventlisteners som lyssnar på submit och click på knapparna när man fyller i filter på sidan. Utöver det har jag även använt mig av arrow funktioner i denna också.
Så när en användare vill filtrera och trycker på knapper filter så gör det att de olika funktionerna anropas i samband med e. */
function setFilterArtistHandlers() {
	let styleForm = document.getElementById("filter-by-style");
	let birthForm = document.getElementById("filter-by-birth");
	let deathForm = document.getElementById("filter-by-death");
	let nameForm = document.getElementById("filter-by-name");
	let showAll = document.getElementById("show-all");
	styleForm.addEventListener("submit", (e) => {
		e.preventDefault();
		onFilterByStyleSubmit(e);
	});
	birthForm.addEventListener("submit", (e) => {
		e.preventDefault();
		onFilterByBirthSubmit(e);
	});
	deathForm.addEventListener("submit", (e) => {
		e.preventDefault();
		onFilterByDeathSubmit(e);
	});
	nameForm.addEventListener("submit", (e) => {
		e.preventDefault();
		onFilterByNameSubmit(e);
	});
	showAll.addEventListener("click", (e) => {
		e.preventDefault();
		onShowAllClick(e);
	});
}

//Slutligen anropas alla funktioner här. Och sidan initieras.
renderArtists(database);
setAddArtistHandler();
setFilterArtistHandlers();