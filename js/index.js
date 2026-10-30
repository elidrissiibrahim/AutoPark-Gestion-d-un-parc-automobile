const section = document.getElementById("section");

function creerElement(tag, classList = "", content = "") {
    const element = document.createElement(tag);
    element.className = classList;
    element.textContent = content;
    return element;
}
function afficher() {

    let voitures = JSON.parse(localStorage.getItem("voitures")) || [];

    let disponibles = voitures.filter(function(voiture) {
        return voiture.statut === "Disponible";
    });
    let Louee = voitures.filter(function(voiture) {
        return voiture.statut === "Louée";
    });
    let maintenance = voitures.filter(function(voiture) {
        return voiture.statut === "En maintenance";
    });
    let total = voitures.length;

creeCart("Disponible", disponibles.length);
creeCart("Louée", Louee.length);
creeCart("En maintenance", maintenance.length);
creeCart("total", total);

}

function creeCart(titre , number){
    const cart = creerElement(
        "article",
        "border h-[200px] w-[250px] rounded-xl flex flex-col justify-center items-center gap-[10px] p-[10px]"
    );

    const h2 = creerElement(
        "h2",
        "border text-2xl bg-white rounded-xl w-[200px] flex justify-center",
        titre
    );

    const div = creerElement(
        "div",
        "bg-white h-[180px] w-[210px] rounded-xl flex flex-col items-center justify-center gap-[20px]"
    );

    const num = creerElement("p", "text-6xl", number);

    const voi = creerElement("p", "", "Voitures");

    div.append(num, voi);

    cart.append(h2, div);

    section.append(cart);
}
afficher();