import { recipes } from '../data/recipes.js';
import { getRecipeArray } from '../script/globals.js';

export function searchInit() {
    //Création de l'array de tags
    const filtersSection = document.querySelector('.filters');
    let ingredientsTags = [];
    let appliancesTags = [];
    let ustensilsTags = [];
    Array.from(filtersSection.children).forEach((tag) => {
        if (tag.className.includes('ingredient')) {
            ingredientsTags.push(tag.innerText);
        } else if (tag.className.includes('appareil')) {
            appliancesTags.push(tag.innerText);
        } else if (tag.className.includes('ustensil')) {
            ustensilsTags.push(tag.innerText);
        }
    });

    const inputValue = document.querySelector('#recipe__searchform > input').value.toLowerCase().replace(/[^a-zA-Z\s]+/g, "").trim();
    let inputValueArray = [];
    if (inputValue.length > 2) {
        inputValueArray = inputValue.split(/\s+/);
    }

    let keywords = {
        'ingredientsTags': ingredientsTags,
        'ustensilsTags': ustensilsTags,
        'appliancesTags': appliancesTags,
        'input': inputValueArray
    }
    return keywords
}

export function search() {

    const filtersSection = document.querySelector('.filters');
    let inputKeywords = searchInit();
    let result = [];
    recipes.forEach((recipe) => {
        let match = true;
        let count = 0;
        //Si il y a des tags
        if (filtersSection.children.length > 0) {
            if (inputKeywords.ingredientsTags.length > 0) {
                inputKeywords.ingredientsTags.forEach((item) => {
                    recipe.ingredients.forEach((ingredient) => {
                        if (ingredient.ingredient.includes(item)) {
                            count += 1;
                        }
                    });
                });
            }
            if (inputKeywords.ustensilsTags.length > 0) {
                inputKeywords.ustensilsTags.forEach((item) => {
                    recipe.ustensils.forEach((ustensil) => {
                        if (ustensil.includes(item)) {
                            count += 1;
                        }
                    });
                });

            }
            if (inputKeywords.ingredientsTags.length > 0) {
                inputKeywords.ingredientsTags.forEach((item) => {
                    if (recipe.appliance.includes(item)) {
                        count += 1;
                    }
                });
            }
            //Premier tri avec les tags: Si les tags ne correspondent pas à la recette
            //renvoie return, et on passe à la recette suivante
            if (!(count === (inputKeywords.ingredientsTags.length + inputKeywords.appliancesTags.length + inputKeywords.ustensilsTags.length))){
                return
            }
        }

        //Test de l'input utilisateur
        let recipeKeywords = getRecipeArray(recipe).join(' ');
        inputKeywords.input.forEach((keyword) => {
            if (!recipeKeywords.includes(keyword)) {
                match = false;
                return
            }
        });
        // Si elle match, on rajoute cette recette au résultat
        if (match) {
            result.push(recipe);
        }
    });
    return result
}