/***
 * readyfunction
 * gets bestilling from localstorage
 * if no bestilling is stored user is returend to index.html
 * else user is ready for presenting info about passengers
 */
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

/***
 * arrays for all voksne and barn given by bestilling is set with fields
 * kontaktperson is set with more fields 
 */
const setReisende = () => {
    kontaktperson = {
        fornavn: "",
        etternavn: "",
        Foedselsdato: "",
        adresse: "",
        post:{
            postNummer: "",
            postSted: ""
        },
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

/***
 * presents a button for every passenger in bestilling
 * text is set in button according to type of passenger
 */
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

/***
 * onclick for first buton for kontaktperson
 * more fields are shown as more info is necessary
 * correct validations is set on all fields and button
 * 
 * @param item - the button, for changing color when done
 * @param typePerson - for text in form
 */
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
    dato.val('dd.mm.????????')
    
    const adresse = $("#adresse");
    adresse.val(kontaktperson.adresse)
    if (adresse.val() === "" ){
        adresse[0].classList.remove("is-valid");  
    }

    const postnummer = $("#postnummer");
    postnummer.val(kontaktperson.post.postNummer)
    if (postnummer.val() === "" ){
        postnummer[0].classList.remove("is-valid");
    }

    const poststed = $("#poststed");
    poststed.val(kontaktperson.post.postSted)
    if (poststed.val() === "" ){
        poststed[0].classList.remove("is-valid");
    }

    const telefon = $("#telefon");
    telefon.val(kontaktperson.telefon)
    if (telefon.val() === "" ){
        telefon[0].classList.remove("is-valid");
    }

    const epost = $("#epost");
    epost.val(kontaktperson.epost)
    if (epost.val() === "" ){
        epost[0].classList.remove("is-valid");
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
        adresse[0].classList.remove("is-valid")
        postnummer[0].classList.remove("is-valid")
        poststed[0].classList.remove("is-valid")
        telefon[0].classList.remove("is-valid")
        epost[0].classList.remove("is-valid")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        $(".kontakt").attr('hidden', true)
        sjekkBestill();
    })
}

/***
 * onclick for button for adult travelers
 * sets field for type of traveler
 * sets correct validation
 * 
 * @param index - index of array to store information
 * @param item - button, for changing color when done
 * @param typePerson - for text in form
 */
const setVoksen = (index, item, typePerson) => {
    $(".kontakt").attr('hidden', true)
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
    dato.val('dd.mm.????????')
    
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

/***
 * onclick for button for child travelers
 * sets field for type of traveler
 * sets correct validation
 *
 * @param index - index of array to store information
 * @param item - button, for changing color when done
 * @param typePerson - for text in form
 */
const setBarn = (index, item, typePerson) => {
    $(".kontakt").attr('hidden', true)
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
    dato.val('dd.mm.????????')

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

/***
 * uses regex to check for capital first letter in all words
 * 
 * @param index - index of array
 * @param item - input field
 * @param type - type of person
 * @param bool - if kontaktpersn
 */
const validerFornavn = (index, item, type, bool) => {
    const navn = item.value;
    const regNavn = new RegExp(`^([A-Z??????]{1}[a-z??????]{0,}\\s{0,1}){1,}$`);
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

/***
 * uses regex to check for capital first letter in one word
 *
 * @param index - index of array
 * @param item - input field
 * @param type - type of person
 * @param bool - if kontaktpersn
 */
const validerEtternavn = (index, item, type, bool) => {
    const navn = item.value;
    const regNavn = new RegExp(`^[A-Z??????]{1}[a-z??????]{0,}$`);
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

/***
 * uses type to know witch age to check for 18+ or less than 18
 * checks age at utreise not at order to validate
 *
 * @param index - index of array
 * @param item - input field
 * @param type - type of person
 * @param bool - if kontaktpersn
 */
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
                $("#validMsg").text(`F??dselsdato til ${type} #${index} er ikke gyldig`)
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
                $("#validMsg").text(`F??dselsdato til ${type} #${index} er ikke gyldig`)
            }
        }
    }
}

/***
 * only used by kontaktperson
 * needed at least one word and one number up to 9999
 * 
 * @param item - input field
 */
const validerAdresse = (item) => {
    const adresse = item.value;
    const regAdresse = new RegExp(`^([A-Z??????]{1}[a-z??????]{0,}\\s{0,1}){1,}\\s[0-9]{1,4}[A-Z??????]{0,1}$`);
    
    if (regAdresse.test(adresse)){
        kontaktperson.adresse = adresse
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
    } else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

/***
 * backned has list with valid postnummer
 * get-method to get poststed
 * if valid poststed put on screen
 * else error is shown to user
 * 
 * @param item - field
 */
const validerPostnummer = (item) => {
    const postnummer = item.value;
    const regPostnummer = new RegExp(`^[0-9]{4}$`)

    if (regPostnummer.test(postnummer)){
        
        $.get(`api/reise/postnummer/${postnummer}`, data => {
            if (data != null){
                kontaktperson.post = data;
                const poststed = $("#poststed");
                poststed.val(data.postSted);
                poststed[0].classList.remove("is-invalid");
                poststed[0].classList.add("is-valid");
            }
        }).fail(error => {
            const poststed = $("#poststed");
            poststed.val("");
            poststed[0].classList.remove("is-valid");
            item.classList.remove("is-valid");
            item.classList.add("is-invalid");
        })
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    sjekk(true);
}

/***
 * regex validation for 8 numbers, staring with 4 or 8
 * 
 * @param item -  field
 */
const validerTelefon = (item) => {
    const telefon = item.value;
    const regTelefon = new RegExp(`^[49][0-9]{7}$`); /* IKKE FERDIG */
    
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

/***
 * regex validation for email found online
 * 
 * @param item - field
 */
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

/***
 * called from all validations
 * checks if all fields are valid
 * then make save button available
 * 
 * @param bool - if kontaktperson
 */
const sjekk = (bool) => {
    if (bool) {
        if ($(`.is-valid`).length === 8){
            $("#lagre").attr("disabled", false);
        }
    } else {
        if ($(`.is-valid`).length === 3){
            $("#lagre").attr("disabled", false);
        }
    }
    
}

/***
 * checkes that all people are valid the order can be placed
 */
const sjekkBestill = () => {
    if ($(".btn-outline-success").length === Number(bestilling.reisende.voksne) + Number(bestilling.reisende.barn)){
        $("#bestill").attr('disabled', false)
    }
}

/***
 * closes input for person and person is restored to old state
 */
const avbryt = () => {
    $("#input-felter").attr('hidden', true)
    $("#personer").attr('hidden', false)
}

/***
 * on click for button made available in sjekkBestill
 * puts bestilling in localstorage
 * redirect to betal.html
 */
const sendBestilling = () => {
    bestilling.kontaktPerson = kontaktperson;
    bestilling.voksne = reisendeVoksen;
    bestilling.barn = reisendeBarn;
    localStorage.removeItem("formData");
    localStorage.setItem("betal", JSON.stringify(bestilling));
    
    window.location.href="/betal.html"
}
