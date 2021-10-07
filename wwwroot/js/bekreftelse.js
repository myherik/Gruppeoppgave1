/***
 * Getting ordre from sessionstoarge
 * if we have saved an order it is displayed to user
 * else we show a window for user to get to index or get order from server
 *
 */
$(() => {
    const ordre = JSON.parse(sessionStorage.getItem("ordre"));
    if (ordre != null){
        $("#harIkkeBestilling").attr("hidden", true);
        placeOrdre(ordre);
    }
    else {
        $("#harBestilling").attr("hidden", true)
    }
    
    
})

/***
 * When receiving ordre from server
 * if the ordre is valid it get displayed for user
 * else an errormessage get displayed
 * 
 * @param ordre - ordre received from backend
 */
const refresh = (ordre) => {
    sessionStorage.setItem('ordre', JSON.stringify(ordre))
    if (ordre != null){
        $("#harIkkeBestilling").attr("hidden", true);
        $("#harBestilling").attr("hidden", false)
        placeOrdre(ordre);
    }
    else {
        $("#harBestilling").attr("hidden", true)
        $("#harIkkeBestilling").attr("hidden", false);
    }
}

/***
 * Print the ordre to two different tables, one for large screens and one for small
 * 
 * 
 * @param ordre - the ordre to be displayed
 */
const placeOrdre = (ordre) => {
    const table = $("#placeBekreftelseHere");
    const lugarString = ordre.lugarType == null ? "Ingen": ordre.lugarType.type + ` x${ordre.antallLugarer}`;
    const hjemreiseString = ordre.hjemreiseDato == null ? "Ingen": ordre.hjemreiseDato;
    const bilString = ordre.registreringsnummer == null ? "Ingen": ordre.registreringsnummer;
    let out = `<table class="table table-striped table-bordered align-middle bekreftelse-media hidden-lg">` +
        `<tr>` +
        `<th>Navn på bestilling</th><td>${ordre.kontaktPerson.fornavn} ${ordre.kontaktPerson.etternavn}</td>` +
        `<th>Antall reisende</th><td>${ordre.voksne.length + ordre.barn.length + 1}</td>` +
        `</tr>` +
        `<tr>` + 
        `<th>Rute</th><td>${ordre.ferjestrekning}</td><th>Lugar</th><td>${lugarString}</td>` +
        `</tr>` +
        `<tr>` +
        `<th>Avreise</th><td>${ordre.utreiseDato}</td><th>Hjemreise</th><td>${hjemreiseString}</td>` +
        `</tr>` +
        `<tr>` +
        `<th>Totalt betalt</th><td>${ordre.pris},- kr.</td><th>Bil</th><td>${bilString}</td>` +
        `</tr>`;
    
    out += "</table>";
    
    // Table for smaller screens
    
    out += `<table class="table table-striped table-bordered align-middle bekreftelse-media hidden-sm">` +
        `<tr>` +
        `<th>Navn på bestilling</th><td>${ordre.kontaktPerson.fornavn} ${ordre.kontaktPerson.etternavn}</td>` +
        `</tr><tr>` +
        `<th>Antall reisende</th><td>${ordre.voksne.length + ordre.barn.length + 1}</td>` +
        `</tr>` +
        `<tr>` +
        `<th>Rute</th><td>${ordre.ferjestrekning}</td>` +
        `</tr><tr>` +
        `<th>Lugar</th><td>${lugarString}</td>` +
        `</tr>` +
        `<tr>` +
        `<th>Avreise</th><td>${ordre.utreiseDato}</td>` +
        `</tr><tr>` +
        `<th>Hjemreise</th><td>${hjemreiseString}</td>` +
        `</tr>` +
        `<tr>` +
        `<th>Bil</th><td>${bilString}</td>` +
        `</tr><tr>` +
        `<th>Totalt betalt</th><td>${ordre.pris},- kr.</td>` +
        `</tr>`;
    
    out += "</table>";
    
    table.html(out);
    placeDestination(ordre);
    placeReferanse(ordre.referanse)
}

/***
 * placed destination in message to user, gets called by placeOrdre(ordre)
 * 
 * @param ordre -  the ordre to get destination from
 */
const placeDestination = (ordre) => {
    const destination = ordre.ferjestrekning.split('-')[1];
    $("#placeDestinationHere").text(destination);
}


/***
 * placed reference in message to user, gets called by placeOrdre(ordre)
 * 
 * @param referanse - the ordre to get reference from
 */
const placeReferanse = (referanse) => {
    $("#ref").text(referanse)
}


/***
 * Methode tries to get ordre from backend with a reference placed by user
 * if the method returns an ordre ut get displayed for user by refresh(ordre)
 * else places an errormessage to user
 * 
 * @param id - reference to get ordre
 */
const referansebestilling = (id) => {
    const referanse = $(`#${id}`).val()
    const url = ("api/bestilling/ref/" + referanse).toLowerCase();
    
    $.ajax({
        url: url,
        method: "GET",
        success: (data) => {
            refresh(data)
            //console.log(data)
        },
        error: (error) => {
            if (error.status === 404) {
                $("#feil").text(error.responseText);
                $("#feilNy").text(error.responseText);
            }
            //console.log(error)
        }
    })
}

/***
 * onClick for return button, sends user to home page
 */
const retur = () => {
    window.location.href = "index.html";
}