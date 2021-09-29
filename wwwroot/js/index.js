

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
    switch (item.value){
        case "Larvik-Hirtshals":
        case "Kristiansand-Hirtshals":
          let string = "<img class='boat' src='./res/SuperSpeed_2.jpg' alt='Danmark flagg'><p></p>" +
              "<img class='flags' src='./res/Flag_of_Denmark.svg' alt='Danmark flagg'>";
          flags.html(string);
          break;
          
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
