document.querySelector('.newsletter button').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Merci de vous être abonné à notre newsletter !');
});
const recipesByCategory = {
    classiques: [
        { name: "Coq au vin", image: "images/coq_au_vin.jpg" },
        { name: "Bœuf bourguignon", image: "images/boeuf_bourguignon.jpg" },
        { name: "Quiche lorraine", image: "images/quiche_lorraine.jpg" }
    ],
    entrees: [
        { name: "Bruschetta", image: "images/bruschetta.jpg" },
        { name: "Velouté de potiron", image: "images/veloute.jpg" },
        { name: "Salade César", image: "images/salade_cesar.jpg" }
    ],
    desserts: [
        { name: "Tarte tatin", image: "images/tarte_tatin.jpg" },
        { name: "Mousse au chocolat", image: "images/mousse.jpg" },
        { name: "Profiteroles", image: "images/profiteroles.jpg" }
    ],
    boissons: [
        { name: "Smoothie banane-fraise", image: "images/smoothie.jpg" },
        { name: "Chocolat chaud maison", image: "images/chocolat_chaud.jpg" },
        { name: "Citronnade fraîche", image: "images/citronnade.jpg" }
    ]
};

// Fonction pour remplir les carrousels
function populateCarousels() {
    Object.keys(recipesByCategory).forEach(category => {
        const container = document.getElementById(category);
        recipesByCategory[category].forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">
                              <h3>${recipe.name}</h3>`;
            container.appendChild(card);
        });
    });
}

// Lancer la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", populateCarousels);
