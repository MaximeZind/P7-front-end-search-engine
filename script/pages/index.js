import { recipes } from '../../data/recipes.js';
import { search } from '../search.js';
import { dropdownInteraction } from '../dropdown.js';
import { tagFilter } from '../dropdown.js';
import { selectTag } from '../dropdown.js';
import { closeTag } from '../dropdown.js';
import { recipesFactory } from '../factory/recipesfactory.js';
import { dropdownMenusFactory } from '../factory/dropdownfactory.js';

//Fonction qui traite les données de recettes qui lui sont fournies, et
//les renvoie vers la factory en question
export function displayData(recipes) {
    //gestion du message d'erreur
    const errorMsg = document.querySelector('.no__results');
    errorMsg.classList.add('hidden');
    if (recipes.length === 0){
        errorMsg.classList.remove('hidden');
    }
    const ingredientsList = document.querySelector(".ingredients__menu__list");
    const appareilsList = document.querySelector(".appareils__menu__list");
    const ustensilsList = document.querySelector(".ustensils__menu__list");
    const recipesGallery = document.querySelector(".recipes__gallery");

    //Initialisation de la page (suppression des cartes de recettes, et listes des menus déroulants)
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

//Fonction qui renvoie un object keywords, contenant une array pour chaque
//type de tag, ainsi qu'une array de mots clés (input utilisateur)
function getInputKeywords() {
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
    };
    return keywords;
}

//Fonction qui met en place nos EventListeners
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
    recipeSearchFormInput.addEventListener('keyup', searchInit);
    forms.forEach((form) => {
        form.addEventListener('submit', event => {
            event.preventDefault();
        });
    });
}

//Fonction qui appelle la fonction de recherche
export function searchInit(){
    const inputKeywords = getInputKeywords();
    const result = search(inputKeywords, recipes);
    displayData(result);
}

function init() {
    searchInit();
    getEventListeners();
}

init();