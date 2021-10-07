
let bFerjestrekning = false, bUtreise = false, bVoksne = false, bBarn = true;
let bHjemreise = false;
let bRegnummer = false;
let bLugar = false;
let bestilling = {}
let reiser = {}
let lugarer = {}

/***
 * gets all routes from backend and places in select
 * all routes gets added to hashmap reiser
 */
$(()=>{
  $("#voksen").val(1).change()
  
  $.get("api/reise", data => {
    let options = ""
    for (let reise of data) {
      reiser[reise.strekning] = reise;
      options += `<option value="${reise.strekning}">${reise.strekning}</option>`
    }
    $("#ferjestrekning").append(options)
  })
})

/***
 * on every changes in inputs the price is calculated by the 
 * numbers served form backend and input given from user
 * the price then gets displayed to user
 */
const setPris = () => {
  let pris = 0;
  const rute = $("#ferjestrekning").val()
  if (reiser[rute] != null) {
    pris += reiser[rute].prisPerGjest
    
    const lugar = $("#lugar").val()
    let antall_barn = Number($("#barn").val());
    let antall_voksen = Number($("#voksen").val());
    // antall_lugarer depends on if the user has chosen lugar, and that the lugar is valid
    let antall_lugarer = $("#lugarCheck").is(":checked") && lugarer[lugar] != null ?
        Math.ceil((antall_voksen + antall_barn)/lugarer[lugar].antall):
        0

    pris *= antall_voksen + (0.5*antall_barn);

    pris += antall_lugarer !== 0 ? Number(antall_lugarer*(lugarer[lugar].pris)) : 0

    pris += $("#regCheck").is(":checked") ? reiser[rute].prisBil : 0

    pris *= $("#skalHjem").is(":checked") ? 2 : 1
    
    bestilling.pris = pris;
    bestilling.antallLugarer = antall_lugarer;
  }
  
  $("#setPris").text(pris)
}

const sjekkVidere = () => {
  setPris()
  if ($("#skalHjem").is(":checked")){
    if (bHjemreise === false){
      $("#videre").attr("disabled", true);
      $("#videreLink").attr("href", "#");
      return;
    }
  }
  if ($("#regCheck").is(":checked")){
    if (!bRegnummer){
      $("#videre").attr("disabled", true);
      $("#videreLink").attr("href", "#");
      return;
    }
  }
  if ($("#lugarCheck").is(":checked")){
    if (!bLugar){
      $("#videre").attr("disabled", true);
      $("#videreLink").attr("href", "#");
      return;
    }
  }
  if (bFerjestrekning && bUtreise && bVoksne && bBarn){
    $("#videre").attr("disabled", false);
  }
  else {
    $("#videre").attr("disabled", true);
  }
}

const skalHjem = () => {
  const check = $("#skalHjem").is(":checked");
  $("#hjemDato").attr("disabled", !check);
  if (!check){
    $("#hjemDato").val("");
    $("#hjemDato").removeClass("is-valid");
    $("#hjemDato").removeClass("is-invalid");
    bHjemreise = false;
    sjekkVidere();
  }
  else {
    sjekkVidere();
  }
}

const setReise = (reise) => {
  //console.log(reise)
  $('#ferjestrekning option').removeAttr('selected')
  $(`#ferjestrekning option[value=${reise}]`).attr('selected','selected').change();
}

const skalBil = () => {
  const check = $("#regCheck").is(":checked");
  $("#regNummer").attr("disabled", !check);
  if (!check){
    $("#regNummer").val("");
    $("#regNummer").removeClass("is-valid");
    $("#regNummer").removeClass("is-invalid");
    bRegnummer = false;
    sjekkVidere();
  }
  else {
    sjekkVidere();
  }
}

const skalLugar = () => {
  const check = $("#lugarCheck").is(":checked");
  $("#lugar").attr("disabled", !check);
  if (!check){
    $("#lugar").val("Velg lugar");
    $("#lugar").removeClass("is-valid");
    $("#lugar").removeClass("is-invalid");
    bLugar = true;
    sjekkVidere();
  }
  else {
    bLugar = false;
    sjekkVidere();
  }
}

const videre = () => {
  const inputs = {
    Id: 0,
    Ferjestrekning: $("#ferjestrekning").val(),
    UtreiseDato: $("#velgUtreise").val(),
    HjemreiseDato: $("#skalHjem").is(":checked") ? $("#hjemDato").val(): null,
    Registreringsnummer: $("#regCheck").is(":checked") ? $("#regNummer").val(): null,
    LugarType: lugarer[$("#lugar").val()] != null ? {id: lugarer[$("#lugar").val()].id} : null,
    Pris: bestilling.pris,
    AntallLugarer: bestilling.antallLugarer,
    reisende: {
      voksne: $("#voksen").val(),
      barn: $("#barn").val()
    }
  }
  localStorage.setItem("formData", JSON.stringify(inputs))
  console.log(JSON.parse(localStorage.getItem("formData")));
  window.location.href = "/reisende.html";
}

