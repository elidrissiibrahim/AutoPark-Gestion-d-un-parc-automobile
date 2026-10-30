import { voituresInitiales } from "./data.js"
let voitures = JSON.parse(
    localStorage.getItem("voitures")
) || [...voituresInitiales];
function sauvegarderVoitures() {
    localStorage.setItem(
        "voitures",
        JSON.stringify(voitures)
    );
}

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const immatriculation = document.getElementById("immatriculation");
const categorie = document.getElementById("categorie");
const prixjour = document.getElementById("prix-jour");
const statut = document.getElementById("statut");
const form = document.querySelector("form");
const recherche = document.getElementById("recherche")
let modeModifier = false;
let idVoitureModifier = null;


function creerElement(tag, classList = "", content = "") {
    const element = document.createElement(tag);
    element.className = classList
    element.textContent = content
    return element;
}
const btn = document.getElementById("bouton-enregistrer");

function affecher(liste = voitures) {
    const tableau = document.querySelector("tbody");
    tableau.textContent = "";

    liste.forEach(function (voitur) {

        const line = creerElement("tr", "", "");


        const column1 = creerElement("td", "", "");
        const nomvoiture = creerElement("strong", "", voitur.marque);
        column1.append(nomvoiture);


        const column2 = creerElement("td", "", voitur.modele);

        const column3 = creerElement("td", "", "");
        const autoid = creerElement("span", "registration", voitur.immatriculation);
        column3.append(autoid);

        const column4 = creerElement("td", "", voitur.categorie);

        const column5 = creerElement("td", "price", voitur.prixJour);
        const tagdh = creerElement("span", "", "DH / jour");
        column5.append(tagdh);

        const column6 = creerElement("td", "","");
        let rowdistat;
        switch (voitur.statut) {
            case "Disponible":
                rowdistat = creerElement("span","badge badge-disponible",voitur.statut);
                break;
            case "Louée":
                rowdistat = creerElement("span","badge badge-louee",voitur.statut);
                break;
            case "En maintenance":
                rowdistat = creerElement("span","badge badge-maintenance",voitur.statut);
                break;
        }
        column6.append(rowdistat); 
        

        const column7 = creerElement("td",);
        const rowaction = creerElement("div", "row-actions", "");
        const modifierbutton = creerElement("button", "button button-edit", "Modifier");

        modifierbutton.addEventListener("click" , () =>{
            Modifier(voitur.id);
        })

        const supprimerbutton = creerElement("button", "button button-delete", "Supprimer");

        supprimerbutton.addEventListener("click" , () =>{
            supprimer(voitur.id);
        });
    
        rowaction.append(modifierbutton, supprimerbutton);
        column7.append(rowaction);

        line.append(
            column1,
            column2,
            column3,
            column4,
            column5,
            column6,
            column7
        );
        tableau.appendChild(line);
    });
}

function ajouter(event) {
    event.preventDefault();

    if (
        marque.value === "" ||
        modele.value === "" ||
        immatriculation.value === "" ||
        categorie.value === "" ||
        prixjour.value === "" ||
        statut.value === ""
    ) {
        alert("entre les information completement");
        return;
    }

    if (!validationDeform(immatriculation.value)) {
        alert("Matricule incorrect");
        return;
    }

    let exestnum = voitures.some(voitur =>
        voitur.immatriculation === immatriculation.value &&
        voitur.id !== idVoitureModifier
    );

    if (exestnum) {
        alert("Cette matricule existe deja");
        return;
    }

    if (modeModifier === true) {

        let index = voitures.findIndex(voitur =>
            voitur.id === idVoitureModifier
        );

        voitures[index].marque = marque.value;
        voitures[index].modele = modele.value;
        voitures[index].immatriculation = immatriculation.value;
        voitures[index].categorie = categorie.value;
        voitures[index].prixJour = prixjour.value;
        voitures[index].statut = statut.value;

        modeModifier = false;
        idVoitureModifier = null;

        btn.textContent = "Ajouter la voiture";

    } else {

        let nvvoitur = {
            id: voitures.length + 1,
            marque: marque.value,
            modele: modele.value,
            immatriculation: immatriculation.value,
            categorie: categorie.value,
            prixJour: prixjour.value,
            statut: statut.value
        };

        voitures.push(nvvoitur);
    }

    sauvegarderVoitures();
    form.reset();
    affecher();
}
function Modifier(id) {

    let voiture = voitures.find(voitur => voitur.id === id);

    marque.value = voiture.marque;
    modele.value = voiture.modele;
    immatriculation.value = voiture.immatriculation;
    categorie.value = voiture.categorie;
    prixjour.value = voiture.prixJour;
    statut.value = voiture.statut;

    modeModifier = true;
    idVoitureModifier = id;

    btn.textContent = "Modifier la voiture";
}
function supprimer(id) {
if(!confirm(`vous vollez supprem cette voiture ?`)){return};

    let index = voitures.findIndex(voitur => voitur.id == id)
    if (index !== -1){
        voitures.splice(index , 1);
        console.log(voitures);
        sauvegarderVoitures();
        affecher();
    }
}
function validationDeform(immatriculation) {
    const pattern = /^[A-Z]+-\d+$/;
    let valid = pattern.test(immatriculation);
    return valid ;
}
function clasmentettrie(){
 const elemdcherch = recherche.value ;
 
 const resultat = voitures.filter((voitur) => {
    return(
        voitur.marque.includes(elemdcherch)||
        voitur.modele.includes(elemdcherch)||
        voitur.immatriculation.includes(elemdcherch)||
        voitur.categorie.includes(elemdcherch)||
        voitur.prixJour.toString().includes(elemdcherch)||
        voitur.statut.includes(elemdcherch))
 });
 affecher(resultat);
}
recherche.addEventListener('input', clasmentettrie);
btn.addEventListener("click", ajouter);
affecher();