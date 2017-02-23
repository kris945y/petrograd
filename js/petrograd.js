window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt)
        // Klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode("true");
    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "imgs/large/" + produkt.billede + ".jpg";

    if (produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        // udsolgttekst skal fjernes
        var udsolgttext = klon.querySelector(".udsolgttext");
        udsolgttext.parentNode.removeChild(udsolgttext);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("gammeltext")

    }
    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
