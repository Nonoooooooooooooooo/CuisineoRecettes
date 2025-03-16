// ======================= BASE DE DONNÉES DES RECETTES =======================
const recipesByCategory = {
    classiques: [
        { name: "Coq au vin", image: "coq_au_vin.jpg" },
        { name: "Bœuf bourguignon", image: "boeuf_bourguignon.jpg" },
        { name: "Quiche lorraine", image: "quiche_lorraine.jpg" }
    ],
    entrees: [
        { name: "Bruschetta", image: "bruschetta.jpg" },
        { name: "Velouté de potiron", image: "veloute.jpg" },
        { name: "Salade César", image: "salade_cesar.jpg" }
    ],
    desserts: [
        { name: "Tarte tatin", image: "tarte_tatin.jpg" },
        { name: "Mousse au chocolat", image: "mousse.jpg" },
        { name: "Profiteroles", image: "profiteroles.jpg" }
    ],
    boissons: [
        { name: "Smoothie banane-fraise", image: "smoothie.jpg" },
        { name: "Chocolat chaud maison", image: "chocolat_chaud.jpg" },
        { name: "Citronnade fraîche", image: "citronnade.jpg" }
    ]
};

// ======================= GÉNÉRATION DES CARTES =======================
function populateCarousels() {
    Object.keys(recipesByCategory).forEach((category, categoryIndex) => {
        const container = document.getElementById(category);
        if (!container) return;

        recipesByCategory[category].forEach((recipe, recipeIndex) => {
            const link = document.createElement('a');
            const recipeId = `${categoryIndex + 1}_${recipeIndex + 1}`;
            link.href = `recette${recipeId}.html`;
            link.classList.add('recipe-link');

            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
            `;

            link.appendChild(card);
            container.appendChild(link);
        });
    });
}

// ======================= CHOIX DE LA RECETTE DU JOUR =======================
function getRandomRecipeOfTheDay() {
    // Créer un tableau de toutes les recettes avec leur catégorie
    const allRecipes = [];
    Object.keys(recipesByCategory).forEach(category => {
        recipesByCategory[category].forEach((recipe, index) => {
            allRecipes.push({ ...recipe, category, indexInCategory: index });
        });
    });

    const randomIndex = Math.floor(Math.random() * allRecipes.length);
    return allRecipes[randomIndex];
}

// ======================= RECETTE DU JOUR =======================
function setRecipeOfTheDay() {
    const recipeOfTheDay = getRandomRecipeOfTheDay();

    const featuredRecipeSection = document.querySelector('.featured-recipe');
    if (!featuredRecipeSection) {
        console.error("L'élément .featured-recipe n'a pas été trouvé.");
        return;
    }

    const featuredContent = featuredRecipeSection.querySelector('.featured-content');
    const recipeImage = featuredRecipeSection.querySelector('img');
    const recipeTitle = featuredContent.querySelector('h2');
    const recipeDescription = featuredContent.querySelector('p');
    const recipeLink = featuredContent.querySelector('a');

    if (!recipeImage || !recipeTitle || !recipeDescription || !recipeLink) {
        console.error("Un ou plusieurs éléments de la recette du moment sont manquants.");
        return;
    }

    // Mettre à jour les éléments
    recipeImage.src = recipeOfTheDay.image;
    recipeImage.alt = recipeOfTheDay.name;
    recipeTitle.textContent = `🍽️ Recette du Moment : ${recipeOfTheDay.name}`;
    recipeDescription.textContent = `Découvrez cette recette incontournable de la catégorie ${recipeOfTheDay.category}.`;

    // Mise à jour du lien vers la recette
    const categoryIndex = Object.keys(recipesByCategory).indexOf(recipeOfTheDay.category);  // Index de la catégorie
    const recipeIndex = recipeOfTheDay.indexInCategory;  // Index de la recette dans la catégorie
    recipeLink.href = `recette${categoryIndex + 1}_${recipeIndex + 1}.html`;  // Lien vers la page de la recette
}

// ======================= BARRE DE RECHERCHE =======================
const searchInput = document.getElementById('searchInput');

function filterRecipes() {
    const query = searchInput.value.toLowerCase();
    const allRecipeCards = document.querySelectorAll('.recipe-card');

    let found = false;

    allRecipeCards.forEach(card => {
        const recipeTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardContainer = card.closest('.recipe-link');

        if (recipeTitle.includes(query)) {
            cardContainer.style.display = "block";
            found = true;
        } else {
            cardContainer.style.display = "none";
        }
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (!found) {
        if (!noResultsMessage) {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.textContent = "Aucune recette ne correspond à votre recherche.";
            document.querySelector('.recipe-category').appendChild(message);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
}

if (searchInput) {
    searchInput.addEventListener('input', filterRecipes);
}

// ======================= LANCEMENT DES FONCTIONS =======================
document.addEventListener('DOMContentLoaded', function () {
    populateCarousels();
    setRecipeOfTheDay();
});
