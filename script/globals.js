//Fonction qui renvoie une array de mots clés, à partir d'une recette
export function getRecipeArray(recipe) {
    const stopWords = ['de', 'un', 'une', 'le', 'la', 'les', 'et', 'en', 'du', 'au', 'a', '0', '1', '2', '3', 'ou'];
    let ingredients = [];
    recipe.ingredients.forEach((ingredient) => {
        ingredients = ingredients.concat(ingredient.ingredient.toLowerCase().split(' '));

    });

    let ustensils = [];
    recipe.ustensils.forEach((ustensil) => {
        ustensils = ustensils.concat(ustensil.toLowerCase().split(' '));

    });
    
    let instructions = recipe.description.toLowerCase().split(' ');

    let appliance = recipe.appliance.toLowerCase();

    let title = recipe.name.toLowerCase().split(' ');

    let keywords = title.concat(ingredients)
        .concat(instructions)
        .concat(appliance)
        .concat(ustensils)
        .filter(word => !stopWords.includes(word))
        .filter(element => element);
    return keywords
}