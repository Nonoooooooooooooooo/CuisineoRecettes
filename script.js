document.addEventListener("DOMContentLoaded", function () {
    setupNewsletterButton();
    populateCarousels();
    setRecipeOfTheDay();
    setupSearch();
});

/** ================== 1️⃣ Gestion du bouton Newsletter ================== */
function setupNewsletterButton() {
    const newsletterButton = document.querySelector('.newsletter button');

    if (newsletterButton) {
        newsletterButton.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Merci de vous être abonné à notre newsletter !');
        });
    } else {
        console.error("Bouton de la newsletter non trouvé.");
    }
}

/** ================== 2️⃣ Recettes classées par catégorie ================== */
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

/** ================== 3️⃣ Remplissage des carrousels ================== */
function populateCarousels() {
    Object.keys(recipesByCategory).forEach((category, categoryIndex) => {
        const container = document.getElementById(category);
        if (!container) {
            console.warn(`Le conteneur pour la catégorie ${category} est introuvable.`);
            return;
        }

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

/** ================== 4️⃣ Sélection aléatoire de la recette du jour ================== */
function getRandomRecipeOfTheDay() {
    const allRecipes = [];
    Object.keys(recipesByCategory).forEach(category => {
        recipesByCategory[category].forEach(recipe => {
            allRecipes.push({ ...recipe, category });
        });
    });

    const randomIndex = Math.floor(Math.random() * allRecipes.length);
    return allRecipes[randomIndex];
}

/** ================== 5️⃣ Mise à jour de la recette du moment ================== */
function setRecipeOfTheDay() {
    const recipeOfTheDay = getRandomRecipeOfTheDay();

    const featuredRecipeSection = document.querySelector('.featured-recipe');
    if (!featuredRecipeSection) {
        console.error("La section 'Recette du Moment' est introuvable.");
        return;
    }

    const recipeImage = featuredRecipeSection.querySelector("img");
    const recipeTitle = featuredRecipeSection.querySelector("h2");
    const recipeDescription = featuredRecipeSection.querySelector("p");
    const recipeLink = featuredRecipeSection.querySelector("a");

    if (!recipeImage || !recipeTitle || !recipeDescription || !recipeLink) {
        console.error("Un ou plusieurs éléments de la section 'Recette du Moment' sont manquants.");
        return;
    }

    recipeImage.src = recipeOfTheDay.image;
    recipeImage.alt = recipeOfTheDay.name;
    recipeTitle.textContent = `🍽️ Recette du Moment : ${recipeOfTheDay.name}`;
    recipeDescription.textContent = `Découvrez cette recette incontournable de la catégorie ${recipeOfTheDay.category}.`;
    recipeLink.href = `recette${recipeOfTheDay.category}_${Object.values(recipesByCategory[recipeOfTheDay.category]).indexOf(recipeOfTheDay) + 1}.html`;
}

/** ================== 6️⃣ Barre de recherche fonctionnelle ================== */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const recipeCards = document.querySelectorAll(".recipe-card");

    if (!searchInput) {
        console.error("Champ de recherche introuvable.");
        return;
    }

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        let hasResults = false;

        recipeCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const matches = title.includes(searchTerm);

            card.style.display = matches ? "block" : "none";
            if (matches) hasResults = true;
        });

        // Affichage du message "Aucune recette trouvée"
        const noResultsMessage = document.querySelector(".no-results-message");
        if (!hasResults) {
            if (!noResultsMessage) {
                const message = document.createElement("p");
                message.classList.add("no-results-message");
                message.textContent = "Aucune recette ne correspond à votre recherche.";
                document.querySelector(".recipe-category").appendChild(message);
            }
        } else {
            if (noResultsMessage) noResultsMessage.remove();
        }
    });
}
