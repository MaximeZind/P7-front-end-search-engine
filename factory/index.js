// Fonction factory, qui va utiliser les données reçues de recipes.js
// pour créer les éléments de notre page

function recipePageFactory(data){
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

    //Fonction qui va créer nos cartes de recettes
    function getRecipeCardsDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', 'https://via.placeholder.com/380x178?text=Lespetitsplats.com');

        const divContent = document.createElement('div');
        divContent.setAttribute('class', 'card__content');

        const header = document.createElement('header');
        const h2Title = document.createElement('h2');
        h2Title.textContent = `${name}`;

        const divTime = document.createElement('div');
        divTime.setAttribute('class', 'card__header-time');


        const iClock = document.createElement('i');
        iClock.setAttribute('class', 'fa-regular fa-clock');

        const strongTime = document.createElement('strong');
        strongTime.textContent = `${time}`;

        const divTextContent = document.createElement('div');
        divTextContent.setAttribute('class', 'card__textcontent');

        const divIngredients = document.createElement('div');
        divIngredients.setAttribute('class', 'card__textcontent__ingredientslist');

        ingredients.forEach((item) => {

            const quantity = item.quantity;
            const ingredient = item.ingredient;
            let unit = '';
            if (item.unit){
                unit = item.unit
            }
            const pQuantity = document.createElement('p');
            const strong = document.createElement('strong');
            if (item.quantity && item.unit){
                pQuantity.textContent = `${quantity} ${unit}`;
                strong.textContent = `${ingredient}: `;
            } else if (item.quantity && !item.unit){
                 pQuantity.textContent = `${quantity}`;
                 strong.textContent = `${ingredient}: `;
            } else if (!item.quantity){
                pQuantity.textContent = '';
                strong.textContent = `${ingredient}`;
            }
        


        
            divIngredients.append(pQuantity);
            pQuantity.prepend(strong);
        
         });
        

        const divInstructions = document.createElement('div');
        divInstructions.setAttribute('class', 'card__textcontent__instructions');

        const pInstructions = document.createElement('p');
        pInstructions.textContent = `${description}`;

        article.append(img);
        article.append(divContent);
        divContent.append(header);
        header.append(h2Title);
        header.append(divTime);
        divTime.append(iClock);
        divTime.append(strongTime);
        divContent.append(divTextContent);
        divTextContent.append(divIngredients);
        divTextContent.append(divInstructions);
        divInstructions.append(pInstructions);

        return article

    }

    return {id, name, servings, time, description, appliance, ustensils, getRecipeCardsDOM}
}


//Fonction qui utilise les Array d'ingredients, appliances ou ustensils
// pour créer les dropdown menus filtres
function dropdownMenusFactory(ingredients, appliances, ustensils) {

    function getIngredientsDrowndownDOM(){

        const tags = document.querySelectorAll('.tag');
        const ul = document.createElement('ul');

        ingredients.forEach((item) => {

            let itemFirstCaseHigher = item.charAt(0).toUpperCase() + item.slice(1);
            const li = document.createElement('li');
            li.textContent = `${itemFirstCaseHigher}`;
            tags.forEach((tag) => {
                if (tag.innerText === li.textContent){
                    li.setAttribute('class','hidden');
                }
            });
            ul.append(li);
        });

        return ul
    }

    function getAppliancesDrowndownDOM(){

        const ul = document.createElement('ul');

        appliances.forEach((item) => {
            let itemFirstCaseHigher = item.charAt(0).toUpperCase() + item.slice(1);
            const li = document.createElement('li');
            li.textContent = `${itemFirstCaseHigher}`;
            ul.append(li);
        });

        return ul
    }

    function getUstensilsDropdownDOM(){
        const ul = document.createElement('ul');

        ustensils.forEach((item) => {
            let itemFirstCaseHigher = item.charAt(0).toUpperCase() + item.slice(1);
            const li = document.createElement('li');
            li.textContent = `${itemFirstCaseHigher}`;
            ul.append(li);
        });

        return ul
    }

    return {getIngredientsDrowndownDOM, getAppliancesDrowndownDOM, getUstensilsDropdownDOM}
}