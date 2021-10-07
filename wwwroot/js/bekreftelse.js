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

const refresh = (ordre) => {
    //const ordre = JSON.parse(sessionStorage.getItem("ordre"));
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

const placeOrdre = (ordre) => {
    const table = $("#placeBekreftelseHere");
    const lugarString = ordre.lugarType == null ? "Ingen": ordre.lugarType.type + ` x${ordre.antallLugarer}`;
    const hjemreiseString = ordre.hjemreiseDato == null ? "Ingen": ordre.hjemreiseDato;
    const bilString = ordre.registreringsnummer == null ? "Ingen": ordre.registreringsnummer;
    let out = `<table class="table table-striped table-bordered align-middle bekreftelse-media hidden-lg">` +
        `<tr>` +
        `<td>Navn på bestilling</td><td>${ordre.kontaktPerson.fornavn} ${ordre.kontaktPerson.etternavn}</td>` +
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
    
    out += "</table>";
    
    // Table for smaller screens
    
    out += `<table class="table table-striped table-bordered align-middle bekreftelse-media hidden-sm">` +
        `<tr>` +
        `<td>Navn på bestilling</td><td>${ordre.voksne[0].fornavn} ${ordre.voksne[0].etternavn}</td>` +
        `</tr><tr>` +
        `<td>Antall reisende</td><td>${ordre.voksne.length + ordre.barn.length}</td>` +
        `</tr>` +
        `<tr>` +
        `<td>Rute</td><td>${ordre.ferjestrekning}</td>` +
        `</tr><tr>` +
        `<td>Lugar</td><td>${lugarString}</td>` +
        `</tr>` +
        `<tr>` +
        `<td>Avreise</td><td>${ordre.utreiseDato}</td>` +
        `</tr><tr>` +
        `<td>Hjemreise</td><td>${hjemreiseString}</td>` +
        `</tr>` +
        `<tr>` +
        `<td>Bil</td><td>${bilString}</td>` +
        `</tr><tr>` +
        `<td>Totalt betalt</td><td>${ordre.pris},- kr.</td>` +
        `</tr>`;
    
    out += "</table>";
    
    table.html(out);
    placeDestination(ordre);
    placeReferanse(ordre.referanse)
}

const placeDestination = (ordre) => {
    const destination = ordre.ferjestrekning.split('-')[1];
    $("#placeDestinationHere").text(destination);
}

const placeReferanse = (referanse) => {
    $("#ref").text(referanse)
}

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

const retur = () => {
    window.location.href = "index.html";
}