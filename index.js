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
                articles: 7,
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

searchCat = document.getElementById("categorieLookUp")
searchStatut = document.getElementById("statutLookUp")

const tbodyClients = document.getElementById('tbodyClients');
const btnOpenModal = document.getElementById('btnOpenModal');
const createModal = document.getElementById('createModal');
const closeForm = document.getElementById('closeForm');

let nomElem = document.getElementById('nom');
let prenomElem = document.getElementById('prenom');
let telephoneElem = document.getElementById('telephone');
let adresseElem = document.getElementById('adresse');
let categorieElem = document.getElementById('categorie');

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
            <td>${client.dettes.map(dette => dette.statut)}</td>
            <td><button class="btn btn-primary mb-3">Afficher Infos Clients</button></td>
        </tr>
    `).join('');
}


btnOpenModal.addEventListener('click', () => {
    createModal.style.display = "block";
});

closeForm.addEventListener('click', () => {
    createModal.style.display = "none";
});

createModal.addEventListener('submit', (e) => {
    e.preventDefault();

    let nom = nomElem.value.trim();
    let prenom = prenomElem.value.trim();
    let telephone = telephoneElem.value.trim();
    let adresse = adresseElem.value.trim();
    let categorie = categorieElem.value.trim();

    if (nom && prenom && telephone && adresse && categorie) {
        if (clients.some(c => c.telephone === telephone)) {
            validateForm(telephoneElem, "Téléphone déjà utilisé !");
            return;
        }

        let newClient = {
            id: clients.length + 1,
            nom,
            prenom,
            telephone,
            adresse,
            categorie
        };

        clients.push(newClient);
        tbodyClients.innerHTML = genereTrClients(clients);

        nomElem.value = "";
        prenomElem.value = "";
        telephoneElem.value = "";
        adresseElem.value = "";
        categorieElem.value = "";

        createModal.style.display = "none"; 
    } else {
        validateForm(nomElem, 'Ce Champ est Obligatoire');
        validateForm(prenomElem, 'Ce Champ est Obligatoire');
        validateForm(telephoneElem, 'Ce Champ est Obligatoire');
        validateForm(adresseElem, 'Ce Champ est Obligatoire');
        validateForm(categorieElem, 'Ce Champ est Obligatoire');
    }
});

function validateForm(champ, message) { 
    let sibling = champ.nextElementSibling; 
    if (!champ.value.trim()) {
        sibling.style.display = 'block';
        sibling.innerHTML = message;
        setTimeout(() => {
            sibling.style.display = 'none';
        }, 3000);
    }
}

function lookUp(column, id) {
    id.addEventListener("change", function () {
        const lookupValue = this.value.trim().toLowerCase(); 
        const tableRows = document.querySelectorAll("table tbody tr");  

        tableRows.forEach((row) => {
            const Cell = row.cells[column];  
            if (Cell) {
                const Text = Cell.textContent.trim().toLowerCase();  

                row.style.display = (lookupValue === "" || Text === lookupValue) ? "" : "none";
            }
        });
    });
}

lookUp(6, document.getElementById("statutLookUp"));
lookUp(5, document.getElementById("categorieLookUp"));

