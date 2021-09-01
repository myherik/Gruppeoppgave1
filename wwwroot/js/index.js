const skalHjem = () => {
  const check = $("#skalHjem").is(":checked");
  $("#hjemDato").attr("disabled", !check);
}
const skalBil = () => {
  const check = $("#regCheck").is(":checked");
  $("#regNummer").attr("disabled", !check);
}
const videre = () => {
  const inputs = {
    ferjestrekning: $("#ferjestrekning").val(),
    velgUtreise: $("#velgUtreise").val(),
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