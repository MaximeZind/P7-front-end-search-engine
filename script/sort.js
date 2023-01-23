function recipeSearchFormInputInteraction(event) {
    let articles = document.querySelectorAll('.card__textcontent');
    let keyWords = getFiltersArray();
    let formInput = getRecipeSearchFormArray();

    keyWords.forEach((keyword) => {
        formInput.push(keyword);
    });

    if (event.target.value.length > 2){
        articles.forEach((article) => {
            formInput.forEach((word) => {
                if (getArticlesArray(article).title.includes(word)
                 || getArticlesArray(article).ingredients.includes(word)
                 || getArticlesArray(article).instructions.includes(word) ){
                    article.parentNode.parentNode.classList.remove('hidden');
                 } else if (!getArticlesArray(article).title.includes(word)
                 && !getArticlesArray(article).ingredients.includes(word)
                 && !getArticlesArray(article).instructions.includes(word) ){
                    article.parentNode.parentNode.classList.add('hidden');
                 }
            });
        });
    } else if (event.target.value.length <=2){
        articles.forEach((article) => {
            article.parentNode.parentNode.classList.remove('hidden');
        })
    }

}


//fonction qui, quand appelée, va renvoyer une array des tags sélectionnés et actifs
function getFiltersArray(){
    const filtersSection = document.querySelector('.filters');
    let tagElements = Array.from(filtersSection.children);
    let tagList = [];
    tagElements.forEach((element) => {
        tagList.push(element.innerText);
    });

    return tagList
}

function getRecipeSearchFormArray(){
    const recipeSearchFormInput = document.querySelector('#recipe__searchform > input[type=text]');
    let recipeSearchFormValue = recipeSearchFormInput.value.trim();
    let searchValueArray = recipeSearchFormValue.split(' ');

    return searchValueArray
}


// Renvoie un objet composé de 3 strings, ingredients instructions et title
function getArticlesArray(article){

    let ingredientsList = Array.from(article.firstChild.children);
    let ingredients = [];
    ingredientsList.forEach((ingredient) => {
        let ingredientName = ingredient.firstChild.innerText.trim();
        ingredientName = ingredientName.replace(':', '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        ingredients.push(ingredientName);
    });
    ingredients = ingredients.join(' ');

        let articleData = {
            'title': article.parentNode.firstChild.firstChild.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            'ingredients' : ingredients,
            'instructions' : article.firstChild.nextElementSibling.firstChild.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }
        return articleData
}