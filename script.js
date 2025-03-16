const newsletterButton = document.querySelector('.newsletter button');

if (newsletterButton) {
    newsletterButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Merci de vous être abonné à notre newsletter !');
    });
}

const recipesByCategory = {
    classiques: [
        { name: "Coq au vin", image: "./coq_au_vin.jpg" },
        { name: "Bœuf bourguignon", image: "./boeuf_bourguignon.jpg" },
        { name: "Quiche lorraine", image: "./quiche_lorraine.jpg" }
    ],
    entrees: [
        { name: "Bruschetta", image: "./bruschetta.jpg" },
        { name: "Velouté de potiron", image: "./veloute.jpg" },
        { name: "Salade César", image: "./salade_cesar.jpg" }
    ],
    desserts: [
        { name: "Tarte tatin", image: "./tarte_tatin.jpg" },
        { name: "Mousse au chocolat", image: "./mousse.jpg" },
        { name: "Profiteroles", image: "./profiteroles.jpg" }
    ],
    boissons: [
        { name: "Smoothie banane-fraise", image: "./smoothie.jpg" },
        { name: "Chocolat chaud maison", image: "./chocolat_chaud.jpg" },
        { name: "Citronnade fraîche", image: "./citronnade.jpg" }
    ]
};

// Fonction pour remplir les carrousels avec les recettes
function populateCarousels() {
    Object.keys(recipesByCategory).forEach((category, categoryIndex) => {
        const container = document.getElementById(category);
        recipesByCategory[category].forEach((recipe, recipeIndex) => {
            const link = document.createElement('a');
            const recipeId = `${categoryIndex + 1}_${recipeIndex + 1}`;
            link.href = `recette${recipeId}.html`;
            link.classList.add('recipe-link');

            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">
                              <h3>${recipe.name}</h3>`;
            link.appendChild(card);
            container.appendChild(link);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
     populateCarousels();
    
const searchInput = document.getElementById('searchInput');

// Fonction pour filtrer les cartes de recettes
function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase(); // Le terme de recherche en minuscule pour éviter la sensibilité à la casse
    
    // Récupérer toutes les cartes de recettes
    const recipeCards = document.querySelectorAll('.recipe-card');

    recipeCards.forEach(card => {
        const recipeName = card.querySelector('h3').textContent.toLowerCase(); // Le nom de la recette, en minuscule pour une recherche insensible à la casse

        // Vérifier si le nom de la recette contient le terme de recherche
        if (recipeName.includes(searchTerm)) {
            card.style.display = 'block'; // Afficher la carte si elle correspond
        } else {
            card.style.display = 'none'; // Cacher la carte si elle ne correspond pas
        }
    });
}

// Ajouter un écouteur d'événement pour déclencher le filtrage à chaque saisie
searchInput.addEventListener('input', filterRecipes);
const noResultsMessage = document.createElement('p');
noResultsMessage.textContent = "Aucune recette ne correspond à votre recherche.";
document.querySelector('.recipe-category').appendChild(noResultsMessage);