const validerStrekning = (item) => {
  if (reiser[item.value] != null){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    
    
    
    bFerjestrekning = true;
    const flags = $("#flags");
    reise = reiser[item.value];

    let url = "api/reise/lugar/" + reise.id;
    $.get(url, data => {
      let out = "<option disabled selected>Velg lugar</option>"
      for (let lugar of data) {
        lugarer[lugar.type] = lugar;
        out += `<option value='${lugar.type}'>${lugar.type}</option>`
      }
      
      $("#lugar").html(out)
    })
    
    let string = `<img class='boat' src='${reise.bildeLink}' alt='Danmark flagg'><p style='max-width: 50%'>` +
        `<p style='max-width: 50%'>${reise.info}</p>`
    flags.html(string)
    if (!reise.maLugar) {
      setIngenLugar();
    } else {
      $("#lugar")[0].classList.remove("is-valid")
      $("#lugarCheck").prop('checked', true);
      $("#lugarCheck").attr('disabled', true);
      $("#lugar").attr('disabled', false)
    }
    sjekkVidere();
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bFerjestrekning = false;
    sjekkVidere();
  }
}

const setIngenLugar = () => {
  bLugar = true;
  $("#lugarCheck").attr('disabled', false);
  $("#lugarCheck").prop('checked', false);
  $("#lugar").attr('disabled', true);
  $("#lugar").val("Velg lugar");
  $("#lugar").removeClass("is-valid");
  $("#lugar").removeClass("is-invalid");
}

const validerLugar = (item) => {
  if (lugarer[item.value] != null){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    bLugar = true;
    sjekkVidere();
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bLugar = false;
    sjekkVidere();
  }
}

const validerUtreise = (item) => {
  const date = item.value;
  const hjemreise = $("#hjemDato").val();
  const today = new Date(Date.now()).getDay() + new Date(Date.now()).getMonth() + new Date(Date.now()).getFullYear();
  const chosenDay = new Date(date).getDay() + new Date(date).getMonth() + new Date(date).getFullYear();
  if (new Date(date) > new Date(Date.now()) || today === chosenDay){
    if (hjemreise === "" || new Date(hjemreise) > new Date(date)){
      item.classList.remove("is-invalid");
      item.classList.add("is-valid");
      bUtreise = true;
      sjekkVidere();
    }
    else {
      item.classList.remove("is-valid");
      item.classList.add("is-invalid");
      bUtreise = false;
      sjekkVidere();
    }
    
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bUtreise = false;
    sjekkVidere();
  }
}

const validerHjemreise = (item) => {
  const date = item.value;
  const utreiseDate = $("#velgUtreise").val();
  if(new Date(date) > new Date(utreiseDate)){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    $("#velgUtreise").removeClass("is-invalid");
    $("#velgUtreise").addClass("is-valid");
    bUtreise = true;
    bHjemreise = true;
    sjekkVidere();
  }
  else if (item.value === ""){
    item.classList.remove("is-valid");
    item.classList.remove("is-invalid")
    bHjemreise = false;
    sjekkVidere();
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bHjemreise = false;
    sjekkVidere();
  }
}

const validerRegnummer = () => {
  const regnummer = $("#regNummer").val()
  const regexRegnummer = new RegExp(`^[A-Z]{2}\\s[1-9]{1}[0-9]{4}$`)
  
  if (regexRegnummer.test(regnummer)){
    $("#regNummer").removeClass("is-invalid");
    $("#regNummer").addClass("is-valid");
    bRegnummer = true;
    sjekkVidere();
  }
  else {
    $("#regNummer").removeClass("is-valid");
    $("#regNummer").addClass("is-invalid");
    bRegnummer = false;
    sjekkVidere();
  }
}

const validerVoksne = (item) => {
  const antall = item.value;
  if (antall > 0 && (antall % 1 === 0)){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    bVoksne = true;
    sjekkVidere();
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bVoksne = false;
    sjekkVidere();
  }
}

const validerBarn = (item) => {
  const antall = item.value;
  if (antall >= 0 && (antall % 1 === 0)){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    bBarn = true;
    sjekkVidere();
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bBarn = false;
    sjekkVidere();
  }
}

const mini = (land) => {
  const ger = $("#collapseGermany");
  const den = $("#collapseDenmark");
  const swe = $("#collapseSweden");
  
  switch (land){
    case 'sweden':
      den.collapse("hide");
      ger.collapse("hide");
      break;
    case 'germany':
      den.collapse("hide");
      swe.collapse("hide");
      break;
    case 'denmark':
      ger.collapse("hide");
      swe.collapse("hide");
      break;
  }
}