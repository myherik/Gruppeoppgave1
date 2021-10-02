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

const placeOrdre = (ordre) => {
    const table = $("#placeBekreftelseHere");
    const lugarString = ordre.lugarType == null ? "Ingen": ordre.lugarType + ` x${ordre.antallLugarer}`;
    const hjemreiseString = ordre.hjemreiseDato == null ? "Ingen": ordre.hjemreiseDato;
    const bilString = ordre.registreringsnummer == null ? "Ingen": ordre.registreringsnummer;
    let out = `<table class="table table-striped table-bordered align-middle table-fixed"><thead></thead><tbody>` +
        `<tr>` +
        `<td>Navn på bestilling</td><td>${ordre.voksne[0].fornavn} ${ordre.voksne[0].etternavn}</td>` +
        `<td>Antall reisende</td><td>${ordre.voksne.length + ordre.barn.length}</td>` +
        `</tr>` +
        `<tr>` + 
        `<td>Rute</td><td>${ordre.ferjestrekning}</td><td>Lugar</td><td>${lugarString}</td>` +
        `</tr>` +
        `<tr>` +
        `<td>Avreise</td><td>${ordre.utreiseDato}</td><td>Hjemreise</td><td>${hjemreiseString}</td>` +
        `</tr>` +
        `<tr>` +
        `<td>Totalt betalt</td><td>${ordre.pris},- kr.</td><td>Bil</td><td>${bilString}</td>` +
        `</tr>`;
    
    out += "</tbody></table>";
    
    table.html(out);
    placeDestination(ordre);
}

const placeDestination = (ordre) => {
    const destination = ordre.ferjestrekning.split('-')[1];
    $("#placeDestinationHere").text(destination);
}

const retur = () => {
    window.location.href = "index.html";
}