import { voituresInitiales } from "./data.js"

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const immatriculation = document.getElementById("immatriculation");
const categorie = document.getElementById("categorie");
const prixjour = document.getElementById("prix-jour");
const statut = document.getElementById("statut");
//if matricul in order one buy one 
// function conteur()
// {
//     let messagefex = "AUTO-";
//     let nbr1 = 0;
//     let nbr2 = 0;
//     let nbr3 = 0;
//     for (let i = 0; i <= voituresInitiales.length; i++) {
//         nbr3++;

//         if (nbr3 == 10) {
//             nbr3 = 0;
//             nbr2++;
//         }

//         if (nbr2 == 10) {
//             nbr2 = 0;
//             nbr1++;
//         }
//     }
//     return messagefex + nbr1 + nbr2 + nbr3
// }
function creerElement(tag, classList = "", content = "") {
    const element = document.createElement(tag);
    element.className = classList
    element.textContent = content
    return element;
}
const btn = document.getElementById("bouton-enregistrer");

function affecher() {
    const tableau = document.querySelector("tbody");
    tableau.textContent = "";

    voituresInitiales.forEach(function (voitur) {

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

        const column6 = creerElement("td",);
        const rowaction = creerElement("div", "row-actions", "");
        const modifierbutton = creerElement("button", "button button-edit", "Modifier");
        const supprimerbutton = creerElement("button", "button button-delete", "Supprimer");

        rowaction.append(modifierbutton, supprimerbutton);
        column6.append(rowaction);

        line.append(
            column1,
            column2,
            column3,
            column4,
            column5,
            column6
        );
        tableau.appendChild(line);
    });
}

function ajouter(event) {
    event.preventDefault();
    let exestnum = voituresInitiales.some(voitur => voitur.immatriculation === immatriculation.value)

    if (!(exestnum) && validationDeform(immatriculation.value))
    {
      if (marque.value === "" || modele.value == "" || immatriculation.value == "" || categorie.value == "" || prixjour.value == "" || statut.value == "") {
            alert("entre les information completement");
        }
        else {
            let nvvoitur = {
                "id": voituresInitiales.length + 1,
                "marque": marque.value,
                "modele": modele.value,
                "immatriculation": immatriculation.value,
                "categorie": categorie.value,
                "prixJour": prixjour.value,
                "statut": statut.value
            };
            voituresInitiales.push(nvvoitur);

            marque.value = "";
            modele.value = "";
            immatriculation.value = "";
            categorie.value = "";
            prixjour.value = "";
            statut.value = "";
            affecher();
        }   
    }
    else {
        alert("Votre numero de matricul est deja execst or la form est inccorect");
        immatriculation.value ="";
    }

}

function Modifier() {

}
function Supprimer() {

}
function validationDeform(immatriculation) {
    const pattern = /^[A-Z]+-\d+$/;
    let valid = pattern.test(immatriculation);
    return valid ;
}
btn.addEventListener("click", ajouter);
console.log(voituresInitiales);

affecher();