function recipeSearchFormInputInteraction(event) {
    const articles = document.querySelectorAll('.card__textcontent');
    let keyWords = getFiltersArray();
    let formInput = getRecipeSearchFormArray();

    keyWords.forEach((keyword) => {
        formInput.push(keyword);
    });
    if (event.target.value.length > 2){

        articles.forEach((article) => {
            let articleMatch = 0;
            let wordMatch  = 0;
            formInput.forEach((word) => {
                wordMatch = articleValidation(article, word);
                console.log(wordMatch);
                articleMatch = articleMatch + wordMatch;
                console.log(articleMatch);
            });
            console.log(articleMatch);
            if (articleMatch === formInput.length){
                article.parentNode.parentNode.classList.remove('hidden');
            } else if (articleMatch !== formInput.length){
                article.parentNode.parentNode.classList.add('hidden');
            }
        });
    } else if (event.target.value.length <=2){
        articles.forEach((article) => {
            article.parentNode.parentNode.classList.remove('hidden');
        })
    }
}


function articleValidation(article, word){
    if (getArticlesArray(article).title.includes(word)
    || getArticlesArray(article).ingredients.includes(word)
    || getArticlesArray(article).instructions.includes(word)){
        return 1
    } else if (!getArticlesArray(article).title.includes(word)
    && !getArticlesArray(article).ingredients.includes(word)
    && !getArticlesArray(article).instructions.includes(word)){
       return 0
    }
}


//fonction qui, quand appelée, va renvoyer une array des tags sélectionnés et actifs
function getFiltersArray(){
    const filtersSection = document.querySelector('.filters');
    let tagElements = Array.from(filtersSection.children);
    let tagList = [];
    tagElements.forEach((element) => {
        tagList.push(element.innerText.toLowerCase());
    });

    return tagList
}

function getRecipeSearchFormArray(){
    const recipeSearchFormInput = document.querySelector('#recipe__searchform > input[type=text]');
    let recipeSearchFormValue = recipeSearchFormInput.value.trim().toLowerCase();
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