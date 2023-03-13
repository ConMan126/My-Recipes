// Recipe constructor
function Recipe(name, description, instructions, prepTime, cookTime, totalTime, servings) {
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.totalTime = totalTime;
    this.servings = servings;
}

// UI Constructor

function UI() {}

// Add recipe to List
UI.prototype.addRecipeToList = function(recipe) {
    const list = document.getElementById('recipe-list');

    // Create tr element
    const row = document.createElement('tr');
    // Insert col info
    row.innerHTML = `
    <td class = "text-center py-2"><a href="recipe.html">${recipe.name}</a></td>
    <td class = "text-center py-2"><a href="">${recipe.description}</a></td>`
    

    list.appendChild(row);

}

// Remove fields after submit
UI.prototype.removeInputs = function () {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-description').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-instructions').value = '';
    document.getElementById('prep-time').value = '';
    document.getElementById('cook-time').value = '';
    document.getElementById('total-time').value = '';
    document.getElementById('servings').value = '';
}

// Event listeners 
document.getElementById('recipe-input').addEventListener('submit', function(e){
    // get recipe inputs
    const name = document.getElementById('recipe-name').value;
    const description = document.getElementById('recipe-description').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;
    const prepTime = document.getElementById('prep-time').value;
    const cookTime = document.getElementById('cook-time').value;
    const totalTime = document.getElementById('total-time').value;
    const servings = document.getElementById('servings').value;

    // Instantiate recipe
    const recipe = new Recipe(name, description, instructions, prepTime, cookTime, totalTime, servings);

    // Instantiate UI
    const ui = new UI();

    // Add recipe to list
    ui.addRecipeToList(recipe)

    // Remove inputs
    ui.removeInputs();


    e.preventDefault();
})







