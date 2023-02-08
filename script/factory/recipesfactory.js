// Fonction factory, qui va utiliser les données reçues de recipes.js
// pour créer les éléments de notre page

export function recipesFactory(data){
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

    //Fonction qui va créer nos cartes de recettes
    function getRecipeCardsDOM() {
        const article = document.createElement('article');

        article.innerHTML = `
        <img src="https://via.placeholder.com/380x178?text=Lespetitsplats.com">
        <div class="card__content">
            <header>
                <h2>${name}</h2>
                <div class="card__header-time"><i class="fa-regular fa-clock"></i><strong>${time}</strong></div>
            </header>
            <div class="card__textcontent">
                <div class="card__textcontent__ingredientslist">
                ${ingredients.map(item => `
                <p>
                    <strong>
                        ${item.ingredient}:
                        ${item.quantity ? `${item.quantity} ${item.unit || ''}` : ''}
                    </strong>
                </p>
            `).join('')}
                </div>
                <div class="card__textcontent__instructions">
                    <p>${description}</p>
                </div>
            </div>
        </div>
        `

        return article

    }

    return {id, name, servings, time, description, appliance, ustensils, getRecipeCardsDOM}
}