//Fonction qui va filtrer les recettes en fonction de l'input
export function search(inputKeywords, recipes) {
    const allFilters = inputKeywords.ingredientsTags.concat(inputKeywords.ustensilsTags).concat(inputKeywords.appliancesTags);
    let result = [];
    // Pour chaque recette
    recipes.forEach((recipe) => {
        let match = true;
        let count = 0;
        //Si il y a des tags
        if (allFilters.length > 0) {
            //Tags ingrédients
            if (inputKeywords.ingredientsTags.length > 0) {
                inputKeywords.ingredientsTags.forEach((item) => {
                    recipe.ingredients.forEach((ingredient) => {
                        if (ingredient.ingredient.toLowerCase().includes(item)) {
                            count += 1;
                        }
                    });
                });
            }
            // Tags ustensiles
            if (inputKeywords.ustensilsTags.length > 0) {
                inputKeywords.ustensilsTags.forEach((item) => {
                    recipe.ustensils.forEach((ustensil) => {
                        if (ustensil.toLowerCase().includes(item)) {
                            count += 1;
                        }
                    });
                });
            }
            // Tags appareils
            if (inputKeywords.appliancesTags.length > 0) {
                inputKeywords.appliancesTags.forEach((item) => {
                    if (recipe.appliance.toLowerCase().includes(item)) {
                        count += 1;
                    }
                });
            }
            //Premier tri avec les tags: Si les tags ne correspondent pas à la recette
            //renvoie return, et on passe à la recette suivante
            if ((count !== (inputKeywords.ingredientsTags.length + inputKeywords.appliancesTags.length + inputKeywords.ustensilsTags.length))) {
                return;
            }
        }

        /////////// Test de l'input utilisateur ///////////

        //Fonction qui renvoie une array de mots clés, à partir d'une recette
        function getRecipeArray(recipe) {
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
            return keywords;
        }

        if (inputKeywords) {
            let recipeKeywords = getRecipeArray(recipe).join(' ');
            inputKeywords.input.forEach((keyword) => {
                if (!recipeKeywords.includes(keyword)) {
                    match = false;
                    return;
                }
            });
        }
        // Si elle match, on rajoute cette recette au résultat
        if (match) {
            result.push(recipe);
        }
    });
    return result
}