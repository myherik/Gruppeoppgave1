
let bestilling;

$(()=>{
    bestilling = JSON.parse(localStorage.getItem("formData"))
    if (bestilling == null){
        window.location.href = "index.html";
    }
    console.log(bestilling);
    setReisende();
    formaterTable();
})
let reisendeVoksen = [];
let reisendeBarn = [];

const setReisende = () => {
    for ( let i = 0; i < bestilling.reisende.voksne; i++) {
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
    let string = `<button onclick='setVoksen(0, this)' class='btn btn-outline-secondary'>Kontaktpersion 18+</button>`;
    for (let i = 1; i < Number(bestilling.reisende.voksne); i++) {
        string += `<button onclick='setVoksen(${i}, this)' class='btn btn-outline-secondary'>Reisende 18+ ${i+1}</button>`
    }
    for (let i = 0; i < Number(bestilling.reisende.barn); i++) {
        string += `<button onclick='setBarn(${i}, this)' class='btn btn-outline-secondary'>Reisende barn ${i+1}</button>`
    }
    el.html(string)
}

const setVoksen = (index, item) => {
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
    fornavn.keyup(() => validerFornavn(index, fornavn[0], "voksen"))
    etternavn.unbind()
    etternavn.keyup(() => validerEtternavn(index, etternavn[0], "voksen"))
    dato.unbind()
    dato.change(() => validerBursdag(index, dato[0], "voksen"))

    lagre.unbind()
    lagre.click(() => {
        item.classList.add("btn-outline-success")
        item.classList.remove("btn-outline-secondary")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        sjekkBestill();
    })
}

const setBarn = (index, item) => {
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
    fornavn.keyup(() => validerFornavn(index, fornavn[0], "barn"))
    etternavn.unbind()
    etternavn.keyup(() => validerEtternavn(index, etternavn[0], "barn"))
    dato.unbind()
    dato.change(() => validerBursdag(index, dato[0], "barn"))

    lagre.unbind()
    lagre.click(() => {
        item.classList.add("btn-outline-success")
        item.classList.remove("btn-outline-secondary")
        $("#personer").attr('hidden', false)
        $("#input-felter").attr('hidden', true)
        sjekkBestill();
    })
}

const validerFornavn = (index, item, type) => {
    const navn = item.value;
    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        switch (type) {
            case 'voksen': {
                reisendeVoksen[index].fornavn = navn;
                break;
            }
            case 'barn': {
                reisendeBarn[index].fornavn = navn;
            }
        }
        sjekk();
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
        sjekk();
    }
}

const validerEtternavn = (index, item, type) => {
    const navn = item.value;
    const regNavn = new RegExp(`^[A-ZÆØÅ]{1}[a-zæøå]{0,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
        switch (type) {
            case 'voksen': {
                reisendeVoksen[index].etternavn = navn;
                break;
            }
            case 'barn': {
                reisendeBarn[index].etternavn = navn;
            }
        }
        sjekk();
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
        sjekk();
    }
}

const validerBursdag = (index, item, type) => {
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
                sjekk();
                reisendeVoksen[index].Foedselsdato = date;
                $("#validMsg").text('')
            } else {
                item.classList.remove("is-valid")
                item.classList.add("is-invalid")
                sjekk();
                $("#validMsg").text(`Fødselsdato til ${type} #${index} er ikke gyldig`)
            }
            break;
        }
        case 'barn' : {
            if (diffYear >= 0 && diffYear < 18) {
                item.classList.add("is-valid")
                item.classList.remove("is-invalid")
                sjekk();
                reisendeBarn[index].Foedselsdato = date;
                $("#validMsg").text('')
            } else {
                item.classList.remove("is-valid")
                item.classList.add("is-invalid")
                sjekk();
                $("#validMsg").text(`Fødselsdato til ${type} #${index} er ikke gyldig`)
            }
        }
    }
}

const sjekk = () => {
    if ($(`.is-valid`).length === 3){
        $("#lagre").attr("disabled", false);
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
    bestilling.voksne = reisendeVoksen;
    bestilling.barn = reisendeBarn;
    localStorage.removeItem("formData");
    localStorage.setItem("betal", JSON.stringify(bestilling));
    
    window.location.href="/betal.html"
}
