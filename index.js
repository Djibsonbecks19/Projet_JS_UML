let clients = [
    { 
        id: 1,
        nom: 'Diop', 
        prenom: 'Alioune', 
        telephone: '778990123', 
        adresse: 'Medina',
        categorie: 'Fidèle',
        dettes : [
            {
                id: 1,
                montant: 5000,
                articles: 7
                ,
                statut: "Non soldé"
            }
        ]
        
    },
    { 
        id: 2, 
        nom: 'Fall', 
        prenom: 'Awa', 
        telephone: '779876543', 
        adresse: 'Colobane',
        categorie: 'Solvable',
        dettes : [
            {
                id: 2,
                montant: 15000,
                articles: 4,
                statut: "Non soldé"
            }
        ]
        
    },
    { 
        id: 3, 
        nom: 'Ndiaye', 
        prenom: 'Aminata', 
        telephone: '776543210', 
        adresse: 'Dieupeul',
        categorie: 'Nouveau',
        dettes : [
            {
                id: 3,
                montant: 20000,
                articles: 10,
                statut: "soldé"
            }
        ]
        
    },
    { 
        id: 4, 
        nom: 'Sarr', 
        prenom: 'Moussa', 
        telephone: '774321098', 
        adresse: 'Grand Dakar',
        categorie: 'Fidèle' ,
        dettes : [
            {
                id: 4,
                montant: 50000,
                articles: 9,
                statut: "soldé"
            }
        ]
        
    },
    { 
        id: 5, 
        nom: 'Ba', 
        prenom: 'Ousmane', 
        telephone: '773210987', 
        adresse: 'Yoff',
        categorie: 'Non solvable',
        dettes : [
            {
                id: 5,
                montant: 2500,
                articles: 2,
                statut: "soldé"
            }
        ]
    }
];
const tbodyClients = document.getElementById('tbodyClients');
const btnOpenModal = document.getElementById('btnOpenModal');
const createModal = document.getElementById('createModal');
const closeForm = document.getElementById('closeForm');

const nomInput = document.getElementById('nom');
const prenomInput = document.getElementById('prenom');
const telInput = document.getElementById('telephone');
const adresseInput = document.getElementById('adresse');
const categorieInput = document.getElementById('categorie');

let ordreCategorie = "asc";

document.addEventListener("DOMContentLoaded", () => {
    tbodyClients.innerHTML = genereTrClients(clients);
});

function genereTrClients(clients) {
    return clients.map(client => `
        <tr>
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.prenom}</td>
            <td>${client.telephone}</td>
            <td>${client.adresse}</td>
            <td>${client.categorie}</td>
            <td><button class="btn btn-primary mb-3" onlick="ClientDetails()">Afficher Infos Clients</button></td>
        </tr>
    `).join('');
}

function sortClients(clients, ordre, colonne) {
    clients.sort((a, b) => {
        if (a[colonne] < b[colonne]) return ordre === "asc" ? -1 : 1;
        if (a[colonne] > b[colonne]) return ordre === "asc" ? 1 : -1;
        return 0;
    });

    tbodyClients.innerHTML = genereTrClients(clients);
}

document.getElementById('sort-cat').addEventListener('click', () => {
    ordreCategorie = ordreCategorie === "asc" ? "desc" : "asc";
    sortClients(clients, ordreCategorie, "categorie");
});

btnOpenModal.addEventListener('click', () => {
    createModal.style.display = "block";
});

closeForm.addEventListener('click', () => {
    createModal.style.display = "none";
});

createModal.addEventListener('submit', (e) => {
    e.preventDefault();

    let nomElem = document.getElementById('nom')
    let prenomElem = document.getElementById('prenom')
    let telephoneElem = document.getElementById('telephone')
    let adresseElem = document.getElementById('adresse')
    let categorieElem = document.getElementById('categorie')

    let newClient = {
        id: clients.length + 1, 
        nom: nomInput.value.trim(),
        prenom: prenomInput.value.trim(),
        telephone: telInput.value.trim(),
        adresse: adresseInput.value.trim(),
        categorie: categorieInput.value.trim()
    };

    if (nomElem.value == '' || prenomElem.value == '' || telephoneElem.value == '' || adresseElem.value == '' ||
        categorieElem.value == '') {
            
        validateForm(nomElem, 'Ce Champ est Obligatoire');
        validateForm(prenomElem, 'Ce Champ est Obligatoire');
        validateForm(telephoneElem, 'Ce Champ est Obligatoire');
        validateForm(adresseElem, 'Ce Champ est Obligatoire');
        validateForm(categorieElem, 'Ce Champ est Obligatoire');
    }
    if (clients.some(c => c.telephone === newClient.telephone)) {
        alert("Téléphone déjà utilisé !");
        return;
    }

    clients.push(newClient);
    tbodyClients.innerHTML = genereTrClients(clients);

    nomInput.value = "";
    prenomInput.value = "";
    telInput.value = "";
    adresseInput.value = "";
    categorieInput.value = "";

    createModal.style.display = "none"; 
});


function ClientDetails(){
    
}

function validateForm(champ, message){ 

    let sibling = champ.nextElementSibling; 
    if(champ.value == ''){
        sibling.style.display = 'block';
        sibling.innerHTML = message;
    }
    setTimeout(() => {
        sibling.style.display = 'none';
    },3000);

}

