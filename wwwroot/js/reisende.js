$(()=>{
    bestilling = JSON.parse(localStorage.getItem("formData"))
    if (bestilling == null){
        window.location.href = "index.html";
    }
    console.log(bestilling);
    setReisende();
    formaterTable();
})
let bestilling;
let reisendeVoksen = [];
let reisendeBarn = [];
let kontaktperson;

const setReisende = () => {
    kontaktperson = {
        fornavn: "",
        etternavn: "",
        Foedselsdato: "",
        adresse: "",
        telefon: "",
        epost: ""
    }
    for ( let i = 0; i < bestilling.reisende.voksne - 1; i++) {
        reisendeVoksen[i] = {
            Id: 0,
            fornavn: $(`#fornavnVoksen${i + 1}`).val(),
            etternavn: $(`#etternavnVoksen${i + 1}`).val(),
            Foedselsdato: $(`#datoVoksen${i + 1}`).val()
        }
    }
    for (let i = 0; i < bestilling.reisende.barn; i++) {
        reisendeBarn[i] = {
            Id: 0,
            fornavn: $(`#fornavn${i + 1}`).val(),
            etternavn: $(`#etternavn${i + 1}`).val(),
            Foedselsdato: $(`#dato${i + 1}`).val()
        }
    }
}

const formaterTable = () => {
    const el = $("#reisende")
    let string = `<button onclick='setKontaktPerson( this, "Kontaktperson 18+")' class='btn btn-outline-secondary'>Kontaktperson 18+</button>`;
    for (let i = 0; i < Number(bestilling.reisende.voksne) - 1; i++) {
        string += `<button onclick='setVoksen(${i}, this, "Reisende 18+ ${i+1}")' class='btn btn-outline-secondary'>Reisende 18+ ${i+1}</button>`
    }
    for (let i = 0; i < Number(bestilling.reisende.barn); i++) {
        string += `<button onclick='setBarn(${i}, this, "Reisende barn ${i+1}")' class='btn btn-outline-secondary'>Reisende barn ${i+1}</button>`
    }
    el.html(string)
}

const setKontaktPerson = (item, typePerson) => {
    $("#typePerson").text(typePerson.toLowerCase())
    //console.log(index)
    const fornavn = $("#fornavn")
    fornavn.val(kontaktperson.fornavn)
    if (fornavn.val() === "") {
        fornavn[0].classList.remove("is-valid")
    }
    const etternavn = $("#etternavn")
    etternavn.val(kontaktperson.etternavn)
    if(etternavn.val() === "") {
        etternavn[0].classList.remove("is-valid")
    }
    const dato = $("#dato")
    dato[0].classList.remove("is-valid")
    dato.val('dd.mm.åååå')
    
    const adresse = $("#adresse");
    adresse.val(kontaktperson.adresse)
    if (adresse.val() === "" ){
        adresse.classList.remove("is-valid");  
    }

    const postnummer = $("#postnummer");
    postnummer.val(kontaktperson.postnummer)
    if (postnummer.val() === "" ){
        postnummer.classList.remove("is-valid");
    }

    const poststed = $("#poststed");
    poststed.val(kontaktperson.poststed)
    if (poststed.val() === "" ){
        poststed.classList.remove("is-valid");
    }

    const telefon = $("#telefon");
    telefon.val(kontaktperson.telefon)
    if (telefon.val() === "" ){
        telefon.classList.remove("is-valid");
    }

    const epost = $("#epost");
    epost.val(kontaktperson.epost)
    if (epost.val() === "" ){
        epost.classList.remove("is-valid");
    }
    

    const lagre = $("#lagre");

    lagre.attr("disabled", true);

    $("#personer").attr('hidden', true)
    $("#input-felter").attr('hidden', false)
    $(".kontakt").attr('hidden', false)
    
    fornavn.unbind()
    fornavn.keyup(() => validerFornavn(0, fornavn[0], "voksen", true))
    etternavn.unbind()
    etternavn.keyup(() => validerEtternavn(0, etternavn[0], "voksen", true))
    dato.unbind()
    dato.change(() => validerBursdag(0, dato[0], "voksen", true))
    adresse.unbind()
    adresse.keyup(() => validerAdresse(adresse[0]))
    postnummer.unbind()
    postnummer.keyup(() => validerPostnummer(postnummer[0]))
    poststed.unbind()
    poststed.keyup(() => validerPoststed(poststed[0]))
    telefon.unbind()
    telefon.keyup(() => validerTelefon(telefon[0]))
    epost.unbind()
    epost.keyup(() => validerEpost(epost[0]))
    

    lagre.unbind()
    lagre.click(() => {
        item.classList.add("btn-outline-success")
        item.classList.remove("btn-outline-secondary")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        $(".kontakt").attr('hidden', true)
        sjekkBestill();
    })
}

