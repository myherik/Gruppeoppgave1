$(() => {
    bestilling = JSON.parse(localStorage.getItem("betal"));
    if (bestilling == null){
        window.location.href = "reisende.html";
    }
    $("#visPris").html(`Du skal betale ${bestilling.Pris},-\n til Color Line`)
})

let bestilling;

const validering = () => {
    const kortholder = $("#kortholder").val()
    const kortnummer = $("#kortnummer").val()
    const utlopM = $("#maaned").val()
    const utlopA = $("#aar").val()
    const cvv = $("#cvv").val()


    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){2,}$`);
    const regKort = new RegExp(`^[0-9]{16}$`)
    const regCvv = new RegExp(`^[0-9]{3}$`)
    
    const validNavn = regNavn.test(kortholder);
    const validKort = regKort.test(kortnummer);
    const validCvv = regCvv.test(cvv);
    const validUtlop = (Number(utlopA) + 2000 > new Date().getFullYear()
            && Number(utlopM) <= 12 
            && Number(utlopM) > 0) 
        || (Number(utlopA) + 2000 === new Date().getFullYear() 
            && Number(utlopM) <= 12 
            && Number(utlopM) > new Date().getMonth())
    
    if (!validNavn) {
        $("#kortholder")[0].classList.add('is-invalid')
    } else {
        $("#kortholder")[0].classList.remove('is-invalid')
    }

    if (!validKort) {
        $("#kortnummer")[0].classList.add('is-invalid')
    } else {
        $("#kortnummer")[0].classList.remove('is-invalid')
    }

    if (!validCvv) {
        $("#cvv")[0].classList.add('is-invalid')
    } else {
        $("#cvv")[0].classList.remove('is-invalid')
    }

    if (!validUtlop) {
        $("#aar")[0].classList.add('is-invalid')
        $("#maaned")[0].classList.add('is-invalid')
    } else {
        $("#aar")[0].classList.remove('is-invalid')
        $("#maaned")[0].classList.remove('is-invalid')
    }
    
    return validNavn && validKort && validUtlop && validCvv;
}

const betal = () => {

    if (validering()) {
        $("#btn-betal").attr('disabled', true);
        $.ajax({
            url: "/api/Bestilling",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(bestilling),
            success: data => {
                console.log(data);
                localStorage.removeItem("betal");
                sessionStorage.setItem("ordre", JSON.stringify(data))
                window.location.href = "/bekreftelse.html";
            },
        })
    }
}
const tall = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight']
const sendAar = (event) => {
    if ($("#maaned").val().length === 2 && tall.includes(event.key)){
        $("#aar").focus();
    }
}

const sendMaaned = (event) => {
    if ($("#aar").val().length === 0 && (event.key === 'Backspace' || event.key === 'ArrowLeft')){
        $("#maaned").focus();
    }
}