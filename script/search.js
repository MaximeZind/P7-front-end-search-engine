//Fonction qui va filtrer les recettes en fonction de 
//l'input utilisateur et des tags
export function search(inputKeywords, recipes) {
  const allFilters = inputKeywords.ingredientsTags.concat(inputKeywords.ustensilsTags).concat(inputKeywords.appliancesTags);
  let result = [];
  // Pour chaque recette
  for (let i = 0; i < recipes.length; i += 1) {
    let match = true;
    let count = 0;
    //Si il y a des tags
    if (allFilters.length > 0) {
      //Tags ingrédients
      if (inputKeywords.ingredientsTags.length > 0) {
        for (let j = 0; j < inputKeywords.ingredientsTags.length; j += 1) {
          for (let k = 0; k < recipes[i].ingredients.length; k += 1) {
            if (recipes[i].ingredients[k].ingredient.toLowerCase().includes(inputKeywords.ingredientsTags[j])) {
              count += 1;
            }
          }
        }
      }
      // Tags ustensiles
      if (inputKeywords.ustensilsTags.length > 0) {
        for (let j = 0; j < inputKeywords.ustensilsTags.length; j += 1) {
          for (let k = 0; k < recipes[i].ustensils.length; k += 1) {
            if (recipes[i].ustensils[k].toLowerCase().includes(inputKeywords.ustensilsTags[j])) {
              count += 1;
            }
          }
        }
      }
      // Tags appareils
      if (inputKeywords.appliancesTags.length > 0) {
        for (let j = 0; j < inputKeywords.appliancesTags.length; j += 1) {
          if (recipes[i].appliance.toLowerCase().includes(inputKeywords.appliancesTags[j])) {
            count += 1;
          }
        }
      }
      //Premier tri avec les tags: Si les tags ne correspondent pas à la recette
      //renvoie return, et on passe à la recette suivante
      if ((count !== (inputKeywords.ingredientsTags.length + inputKeywords.appliancesTags.length + inputKeywords.ustensilsTags.length))) {
        continue;
      }
    }

    ////////////////Test de l'input utilisateur//////////////////////

    //Fonction qui renvoie une array de mots clés, à partir d'une recette
    function getRecipeArray(recipe) {
      let ingredients = [];
      for (let i = 0; i < recipe.ingredients.length; i+=1) {
        const ingredient = recipe.ingredients[i].ingredient.toLowerCase().split(' ');
        ingredients = ingredients.concat(ingredient);
      }
      let ustensils = [];
      for (let i = 0; i < recipe.ustensils.length; i+=1) {
        const ustensil = recipe.ustensils[i].toLowerCase().split(' ');
        ustensils = ustensils.concat(ustensil);
      }
      let instructions = recipe.description.toLowerCase().split(' ');
      let appliance = recipe.appliance.toLowerCase();
      let title = recipe.name.toLowerCase().split(' ');
      let keywords = title.concat(ingredients)
        .concat(instructions)
        .concat(appliance)
        .concat(ustensils);
        let filteredKeywords = [];
      for (let i = 0; i < keywords.length; i++) {
        const word = keywords[i];
          filteredKeywords.push(word);
      }
      return filteredKeywords;

    }

    if (inputKeywords) {
      let recipeKeywords = getRecipeArray(recipes[i]).join(' ');
      for (let j = 0; j < inputKeywords.input.length; j += 1) {
        if (!recipeKeywords.includes(inputKeywords.input[j])) {
          match = false;
          continue;
        }
      }
    }
    // Si elle match, on rajoute cette recette au résultat
    if (match) {
      result.push(recipes[i]);
    }
  }
  return result;
}