const setVoksen = (index, item, typePerson) => {
    $("#typePerson").text(typePerson.toLowerCase())
    console.log(index)
    const fornavn = $("#fornavn")
    fornavn.val(reisendeVoksen[index].fornavn)
    if (fornavn.val() === "") {
        fornavn[0].classList.remove("is-valid")
    }
    const etternavn = $("#etternavn")
    etternavn.val(reisendeVoksen[index].etternavn)
    if(etternavn.val () === "") {
        etternavn[0].classList.remove("is-valid")
    }
    const dato = $("#dato")
    dato[0].classList.remove("is-valid")
    dato.val('dd.mm.åååå')
    
    const lagre = $("#lagre");

    lagre.attr("disabled", true);
    
    $("#personer").attr('hidden', true)
    $("#input-felter").attr('hidden', false)
    fornavn.unbind()
    fornavn.keyup(() => validerFornavn(index, fornavn[0], "voksen", false))
    etternavn.unbind()
    etternavn.keyup(() => validerEtternavn(index, etternavn[0], "voksen", false))
    dato.unbind()
    dato.change(() => validerBursdag(index, dato[0], "voksen", false))

    lagre.unbind()
    lagre.click(() => {
        item.classList.add("btn-outline-success")
        item.classList.remove("btn-outline-secondary")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        sjekkBestill();
    })
}

const setBarn = (index, item, typePerson) => {
    $("#typePerson").text(typePerson.toLowerCase())
    console.log(index)
    const fornavn = $("#fornavn")
    fornavn.val(reisendeBarn[index].fornavn)
    if (fornavn.val() === "") {
        fornavn[0].classList.remove("is-valid")
    }
    const etternavn = $("#etternavn")
    etternavn.val(reisendeBarn[index].etternavn)
    if(etternavn.val () === "") {
        etternavn[0].classList.remove("is-valid")
    }
    const dato = $("#dato")
    dato[0].classList.remove("is-valid")
    dato.val('dd.mm.åååå')

    const lagre = $("#lagre");

    lagre.attr("disabled", true);

    $("#personer").attr('hidden', true)
    $("#input-felter").attr('hidden', false)
    fornavn.unbind()
    fornavn.keyup(() => validerFornavn(index, fornavn[0], "barn", false))
    etternavn.unbind()
    etternavn.keyup(() => validerEtternavn(index, etternavn[0], "barn", false))
    dato.unbind()
    dato.change(() => validerBursdag(index, dato[0], "barn", false))

    lagre.unbind()
    lagre.click(() => {
        item.classList.add("btn-outline-success")
        item.classList.remove("btn-outline-secondary")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        sjekkBestill();
    })
}

const validerFornavn = (index, item, type, bool) => {
    const navn = item.value;
    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        if (!bool) {
            switch (type) {
                case 'voksen': {
                    reisendeVoksen[index].fornavn = navn;
                    break;
                }
                case 'barn': {
                    reisendeBarn[index].fornavn = navn;
                }
            }
        } else {
            kontaktperson.fornavn = navn;
        }
        
        sjekk(bool);
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
        sjekk(bool);
    }
}

