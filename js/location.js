 import { voituresInitiales } from "./data.js";
 import {config , selectedConfig} from "./starter.js";


 const radio_voitures = document.getElementById("radio_voitures");
 const dateDebut = document.getElementById("dateDebut");
 const dateFin = document.getElementById("dateFin");

function afficherVoitures(){

    config.voitures.forEach((element)=>{
        const label = document.createElement('label');
        radio_voitures.append(label);
        label.classList.add("radio_voiture","border-1","border-[#D8E1EF]","p-4","rounded-2xl","has-checked:bg-[#F8FAFF]","has-checked:border-3","has-checked:border-[#2855d7]");

        const div_label = document.createElement('div');
        label.append(div_label);
        div_label.classList.add('flex','justify-between');

        const p_categorie = document.createElement('p');
        div_label.append(p_categorie);
        p_categorie.classList.add("text-[#2852E3]","bg-[#EEF2FF]","p-2","rounded-md","font-bold");
        p_categorie.textContent = element.categorie;

        const input_radio = document.createElement('input');
        div_label.append(input_radio);
        input_radio.setAttribute("type","radio");
        input_radio.setAttribute("value",element);
        input_radio.setAttribute("name","voiture");
        input_radio.classList.add("border-[#2852E3]","cursor-pointer");

        const h_marque_modele = document.createElement("h4");
        label.append(h_marque_modele);
        h_marque_modele.classList.add("font-bold","text-base","my-4");
        h_marque_modele.textContent = `${element.marque} ${element.modele}`;
        const p_disponible = document.createElement("p");
        label.append(p_disponible);
        p_disponible.classList.add("text-xs","text-[#16835C]","mb-4");
        p_disponible.textContent = element.statut;

        const h_prix = document.createElement("h4");
        label.append(h_prix);
        h_prix.classList.add("font-bold","text-base","text-[#2852E3]","mb-4");
        h_prix.textContent = `${element.prixJour} MAD / jour`;

        input_radio.addEventListener("click", ()=>{
                    // check = true;
                    // voiture_choisis = element;
                    // modele_marque.textContent = `${element.marque} ${element.modele}`;
                    // categorie_prix.textContent = `${element.categorie} · ${element.prixJour} MAD / jour`;
                    // prixJour.textContent = element.prixJour;
                    // selectedConfig.prixJours = selectedConfig.nbrJour*voiture_choisis.prixJour ;
                    // selectedConfig.prixTotal = selectedConfig.prixJours + selectedConfig.prixRecuperation ;
                    // prixJours.textContent = `${selectedConfig.prixJours} MAD`;
                    // prixTotal.textContent = selectedConfig.prixTotal;
        })
    })
}

afficherVoitures();

