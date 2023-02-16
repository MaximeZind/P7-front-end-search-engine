import { search } from './search.js';

//Fonction qui gère l'ouverture des menus dropdown
function openDropdown(event) {
    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    const ingredientsInput = document.querySelector("#ingredient__searchform > input[type=text]");
    const appareilsInput = document.querySelector("#appareils__searchform > input[type=text]");
    const ustensilsInput = document.querySelector("#ustensils__searchform > input[type=text]");

    if (event.target.closest('div').className.includes('ingredients__menu')) {
        selectOneMenu(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
        ingredientsInput.setAttribute('placeholder', 'Rechercher un ingrédient');
        appareilsInput.setAttribute('placeholder', 'Appareils');
        ustensilsInput.setAttribute('placeholder', 'Ustensiles');
    } else if (event.target.closest('div').className.includes('appareils__menu')) {
        selectOneMenu(appareilsDropdown, ingredientsDropdown, ustensilsDropdown);
        appareilsInput.setAttribute('placeholder', 'Rechercher un appareil');
        ingredientsInput.setAttribute('placeholder', 'Ingrédients');
        ustensilsInput.setAttribute('placeholder', 'Ustensiles');
    } else if (event.target.closest('div').className.includes('ustensils__menu')) {
        selectOneMenu(ustensilsDropdown, ingredientsDropdown, appareilsDropdown);
        ustensilsInput.setAttribute('placeholder', 'Rechercher un ustensile');
        ingredientsInput.setAttribute('placeholder', 'Ingrédients');
        appareilsInput.setAttribute('placeholder', 'Appareils');
    }
}

function opening(element) {
    element.classList.add('dropdown__activating');
    element.parentNode.classList.add('wrapper__stretched');
}

function closing(element) {
    element.classList.remove('dropdown__activating');
    element.parentNode.classList.remove('wrapper__stretched');
}

//Fonction pour factoriser le processus de ne garder qu'un menu ouvert
//Assigne des classes en fonction du résultat recherché
function selectOneMenu(first, second, third) {
    opening(first);
    closing(second);
    closing(third);
}

//Fonction qui, quand appelée, ferme tous les dropdown menus
function closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown) {
    ingredientsDropdown.classList.remove('dropdown__activating');
    ingredientsDropdown.parentNode.classList.remove('wrapper__stretched');
    document.querySelector("#ingredient__searchform > input[type=text]").setAttribute('placeholder', 'Ingrédients');
    appareilsDropdown.classList.remove('dropdown__activating');
    appareilsDropdown.parentNode.classList.remove('wrapper__stretched');
    document.querySelector("#appareils__searchform > input[type=text]").setAttribute('placeholder', 'Appareils');
    ustensilsDropdown.classList.remove('dropdown__activating');
    ustensilsDropdown.parentNode.classList.remove('wrapper__stretched');
    document.querySelector("#ustensils__searchform > input[type=text]").setAttribute('placeholder', 'Ustensiles');
}

export function dropdownInteraction(event) {

    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div') || (event.target.localName === ('i' || 'span'))) {
        if ((event.target.localName === 'i') || (event.target.localName === 'span')) {
            if (event.target.closest('div')) {
                if ((event.target.closest('div').className.includes('dropdown')) && (!event.target.closest('div').className.includes('dropdown__activating'))) {
                    openDropdown(event);
                } else if (event.target.closest('div').className.includes('dropdown__activating')) {
                    closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
                }
            } else if (event.target.closest('div') === null) {
                event.preventDefault();
            }
        } else if (event.target.closest('div').className.includes('dropdown')) {
            openDropdown(event);
        } else if ((!event.target.closest('div').className.includes('dropdown'))) {
            closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
        }
    } else if (event.target.closest('div') === null) {
        closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
    }
}

// Fonctions pour filtrer les Ingrédients / Appareils / Ustensiles

export function tagFilter(event) {
    const tags = document.querySelectorAll('.tag');
    let list = event.target.parentNode.parentNode.nextElementSibling.firstChild.children;
    const inputValue = event.target.value.trim().toLowerCase().normalize("NFD");
    list = Array.from(list);
    list.forEach((element) => {
        element.classList.remove('hidden');
        const term = element.textContent.toLowerCase().normalize('NFD');
        tags.forEach((tag) => {
            if (term === tag.innerText.toLowerCase().normalize('NFD')){
                element.classList.add('hidden');
            }
        });
        if (!term.includes(inputValue)) {
            element.classList.add('hidden');
        } 
    });
}

//Fonction qui se déclenche lorsqu'on clique sur un élément de nos listes ingrédients, appareils ou ustensils
//et crée un tag
export function selectTag(event) {
    const filtersSection = document.querySelector('.filters');
    if (event.target.localName === 'li') {

        event.target.classList.add('hidden');

        const span = document.createElement('span');
        const i = document.createElement('i');
        i.setAttribute('class', 'fa-regular fa-circle-xmark tag__close');
        span.textContent = event.target.innerText;
        if (event.target.parentNode.parentNode.className.includes('ustensils')) {
            span.setAttribute('class', 'tag tag__ustensil');
        } else if (event.target.parentNode.parentNode.className.includes('ingredients')) {
            span.setAttribute('class', 'tag tag__ingredient');
        } else if (event.target.parentNode.parentNode.className.includes('appareils')) {
            span.setAttribute('class', 'tag tag__appareil');
        }
        filtersSection.append(span);
        span.append(i);
    }
    search();
}


//Fonction qui va supprimer le tag sur lequel on clique, et le recréer
//dans la liste dans laquelle il correspond (ingrédients, appareils ou ustensils)
export function closeTag(event) {
    if (event.target.className.includes('tag__close')) {
        if (event.target.parentNode.className.includes('ingredient')) {
            const ingredientsList = Array.from(document.querySelector('.ingredients__menu__list').firstChild.children);
            const hiddenIngredients = ingredientsList
                .filter(ingredient => ingredient.className.includes('hidden'))
                .filter(ingredient => ingredient.innerText === event.target.parentNode.innerText);
            hiddenIngredients[0].classList.remove('hidden');
        } else if (event.target.parentNode.className.includes('appareil')) {
            const appareilsList = Array.from(document.querySelector('.appareils__menu__list').firstChild.children);
            const hiddenAppareils = appareilsList
                .filter(appareil => appareil.className.includes('hidden'))
                .filter(appareil => appareil.innerText === event.target.parentNode.innerText);
            hiddenAppareils[0].classList.remove('hidden');
        } else if (event.target.parentNode.className.includes('ustensil')) {
            const ustensilsList = Array.from(document.querySelector('.ustensils__menu__list').firstChild.children);
            const hiddenUstensils = ustensilsList
                .filter(ustensil => ustensil.className.includes('hidden'))
                .filter(ustensil => ustensil.innerText === event.target.parentNode.innerText);
            hiddenUstensils[0].classList.remove('hidden');
        }
        event.target.parentNode.remove();
    }
    search();
}
