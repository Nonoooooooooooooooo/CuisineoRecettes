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

// Fonction pour remplir les carrousels
function populateCarousels() {
    Object.keys(recipesByCategory).forEach((category, categoryIndex) => {
        const container = document.getElementById(category);
        recipesByCategory[category].forEach((recipe, recipeIndex) => {
            // Créer une carte de recette
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            
            // Créer un lien autour de la carte
            const link = document.createElement('a');
            
            // Générer un identifiant unique pour chaque recette
            const recipeId = `${categoryIndex + 1}_${recipeIndex + 1}`;  // format : "1_1", "1_2", "2_1", ...
            link.href = `recette${recipeId}.html`; // Utiliser cet identifiant unique pour l'URL de la recette
            
            link.classList.add('recipe-link'); // Ajouter une classe au lien pour le style
            
            // Ajouter l'image et le titre à la carte
            card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">
                              <h3>${recipe.name}</h3>`;
            
            // Ajouter la carte au lien
            link.appendChild(card);

            // Ajouter le lien au conteneur de la catégorie
            container.appendChild(link);
        });
    });
}



// Lancer la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", populateCarousels);
console.log("Le script fonctionne !");
