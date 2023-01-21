function openDropdown(event) {
    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div').className.includes('ingredients')) {
        ingredientsDropdown.classList.add('dropdown__activated');
    } else if (event.target.closest('div').className.includes('appareils')) {
        appareilsDropdown.classList.add('dropdown__activated');
    } else if (event.target.closest('div').className.includes('ustensils')) {
        ustensilsDropdown.classList.add('dropdown__activated');
    }
}

function closeDropdown(event) {

    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div').className.includes('ingredients')) {
        ingredientsDropdown.classList.remove('dropdown__activated');
    } else if (event.target.closest('div').className.includes('appareils')) {
        appareilsDropdown.classList.remove('dropdown__activated');
    } else if (event.target.closest('div').className.includes('ustensils')) {
        ustensilsDropdown.classList.remove('dropdown__activated');
    }
}

function dropdownInteraction(event) {

    const ingredientsDropdown = document.querySelector('.ingredients__menu');
    const appareilsDropdown = document.querySelector('.appareils__menu');
    const ustensilsDropdown = document.querySelector('.ustensils__menu');

    if (event.target.closest('div').className.includes('dropdown')) {
            openDropdown(event);
    } else if (!event.target.closest('div').className.includes('dropdown')){
        ingredientsDropdown.classList.remove('dropdown__activated');
        appareilsDropdown.classList.remove('dropdown__activated');
        ustensilsDropdown.classList.remove('dropdown__activated');
    }

}