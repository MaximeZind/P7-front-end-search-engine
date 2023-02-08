import { recipes } from '../data/recipes.js';
import { getRecipeArray } from './globals.js';
import { displayData } from './pages/index.js';

export function getInputKeywords() {
    //Création de l'array de tags
    const filtersSection = document.querySelector('.filters');
    let ingredientsTags = [];
    let appliancesTags = [];
    let ustensilsTags = [];
    Array.from(filtersSection.children).forEach((tag) => {
        if (tag.className.includes('ingredient')) {
            ingredientsTags.push(tag.innerText.toLowerCase());
        } else if (tag.className.includes('appareil')) {
            appliancesTags.push(tag.innerText.toLowerCase());
        } else if (tag.className.includes('ustensil')) {
            ustensilsTags.push(tag.innerText.toLowerCase());
        }
    });

    const inputValue = document.querySelector('#recipe__searchform > input').value.toLowerCase().trim();
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
    const errorMsg = document.querySelector('.no__results');
    errorMsg.classList.add('hidden');
    const inputValue = document.querySelector('#recipe__searchform > input').value.toLowerCase().trim();
    const filtersSection = document.querySelector('.filters');
    let inputKeywords = getInputKeywords();
    let result = [];
    // Pour chaque recette
    for( let i=0; i < recipes.length; i+=1 ){
            let match = true;
            let count = 0;
            //Si il y a des tags
            if (filtersSection.children.length > 0) {
                //Tags ingrédients
                if (inputKeywords.ingredientsTags.length > 0) {
                    for(let j=0; j<inputKeywords.ingredientsTags.length; j+=1){
                        for(let k=0; k<recipes[i].ingredients.length; k+=1){
                            if (recipes[i].ingredients[k].ingredient.toLowerCase().includes(inputKeywords.ingredientsTags[j])) {
                                count += 1;
                            }
                        }
                    }
                }
                // Tags ustensiles
                if (inputKeywords.ustensilsTags.length > 0) {
                    for(let j=0; j< inputKeywords.ustensilsTags.length; j+=1){
                        for(let k=0; k<recipes[i].ustensils.length; k+=1) {
                            if (recipes[i].ustensils[k].toLowerCase().includes(inputKeywords.ustensilsTags[j])) {
                                count += 1;
                            }
                        }
                    }
                }
                // Tags appareils
                if (inputKeywords.appliancesTags.length > 0) {
                    for(let j=0; j< inputKeywords.appliancesTags.length; j+=1){
                        if (recipes[i].appliance.toLowerCase().includes(inputKeywords.appliancesTags[j])) {
                            count += 1;
                        }
                    }
                }
                //Premier tri avec les tags: Si les tags ne correspondent pas à la recette
                //renvoie return, et on passe à la recette suivante
                if (!(count === (inputKeywords.ingredientsTags.length + inputKeywords.appliancesTags.length + inputKeywords.ustensilsTags.length))) {
                    continue
                }
            }
    
            //Test de l'input utilisateur
            if (inputValue.length > 2) {
                let recipeKeywords = getRecipeArray(recipes[i]).join(' ');
                for(let j=0; j<inputKeywords.input.length; j+=1) {
                    if (!recipeKeywords.includes(inputKeywords.input[j])) {
                        match = false;
                        continue
                    }
                }
            }
            // Si elle match, on rajoute cette recette au résultat
            if (match) {
                result.push(recipes[i]);
            }
    }
    
    const recipesGallery = document.querySelector('.recipes__gallery');
    const ingredientsTagList = document.querySelector('.ingredients__menu__list');
    const appareilsTagList = document.querySelector('.appareils__menu__list');
    const ustensilsTagList = document.querySelector('.ustensils__menu__list');
    recipesGallery.innerHTML = '';
    ingredientsTagList.innerHTML = '';
    appareilsTagList.innerHTML = '';
    ustensilsTagList.innerHTML = '';
    displayData(result);
    if (result.length === 0){
        errorMsg.classList.remove('hidden');
    }
}