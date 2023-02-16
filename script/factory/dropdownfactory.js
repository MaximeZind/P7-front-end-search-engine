//Fonction qui utilise les Array d'ingredients, appliances ou ustensils
// pour créer les dropdown menus filtres
export function dropdownMenusFactory(ingredients, appliances, ustensils) {
    const tags = document.querySelectorAll('.tag');
    function getIngredientsDrowndownDOM(){
        const ingredientsInputValue = document.querySelector("#ingredient__searchform > input[type=text]")
            .value
            .trim()
            .toLocaleLowerCase()
            .normalize('NFD');
        const ul = document.createElement('ul');

        ingredients.forEach((item) => {

            let itemFirstCaseHigher = item.charAt(0).toUpperCase() + item.slice(1);
            const li = document.createElement('li');
            li.textContent = `${itemFirstCaseHigher}`;
            if (ingredientsInputValue.length>0){
                if (!li.textContent.toLocaleLowerCase().normalize('NFD').includes(ingredientsInputValue)){
                    li.setAttribute('class', 'hidden');
                }
            }

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
            tags.forEach((tag) => {
                if (tag.innerText === li.textContent){
                    li.setAttribute('class','hidden');
                }
            });
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
            tags.forEach((tag) => {
                if (tag.innerText === li.textContent){
                    li.setAttribute('class','hidden');
                }
            });
            ul.append(li);
        });

        return ul
    }

    return {getIngredientsDrowndownDOM, getAppliancesDrowndownDOM, getUstensilsDropdownDOM}
}