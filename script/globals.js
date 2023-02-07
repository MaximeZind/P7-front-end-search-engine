export function getRecipeArray(recipe) {
    const stopWords = ['de', 'un', 'une', 'le', 'la', 'les', 'et', 'en', 'du', 'au', 'a', '0', '1', '2', '3', 'ou'];
    let ingredients = [];
    let ingredientsArray = [];
    recipe.ingredients.forEach((ingredient) => {
        ingredients = ingredients.concat(ingredient.ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""));

            ingredientsArray = ingredients.concat(ingredient.ingredient
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .split(' '));
    });
    
    // let ingredientsArray = ingredients.split(' ');
    let instructions = recipe.description
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]+/g, "")
        .split(' ');

    let appliance = recipe.appliance;

    let title = recipe.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(' ');

    let keywords = title.concat(ingredientsArray)
        .concat(instructions)
        .concat(appliance)
        .filter(word => !stopWords.includes(word))
        .filter(element => element);

    return keywords
}


// export function getRecipesBinaryTree() {
//     const recipes = getArticlesArray();

//     // Créer un arbre binaire avec les mots clés des recettes en tant que noeuds

//     let binaryTree = {}; // Initialisez l'arbre binaire

//     // Pour chaque recette, divisez les mots clés en un tableau de lettres
//     recipes.forEach((recipe) => {
//         recipe.keywords.forEach((keyword) => {
//             let currentNode = binaryTree;
//             for (let i = 0; i < keyword.length; i++) {
//                 let letter = keyword[i];
//                 if (!currentNode.children) {
//                     currentNode.children = {};
//                 }
//                 if (!currentNode.children[letter]) {
//                     currentNode.children[letter] = {};
//                 }
//                 currentNode = currentNode.children[letter];
//             }
//             currentNode.recipes = currentNode.recipes || [];
//             currentNode.recipes.push(recipe);
//         });
//     });
//     console.log(binaryTree);
//     return binaryTree;
// }