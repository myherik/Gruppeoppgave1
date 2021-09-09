const skalHjem = () => {
  const check = $("#skalHjem").is(":checked");
  $("#hjemDato").attr("disabled", !check);
  if (!check){
    $("#hjemDato").val("");
    $("#hjemDato").removeClass("is-valid");
    $("#hjemDato").removeClass("is-invalid");
  }
}
const skalBil = () => {
  const check = $("#regCheck").is(":checked");
  $("#regNummer").attr("disabled", !check);
  if (!check){
    $("#regNummer").val("");
    $("#regNummer").removeClass("is-valid");
    $("#regNummer").removeClass("is-invalid");
  }
}
const videre = () => {
  const inputs = {
    ferjestrekning: $("#ferjestrekning").val(),
    utreise: $("#velgUtreise").val(),
    hjemDato: $("#skalHjem").is(":checked") ? $("#hjemDato").val(): null,
    regNummer: $("#regCheck").is(":checked") ? $("#regNummer").val(): null,
    reisende: {
      voksne: $("#voksen").val(),
      barn: $("#barn").val()
    }
    
  }
  localStorage.setItem("formData", JSON.stringify(inputs))
  console.log(JSON.parse(localStorage.getItem("formData")));
  
}
const validerUtreise = (item) => {
  const date = item.value;
  const today = new Date(Date.now()).getDay() + new Date(Date.now()).getMonth() + new Date(Date.now()).getFullYear();
  const chosenDay = new Date(date).getDay() + new Date(date).getMonth() + new Date(date).getFullYear();
  console.log(today);
  console.log(chosenDay);
  if (new Date(date) > new Date(Date.now()) || today === chosenDay){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
  }
}
const validerHjemreise = (item) => {
  const date = item.value;
  const utreiseDate = $("#velgUtreise").val()
  if(new Date(date) > new Date(utreiseDate)){
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
  }
  else if (item.value === ""){
    item.classList.remove("is-valid");
    item.classList.remove("is-invalid")
  }
  else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
  }
}
const validerRegnummer = () => {
  const regnummer = $("#regNummer").val()
  const regexRegnummer = new RegExp(`^[A-Z]{2}\\s[1-9]{1}[0-9]{4}$`)
  
  if (regexRegnummer.test(regnummer)){
    $("#regNummer").removeClass("is-invalid");
    $("#regNummer").addClass("is-valid");
  }
  else {
    $("#regNummer").removeClass("is-valid");
    $("#regNummer").addClass("is-invalid");
  }
  
}
