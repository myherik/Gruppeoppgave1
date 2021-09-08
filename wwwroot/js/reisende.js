
let bestilling;

$(()=>{
    bestilling = JSON.parse(localStorage.getItem("formData"));
    formatTable();
    //localStorage.clear();
})


const formatTable = () => {
    let outVoksen = ""
    for (let i = 1; i <= Number(bestilling.reisende.voksne); i++) {
        outVoksen = `<tr><td><button class="btn btn-outline-info" data-bs-toggle="collapse" 
        data-bs-target="#tableVoksen${i}" 
        aria-expanded="false" 
        aria-controls="tableVoksen${i}">Fyll ut voksen #${i}</button><div class="collapse" id="tableVoksen${i}"><table class='table' >
        <tbody>
        <tr><td><label for="fornavnVoksen${i}">Fornavn</label></td>
        <td><input class="form-control" type="text" id="fornavnVoksen${i}"></td></tr>
        <tr><td><label for="etternavnVoksen${i}">Etternavn</label></td>
        <td><input class="form-control" type="text" id="etternavnVoksen${i}"></td></tr>
        <tr><td><label for="datoVoksen${i}">Fødselsdato</label></td>
        <td><input class="form-control" type="date" id="datoVoksen${i}"></td></tr>
        </tbody></table></div></td></tr>
      `
        $("#voksen").append(outVoksen)
    }
    let outBarn = ""
    for (let i = 1; i <= Number(bestilling.reisende.barn); i++) {
        outBarn = `<tr><td><button class="btn btn-outline-info" data-bs-toggle="collapse" 
        data-bs-target="#table${i}" 
        aria-expanded="false" 
        aria-controls="table${i}">Fyll ut barn #${i}</button><div class="collapse" id="table${i}"><table class='table' >
        <tbody>
        <tr><td><label for="fornavn${i}">Fornavn</label></td>
        <td><input onkeyup="validerFornavn(this)" class="form-control" type="text" id="fornavn${i}"></td></tr>
        <tr><td><label for="etternavn${i}">Etternavn</label></td>
        <td><input onkeyup="validerEtternavn(this)" class="form-control" type="text" id="etternavn${i}"></td></tr>
        <tr><td><label for="dato${i}">Fødselsdato</label></td>
        <td><input onchange="validerBursdag(this)" class="form-control" type="date" id="dato${i}"></td></tr>
        </tbody></table></div></td></tr>
      `
        $("#barn").append(outBarn)
    }
}

const validerFornavn = (item) => {
    const navn = item.value;
    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
    
}
const validerEtternavn = (item) => {
    const navn = item.value;
    const regNavn = new RegExp(`^[A-ZÆØÅ]{1}[a-zæøå]{0,}$`);
    if (regNavn.test(navn)){
        item.classList.remove("is-invalid");
        item.classList.add("is-valid");
    }
    else {
        item.classList.remove("is-valid");
        item.classList.add("is-invalid");
    }
}