const validerEtternavn = (index, item, type, bool) => {
    const navn = item.value;
    const regNavn = new RegExp(`^[A-ZÆØÅ]{1}[a-zæøå]{0,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        if (!bool) {
            switch (type) {
                case 'voksen': {
                    reisendeVoksen[index].etternavn = navn;
                    break;
                }
                case 'barn': {
                    reisendeBarn[index].etternavn = navn;
                }
            }
        } else {
            kontaktperson.etternavn = navn;
        }
        sjekk(bool);
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
        sjekk(bool);
    }
}

const validerBursdag = (index, item, type, bool) => {
    let date = item.value;
    let dateObj = new Date(date)
    let diff = new Date(new Date(bestilling.UtreiseDato) - dateObj)
    diff.setDate(diff.getDate() - 1)
    let diffYear = diff.getFullYear() - 1970
    switch (type){
        case 'voksen': {
            if (diffYear >= 18) {
                item.classList.add("is-valid")
                item.classList.remove("is-invalid")
                sjekk(bool);
                if (!bool) {
                    reisendeVoksen[index].Foedselsdato = date;
                } else {
                    kontaktperson.Foedselsdato = date;
                }
                $("#validMsg").text('')
            } else {
                item.classList.remove("is-valid")
                item.classList.add("is-invalid")
                sjekk(bool);
                $("#validMsg").text(`Fødselsdato til ${type} #${index} er ikke gyldig`)
            }
            break;
        }
        case 'barn' : {
            if (diffYear >= 0 && diffYear < 18) {
                item.classList.add("is-valid")
                item.classList.remove("is-invalid")
                sjekk(bool);
                reisendeBarn[index].Foedselsdato = date;
                $("#validMsg").text('')
            } else {
                item.classList.remove("is-valid")
                item.classList.add("is-invalid")
                sjekk(bool);
                $("#validMsg").text(`Fødselsdato til ${type} #${index} er ikke gyldig`)
            }
        }
    }
}

const validerAdresse = (item) => {
    const adresse = item.value;
    const regAdresse = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}\\s[0-9]{1,4}[A-ZÆØÅ]{0,1}$`);
    
    if (regAdresse.test(adresse)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        kontaktperson.postnummer = postnummer;
    } else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

const validerPostnummer = (item) => {
    const postnummer = item.value;
    const regPostnummer = new RegExp(`^[0-9]{4}$`)

    if (regPostnummer.test(postnummer)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        kontaktperson.postnummer = postnummer;
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

const validerPoststed = (item) => {
    const poststed = item.value;
    const regPoststed = new RegExp(`^[0-9]{4}$`) /* DENNE ER IKKE RIKTIG */
    
    if (regPoststed.test(poststed)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        kontaktperson.poststed = poststed;
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

const validerTelefon = (item) => {
    const telefon = item.value;
    const regTelefon = new RegExp(); /* IKKE FERDIG */
    
    if (regTelefon.test(telefon)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        kontaktperson.telefon = telefon;
    } else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

const validerEpost = (item) => {
    const epost = item.value;
    const regEpost = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    if (regEpost.test(epost)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        kontaktperson.epost = epost;
    } else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}


const sjekk = (bool) => {
    if (bool) {
        if ($(`.is-valid`).length === 6){
            $("#lagre").attr("disabled", false);
        }
    } else {
        if ($(`.is-valid`).length === 3){
            $("#lagre").attr("disabled", false);
        }
    }
    
}

const sjekkBestill = () => {
    if ($(".btn-outline-success").length === Number(bestilling.reisende.voksne) + Number(bestilling.reisende.barn)){
        $("#bestill").attr('disabled', false)
    }
}

const avbryt = () => {
    $("#input-felter").attr('hidden', true)
    $("#personer").attr('hidden', false)
}

const sendBestilling = () => {
    bestilling.kontaktPerson = kontaktperson;
    bestilling.voksne = reisendeVoksen;
    bestilling.barn = reisendeBarn;
    localStorage.removeItem("formData");
    localStorage.setItem("betal", JSON.stringify(bestilling));
    
    window.location.href="/betal.html"
}
