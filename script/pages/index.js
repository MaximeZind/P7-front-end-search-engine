import { search } from '../search.js';
import { dropdownInteraction } from '../dropdown.js';
import { tagFilter } from '../dropdown.js';
import { selectTag } from '../dropdown.js';
import { closeTag } from '../dropdown.js';
import { recipesFactory } from '../factory/recipesfactory.js';
import { dropdownMenusFactory } from '../factory/dropdownfactory.js';

export function displayData(recipes) {
    //Message d'erreur s'il n'y a pas de recettes
    const errorMsg = document.querySelector('.no__results');
    errorMsg.classList.add('hidden');
    if (recipes.length === 0){
        errorMsg.classList.remove('hidden');
    }
    //Initialisation du DOM (effacement de toutes les cartes et tags)
    const recipesGallery = document.querySelector('.recipes__gallery');
    const ingredientsList = document.querySelector('.ingredients__menu__list');
    const appareilsList = document.querySelector('.appareils__menu__list');
    const ustensilsList = document.querySelector('.ustensils__menu__list');
    recipesGallery.innerHTML = '';
    ingredientsList.innerHTML = '';
    appareilsList.innerHTML = '';
    ustensilsList.innerHTML = '';

    let allIngredients = [];
    let allAppliances = [];
    let allUstensils = [];

    recipes.forEach((recipe) => {

        recipe.ingredients.forEach((item) => {
            let itemLowerCase = item.ingredient.toLowerCase();
            if (!allIngredients.includes(itemLowerCase)) {
                allIngredients.push(itemLowerCase);
            }
        });
        allIngredients = allIngredients.sort((a, b) => a.localeCompare(b, 'fr'));

        if (!allAppliances.includes(recipe.appliance)) {
            allAppliances.push(recipe.appliance);
        }
        allAppliances = allAppliances.sort((a, b) => a.localeCompare(b, 'fr'));

        recipe.ustensils.forEach((item) => {
            if (!allUstensils.includes(item)) {
                allUstensils.push(item);
            }
        });
        allUstensils = allUstensils.sort((a, b) => a.localeCompare(b, 'fr'));

        const recipeModel = recipesFactory(recipe);
        const recipeCardsDOM = recipeModel.getRecipeCardsDOM();

        recipesGallery.append(recipeCardsDOM);

    });

    const dropdownsModel = dropdownMenusFactory(allIngredients, allAppliances, allUstensils);
    const ingredientsDrowndownDOM = dropdownsModel.getIngredientsDrowndownDOM();
    const appliancesDrowndownDOM = dropdownsModel.getAppliancesDrowndownDOM();
    const ustensilsDropdownDOM = dropdownsModel.getUstensilsDropdownDOM();

    ingredientsList.append(ingredientsDrowndownDOM);
    appareilsList.append(appliancesDrowndownDOM);
    ustensilsList.append(ustensilsDropdownDOM);
}

function getEventListeners() {

    //Dom Elements
    const ingredientsInput = document.querySelector("#ingredient__searchform > input[type=text]");
    const appareilsInput = document.querySelector("#appareils__searchform > input[type=text]");
    const ustensilsInput = document.querySelector("#ustensils__searchform > input[type=text]");
    const body = document.querySelector("body");
    const dropdownList = document.querySelectorAll(".dropdown__list");
    const filtersSection = document.querySelector('.filters');
    const recipeSearchFormInput = document.querySelector('#recipe__searchform > input[type=text]');
    const forms = document.querySelectorAll('form');

    // EventListeners
    body.addEventListener('click', dropdownInteraction); //Ouverture ou fermeture des dropdown menus
    ingredientsInput.addEventListener('keyup', tagFilter); //Filtre des ingrédients à chaque pression d'une touche dans l'input
    appareilsInput.addEventListener('keyup', tagFilter);
    ustensilsInput.addEventListener('keyup', tagFilter);
    dropdownList.forEach((list) => {    //Gestion des tags des dropdown
        list.addEventListener('click', selectTag);
    });
    filtersSection.addEventListener('click', closeTag);
    recipeSearchFormInput.addEventListener('keyup', search);
    forms.forEach((form) => {
        form.addEventListener('submit', event => {
            event.preventDefault();
        });
    });
}

function init() {
    search();
    getEventListeners();
}

init();