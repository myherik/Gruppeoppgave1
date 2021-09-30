$(() => {
    bestilling = JSON.parse(localStorage.getItem("betal"));
    $("#visPris").html(`Du skal betale ${bestilling.Pris},-\n til Color Line`)
})

let bestilling;

const validering = () => {
    const kortholder = $("#kortholder").val()
    const kortnummer = $("#kortnummer").val()
    const utlop = $("#dato").val()
    const cvv = $("#cvv").val()


    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){2,}$`);
    const regKort = new RegExp(`^[0-9]{16}$`)
    const regCvv = new RegExp(`^[0-9]{3}$`)
    
    const validNavn = regNavn.test(kortholder);
    const validKort = regKort.test(kortnummer);
    const validCvv = regCvv.test(cvv);
    const validUtlop = (Number(utlop.split("/")[1]) + 2000 > new Date().getFullYear()
            && Number(utlop.split("/")[0]) <= 12 
            && Number(utlop.split("/")[0]) > 0) 
        || (Number(utlop.split("/")[1]) + 2000 === new Date().getFullYear() 
            && Number(utlop.split("/")[0]) <= 12 
            && Number(utlop.split("/")[0]) > new Date().getMonth())
    
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
        $("#dato")[0].classList.add('is-invalid')
    } else {
        $("#dato")[0].classList.remove('is-invalid')
    }
    
    return validNavn && validKort && validUtlop && validCvv;
}

const betal = () => {

    if (validering()) {
        $.ajax({
            url: "/api/Bestilling",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(bestilling),
            success: data => {
                console.log(data);
                localStorage.setItem("ordre", JSON.stringify(data))
                window.location.href = "/bekreftelse.html";
            },
        })
    }
}