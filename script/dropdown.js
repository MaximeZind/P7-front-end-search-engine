//Fonction qui gère l'ouverture des menus dropdown
function openDropdown(event) {
    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div').className.includes('ingredients__menu')) {
        selectOneMenu(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
        document.querySelector("#ingredient__searchform > input[type=text]").setAttribute('placeholder', 'Rechercher un ingrédient');
        document.querySelector("#appareils__searchform > input[type=text]").setAttribute('placeholder', 'Appareils');
        document.querySelector("#ustensils__searchform > input[type=text]").setAttribute('placeholder','Ustensiles');
    } else if (event.target.closest('div').className.includes('appareils__menu')) {
        selectOneMenu(appareilsDropdown, ingredientsDropdown, ustensilsDropdown);
        document.querySelector("#appareils__searchform > input[type=text]").setAttribute('placeholder', 'Rechercher un appareil');
        document.querySelector("#ingredient__searchform > input[type=text]").setAttribute('placeholder', 'Ingrédients');
        document.querySelector("#ustensils__searchform > input[type=text]").setAttribute('placeholder','Ustensiles');
    } else if (event.target.closest('div').className.includes('ustensils__menu')) {
        selectOneMenu(ustensilsDropdown, ingredientsDropdown, appareilsDropdown);
        document.querySelector("#ustensils__searchform > input[type=text]").setAttribute('placeholder','Rechercher un ustensile');
        document.querySelector("#ingredient__searchform > input[type=text]").setAttribute('placeholder', 'Ingrédients');
        document.querySelector("#appareils__searchform > input[type=text]").setAttribute('placeholder', 'Appareils');
    }
}

function opening(element){
    element.classList.add('dropdown__activating');
    element.parentNode.classList.add('wrapper__stretched');
}

function closing(element){
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
    document.querySelector("#ustensils__searchform > input[type=text]").setAttribute('placeholder','Ustensiles');
}

function dropdownInteraction(event) {

    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div')) {
        if (event.target.closest('div').className.includes('dropdown')) {
            openDropdown(event);
        } else if ((!event.target.closest('div').className.includes('dropdown'))) {
            closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
        }
    } else if (event.target.closest('div') === null) {
        closeAllDropdownMenus(ingredientsDropdown, appareilsDropdown, ustensilsDropdown);
    }
}

// Fonctions pour filtrer les Ingrédients / Appareils / Ustensiles

function ingredientFilter(event){
    let list = event.target.parentNode.parentNode.nextElementSibling.firstChild.children;
    const inputValue = event.target.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    list = Array.from(list);
    list.forEach((element) => {
        let term = element.textContent;
        term = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!term.includes(inputValue)){
            element.classList.add('hidden');
        } if (term.includes(inputValue)){
            element.classList.remove('hidden');
        }
    });
}