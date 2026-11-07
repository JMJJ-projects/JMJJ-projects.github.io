let voir_Info = document.getElementById('Voir_info');
let listes_Professeurs=[];
let listes_MDP_Professeurs=[];
let listes_Etudiants=[];
let listes_MDP_Etudiants=[];
let listes_ID_Professeurs = [];
let listes_ID_Etudiants = [];

let listes_Formation_Etudiants = [];


const selectRole = document.getElementById('choix');
const divFormation = document.getElementById('div_formation');

function charger_Infos(fichier){
    return fetch(fichier)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier');
            }
            return response.text();
        })
        .then(data => {
            const lignes = data.split(/\r?\n/).filter(l => l.trim() !== '').map(l => l.replace(/^\d+\s*:/, '').trim());
            return lignes;
        })
}

function creer_Tableau_Prof(){
    let div_prof=document.getElementById('div_tableau_prof');
    div_prof.innerHTML = '';
    let table_prof=document.createElement('table');
    let thead=document.createElement('thead');
    let head_tr=document.createElement('tr');
    let colonne0 = document.createElement('th');
    let colonne1=document.createElement('th');
    let colonne2=document.createElement('th');
    let colonne3=document.createElement('th');
    //let colonne4 = document.createElement('th');

    colonne0.textContent="ID";
    colonne1.textContent="Professeurs";
    colonne2.textContent="Mot De Passe";
    colonne3.textContent="Mail";
    //colonne4.textContent = "Formation";

    head_tr.append(colonne0, colonne1, colonne2, colonne3);
    thead.append(head_tr);
    table_prof.append(thead);

    let tbody=document.createElement('tbody');
    for (let i = 0; i < listes_Professeurs.length; i++) {
        const tr=document.createElement('tr');
        const th_id=document.createElement('th');
        const th_name=document.createElement('th');
        const th_mdp=document.createElement('th');
        const th_mail=document.createElement('th');
        //const th_formation = document.createElement('th');

        th_id.textContent = listes_ID_Professeurs[i];
        th_name.textContent = listes_Professeurs[i];
        th_mdp.textContent = listes_MDP_Professeurs[i];
        th_mail.textContent = genererEmail(listes_Professeurs[i], 'prof');
        //th_formation.textContent = listes_Formation_Professeurs[i];
        
        tr.append(th_id, th_name, th_mdp, th_mail);
        tbody.append(tr);
    }
    table_prof.append(tbody);
    div_prof.append(table_prof);

}


function creer_Tableau_Eleves(){
    let div_eleve=document.getElementById('div_tableau_eleve');
    div_eleve.innerHTML = '';
    let table_eleve=document.createElement('table');
    let thead=document.createElement('thead');
    let head_tr=document.createElement('tr');
    
    let colonne0=document.createElement('th');
    let colonne1=document.createElement('th');
    let colonne2=document.createElement('th');
    let colonne3=document.createElement('th');
    let colonne4 = document.createElement('th');

    colonne0.textContent="ID";
    colonne1.textContent="Etudiants";
    colonne2.textContent="Mot De Passe";
    colonne3.textContent="Mail";
    colonne4.textContent = "Formation";

    head_tr.append(colonne0, colonne1, colonne2, colonne3,colonne4);

    thead.append(head_tr);
    table_eleve.append(thead);

    let tbody=document.createElement('tbody');
    for (let i = 0; i < listes_Etudiants.length; i++) {
        const tr=document.createElement('tr');
        const th_id=document.createElement('th');
        const th_name=document.createElement('th');
        const th_mdp=document.createElement('th');
        const th_mail=document.createElement('th');
        const th_formation = document.createElement('th');

        th_id.textContent = listes_ID_Etudiants[i];
        th_name.textContent = listes_Etudiants[i];
        th_mdp.textContent = listes_MDP_Etudiants[i];
        th_formation.textContent = listes_Formation_Etudiants[i];
        th_mail.textContent = genererEmail(listes_Etudiants[i], 'etudiant');

        tr.append(th_id, th_name, th_mdp, th_mail, th_formation);
        tbody.append(tr);
    }
    table_eleve.append(tbody);
    div_eleve.append(table_eleve);
}



