

let bFerjestrekning = false, bUtreise = false, bVoksne = false, bBarn = true;
let bHjemreise = false;
let bRegnummer = false;

$(()=>{
  
})
const sjekkVidere = () => {
  if ($("#skalHjem").is(":checked")){
    if (bHjemreise === false){
      $("#videre").attr("disabled", true);
      $("#videreLink").attr("href", "#");
      return;
    }
  }
  if ($("#regCheck").is(":checked")){
    if (bRegnummer === false){
      $("#videre").attr("disabled", true);
      $("#videreLink").attr("href", "#");
      return;
    }
  }
  if (bFerjestrekning === true && bUtreise == true && bVoksne === true && bBarn === true){
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

const videre = () => {
  const inputs = {
    Id: 0,
    Ferjestrekning: $("#ferjestrekning").val(),
    UtreiseDato: $("#velgUtreise").val(),
    HjemreiseDato: $("#skalHjem").is(":checked") ? $("#hjemDato").val(): null,
    Registreringsnummer: $("#regCheck").is(":checked") ? $("#regNummer").val(): null,
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
  if (item.value === "Larvik-Hirtshals" || item.value === "Kristiansand-Hirtshals" || item.value === "Sandefjord-Strömstad" || item.value === "Oslo-Kiel"){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    bFerjestrekning = true;
    sjekkVidere();
    const flags = $("#flags");
    let string;
    switch (item.value){
        case "Larvik-Hirtshals":
          string = "<img class='boat' src='./res/SuperSpeed_2.jpg' alt='Danmark flagg'><p style='max-width: 50%' '>Overfarten med SuperSpeed" +
              " fra Larvik tar kun 3 timer og 45 minutter. Det lønner seg å bestille tidlig, da sikrer du deg god pris" +
              " og plass på ønsket avgang. Medlemmer av Color Club får de beste prisene på bilpakke til Danmark.</p>";
          flags.html(string);
          break;
      case "Kristiansand-Hirtshals":
          string = "<img class='boat' src='./res/SuperSpeed_2.jpg' alt='Danmark flagg'><p style='max-width: 50%' '>Det " +
              "lønner seg å bestille tidlig, da sikrer du deg en god pris og plass på ønsket avgang. Overfarten med " +
              "SuperSpeed fra Kristiansand tar kun 3 timer og 15 minutter. Medlemmer av Color Club får de beste prisene " +
              "på bilpakke til Danmark.</p>";
          flags.html(string);
          break;
      case "Oslo-Kiel":
          string = "<img class='boat' src='./res/Color_Magic.jpeg' alt='Danmark flagg'><p style='max-width: 50%' '>Det " +
              "lønner seg å bestille tidlig, da sikrer du deg en god pris og plass på ønsket avgang. Overfarten med " +
              "SuperSpeed fra Kristiansand tar kun 3 timer og 15 minutter. Medlemmer av Color Club får de beste prisene " +
              "på bilpakke til Danmark.</p>";
          flags.html(string);
          break;
      case "Sandefjord-Strömstad":
          string = "<img class='boat' src='./res/Color_Hybrid.jpeg' alt='Danmark flagg'><p style='max-width: 50%' '>Kjør " +
              "bilen om bord og nyt overfarten fra Sandefjord til Strømstad på kun 2 ½ time. Underveis kan du slappe av," +
              " kose deg med et godt måltid og handle taxfree-varer til svært gunstige priser. TIPS! Det lønner seg å " +
              "være medlem av Color Club, da får du blant annet gratis reise med bil på flere avganger, og ytterligere " +
              "10% rabatt på en mengde varer.</p>";
          flags.html(string);
          
          
          
    }
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    bFerjestrekning = false;
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