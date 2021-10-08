/***
 * getting bestilling from localstorage ready for payment
 * if no bestilling is stored user gets returned to reisende.html
 * else price is put in payment-form
 */
$(() => {
    bestilling = JSON.parse(localStorage.getItem("betal"));
    if (bestilling == null){
        window.location.href = "reisende.html";
    }
    $("#visPris").html(`Du skal betale ${bestilling.Pris},-\n til Color Line`)
})

let bestilling;

/***
 * methode is called when user clicks pay,
 * get all info from form, validates all input
 * 
 * @returns {boolean} - if all validations is passed
 */
const validering = () => {
    const kortholder = $("#kortholder").val()
    const kortnummer = $("#kortnummer").val()
    const utlopM = $("#maaned").val()
    const utlopA = $("#aar").val()
    const cvv = $("#cvv").val()


    const regNavn = new RegExp(`^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){2,}$`);
    const regKort = new RegExp(`(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6]
[0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]
{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)`)
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

/***
 * if validering() is passed the bestilling is sent to backend for storing in database
 * the user gets sent to bekreftelse.html to display ordre
 * else the user get information about what they have to change
 */
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

/***
 * list of buttons for sendArr to run
 * @type {string[]}
 */
const tall = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight']
/***
 * if the key from event is in list tall, the focus is moved to input year
 * 
 * @param event - keyupo event
 */
const sendAar = (event) => {
    if ($("#maaned").val().length === 2 && tall.includes(event.key)){
        $("#aar").focus();
    }
}

/***
 * if the key from event matches if the focus is moved to maaned
 * 
 * @param event - keyup event
 */
const sendMaaned = (event) => {
    if ($("#aar").val().length === 0 && (event.key === 'Backspace' || event.key === 'ArrowLeft')){
        $("#maaned").focus();
    }
}