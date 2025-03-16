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

// Fonction pour choisir une recette au hasard chaque jour
 function getRandomRecipeOfTheDay() {
     const allRecipes = [];
     Object.keys(recipesByCategory).forEach(category => {
         recipesByCategory[category].forEach((recipe, index) => {
             allRecipes.push({ ...recipe, category });
         });
     });
 
     const randomIndex = Math.floor(Math.random() * allRecipes.length);
     return allRecipes[randomIndex];
 }
 
 // Fonction pour mettre à jour la recette du moment dans le HTML
 function setRecipeOfTheDay() {
     const recipeOfTheDay = getRandomRecipeOfTheDay();
 
     const featuredRecipeSection = document.querySelector('.featured-recipe');
     const featuredContent = featuredRecipeSection.querySelector('.featured-content');
     const recipeImage = featuredContent.querySelector('img');
     const recipeTitle = featuredContent.querySelector('h2');
     const recipeDescription = featuredContent.querySelector('p');
     const recipeLink = featuredContent.querySelector('a');
 
     recipeImage.src = recipeOfTheDay.image;
     recipeImage.alt = recipeOfTheDay.name;
     recipeTitle.textContent = `🍽️ Recette du Moment : ${recipeOfTheDay.name}`;
     recipeDescription.textContent = `Découvrez cette recette incontournable de la catégorie ${recipeOfTheDay.category}.`;
     recipeLink.href = `recette${recipeOfTheDay.category}_${allRecipes.indexOf(recipeOfTheDay) + 1}.html`;
 }
 
 // Lancer les fonctions lors du chargement de la page
 document.addEventListener('DOMContentLoaded', function() {
     populateCarousels();
     setRecipeOfTheDay();
 });
 const searchInput = document.getElementById('searchInput');
 
 // Fonction pour filtrer les cartes de recettes
 @@ -112,27 +75,3 @@ searchInput.addEventListener('input', filterRecipes);
 const noResultsMessage = document.createElement('p');
 noResultsMessage.textContent = "Aucune recette ne correspond à votre recherche.";
 document.querySelector('.recipe-category').appendChild(noResultsMessage);
 
 function setRecipeOfTheDay() {
     const recipeSection = document.querySelector('.featured-recipe');
     console.log(recipeSection);  // Cela devrait afficher l'élément dans la console
 
     if (!recipeSection) {
         console.error('L\'élément .featured-recipe n\'existe pas dans le DOM.');
         return;  // Si l'élément n'est pas trouvé, on arrête l'exécution
     }
 
     const recipeImage = recipeSection.querySelector('img');
     console.log(recipeImage);  // Vérifier si l'image est bien trouvée dans la section
 
     if (recipeImage) {
         // Remplacer par le bon chemin
         recipeImage.src = 'images/recette_du_moment.jpg';  // Chemin relatif de l'image
     } else {
         console.error('L\'élément <img> dans .featured-recipe n\'a pas été trouvé.');
     }
 }
 
 document.addEventListener("DOMContentLoaded", function() {
     setRecipeOfTheDay();  // Appeler la fonction pour définir la recette du jour
 });
