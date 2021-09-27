$(() => {
    hentBestilling(localStorage.getItem("id"));
})

const hentBestilling = (id) => {
    let teller = 0;
    $.get("/api/Bestilling/", Data => {
        let tom = `<tr>
        <h6>Ferjestrekning:</h6>
        <p>${Data.Ferjestrekning}</p>
        <h6>Utreisedato:</h6>
        <p>${Data.UtreiseDato}</p>
        <h6>Hjemreise:</h6>
        <p>${Data.HjemReiseDato}</p>
        `
        if (Data.HjemReiseDato != ""){
            tom += `<h6>Hjemreise:</h6>
            <p>${Data.HjemReiseDato}</p>`
        }
        if (Data.Registreringsnummer != ""){
            tom += `<h6>Registreringsnummer:</h6>
            <p>${Data.Registreringsnummer}</p>`
        }
        for (let voksen of Data.voksne){
            teller++;
            tom += `<h6>Fornavn #${teller}:</h6>
            <p>${voksen.fornavn}</p>
            <h6>Etternavn #${teller}:</h6>
            <p>${voksen.etternavn}</p>
            <h6>Fødselsdato #${teller}:</h6>
            <p>${voksen.Foedselsdato}</p>
            `
        }
        for (let barn of Data.barn){
            teller++;
            tom += `<h6>Fornavn #${teller}:</h6>
            <p>${voksen.fornavn}</p>
            <h6>Etternavn #${teller}:</h6>
            <p>${voksen.etternavn}</p>
            <h6>Fødselsdato #${teller}:</h6>
            <p>${voksen.Foedselsdato}</p>
            `
        }
    })
}