function genererID(role) {
    const random = Math.floor(100 + Math.random() * 900); // génère un nombre entre 100 et 999
    if (role === 'prof') {
        return `11${random}`;
    } else if (role === 'etudiant') {
        return `122${random}`;
    } else {
        return `000${random}`; // fallback
    }
}

function genererEmail(nom, role) {
    const nomSanitise = nom.trim().toLowerCase();
    if (role === 'prof') {
        return `${nomSanitise}@ensgn_uspn13.fr`;
    } else if (role === 'etudiant') {
        return `${nomSanitise}@etud_uspn13.fr`;
    } else {
        return `${nomSanitise}@uspn13.fr`; // fallback
    }
}


window.addEventListener("load", () => {
    // Met à jour l'affichage au chargement
    mettreAJourAffichageFormation();

    // Réagit au changement de rôle
    selectRole.addEventListener('change', mettreAJourAffichageFormation);
    Promise.all([
      charger_Infos('Professeurs.txt'),
      charger_Infos('MDP_Professeurs.txt'),
      charger_Infos('Etudiants.txt'),
      charger_Infos('MDP_Etudiants.txt')
    ])
    .then(([professeurs, mdpProfesseurs, etudiants, mdpEtudiants]) => {
      listes_Professeurs = professeurs;
      listes_MDP_Professeurs = mdpProfesseurs;
      listes_Etudiants = etudiants;
      listes_MDP_Etudiants = mdpEtudiants;
      listes_ID_Professeurs = professeurs.map(() => genererID('prof'));
      listes_ID_Etudiants = etudiants.map(() => genererID('etudiant'));
      
      creer_Tableau_Prof();
      creer_Tableau_Eleves();
    })
    .catch(error => {
      console.error('Une erreur est survenue lors du chargement des fichiers :', error);
    });
});

let bouton_effacer=document.getElementById('Effacer');

bouton_effacer.addEventListener("click", () => {
    let id_a_effacer = document.getElementById('user_a_effacer').value.trim();
    let index = -1;

    // Cherche dans les professeurs
    index = listes_ID_Professeurs.indexOf(id_a_effacer);
    if (index !== -1) {
        listes_ID_Professeurs.splice(index, 1);
        listes_Professeurs.splice(index, 1);
        listes_MDP_Professeurs.splice(index, 1);
        // Aucun tableau de formation pour profs, donc rien à faire ici
        creer_Tableau_Prof();
        return;
    }

    // Cherche dans les étudiants
    index = listes_ID_Etudiants.indexOf(id_a_effacer);
    if (index !== -1) {
        listes_ID_Etudiants.splice(index, 1);
        listes_Etudiants.splice(index, 1);
        listes_MDP_Etudiants.splice(index, 1);
        listes_Formation_Etudiants.splice(index, 1); // la bonne correction
        creer_Tableau_Eleves();
        return;
    }

    // Si aucun ID trouvé
    alert("Aucun utilisateur trouvé avec cet ID.");
});



let bouton_ajouter=document.getElementById('Ajouter');

bouton_ajouter.addEventListener("click",()=>{
    let user_a_rajouter=document.getElementById('user_a_rajouter').value;
    let mdp_a_rajouter=document.getElementById('mdp_a_rajouter').value;
    let option=document.getElementById('choix').value;
    let formation = document.getElementById('formation').value;

    user_a_rajouter=user_a_rajouter.replace(/\s+/g, '')
    mdp_a_rajouter=mdp_a_rajouter.replace(/\s+/g, '')
    if(user_a_rajouter=='' || mdp_a_rajouter==''){
        alert("Veuillez remplir tous les champs.");
        return;
    }
    if(user_a_rajouter!='' && mdp_a_rajouter!=''){
        if(option=='option_prof'){
            listes_Professeurs.push(user_a_rajouter);
            listes_MDP_Professeurs.push(mdp_a_rajouter);
            listes_ID_Professeurs.push(genererID('prof'));
        } else {
            listes_Etudiants.push(user_a_rajouter);
            listes_MDP_Etudiants.push(mdp_a_rajouter);
            listes_ID_Etudiants.push(genererID('etudiant'));
            listes_Formation_Etudiants.push(formation);
        }
        creer_Tableau_Prof();
        creer_Tableau_Eleves();
    }
    
});


function mettreAJourAffichageFormation() {
  if (selectRole.value === 'option_prof') {
    divFormation.style.display = 'none';
  } else {
    divFormation.style.display = '';
  }
}


