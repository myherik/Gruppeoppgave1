$(() => {
    placeOrdre(JSON.parse(localStorage.getItem("ordre")))
})

const placeOrdre = (ordre) => {
    const el = $("#placeBekreftelseHere");
    
    let out = "<p>Takk for din bestilling!\n"
    out += `Din reise er ${ordre.ferjestrekning}\n`
    if (ordre.hjemreiseDato) {
        out += `Din reise er fra ${ordre.utreiseDato} til ${ordre.hjemreiseDato}`
    } else {
        out += `Din reise er ${ordre.utreiseDato}`
    }
    el.html(out)
}