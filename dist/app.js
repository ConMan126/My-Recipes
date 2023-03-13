// Recipe constructor
class Recipe {
    constructor(name, description, ingredients, instructions, prepTime, cookTime, totalTime, servings) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
        this.servings = servings;
    }
}

// Update UI Class
class UI {
    addRecipeToList(recipe) {
        const list = document.getElementById('recipe-list');

        // Create tr element
        const row = document.createElement('tr');
        // Insert col info
        row.innerHTML = `
        <td class = "text-center py-2"><a id = "recipe-list-name" href="">${recipe.name}</a></td>
        <td class = "text-center py-2">${recipe.description}</td>
        <td><a href="#" class = "delete">X</a></td>`;
    

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create Div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.getElementById('recipe-input');
        // Insert Alert
        container.insertBefore(div, form);

        // Timeout after 3 sections
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    removeInputs() {
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-description').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-instructions').value = '';
        document.getElementById('prep-time').value = '';
        document.getElementById('cook-time').value = '';
        document.getElementById('total-time').value = '';
        document.getElementById('servings').value = '';
    }

    delteRecipe(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// Add to LS Class
class Store {
    static getRecipe() {
        let recipes;
        if(localStorage.getItem('recipes') === null) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }

        return recipes;
    }

    static displayRecipe() {
        const recipes = Store.getRecipe();

        recipes.forEach(function(recipe) {
            const ui = new UI
            // Add recipe to UI
            ui.addRecipeToList(recipe);
        })
    }

    static addRecipe(recipe) {
        const recipes = Store.getRecipe();

        recipes.push(recipe);

        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    static removeRecipe(description) {
        const recipes = Store.getRecipe();

        recipes.forEach(function(recipe, index) {
            if(recipe.description === description) {
                recipes.splice(index, 1);
            }
        });

        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayRecipe);

// Event listener for Adding Recipe
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
    const recipe = new Recipe(name, description, ingredients, instructions, prepTime, cookTime, totalTime, servings);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(name === '' || description === '' || ingredients === '' || instructions === '') {
        ui.showAlert('PLEASE ENTER ALL REQUIRED FIELDS', 'error');
    } else {
        ui.showAlert('RECIPE SUCCESSFULLY ENTERED', 'success');

        // Add recipe to list
        ui.addRecipeToList(recipe);

        // Add to LS 
        Store.addRecipe(recipe);
    
        // Remove inputs
        ui.removeInputs();
    }

    e.preventDefault();
})

// Event listener for delete
document.getElementById('recipe-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();

    // Delete Recipe
    ui.delteRecipe(e.target);

    // Remove from LS 
    Store.removeRecipe(e.target.parentElement.previousElementSibling.firstChild.textContent);

    // console.log(e.target.parentElement.previousElementSibling.firstChild.textContent);

    // Delete Recipe Message
    if(e.target.classList.contains('delete')) {
        ui.showAlert('Recipe Successfully Removed', 'success');
    }

    e.preventDefault();
})

// Event Listener for click
document.getElementById('recipe-list').addEventListener('click', function(e) {
    const recipeArr = JSON.parse(localStorage.getItem('recipes'));
    for(let i = 0; i < recipeArr.length; i++) {
        if(e.target.textContent === recipeArr[i].name) {
            const name = recipeArr[i].name;
            const description = recipeArr[i].description;
            const ingredients = recipeArr[i].ingredients;
            const instructions = recipeArr[i].instructions;
            const prepTime = recipeArr[i].prepTime;
            const cookTime = recipeArr[i].cookTime;
            const totalTime = recipeArr[i].totalTime;
            const servings = recipeArr[i].servings;
            
            document.getElementById('recipe-header').innerHTML = name;
            document.getElementById('recipe-name-specific').value = name;
            document.getElementById('recipe-description-specific').value = description;
            document.getElementById('recipe-ingredients-specific').textContent = ingredients;
            document.getElementById('recipe-instructions-specific').textContent = instructions;
            document.getElementById('prep-time-specific').value = prepTime;
            document.getElementById('cook-time-specific').value = cookTime;
            document.getElementById('total-time-specific').value = totalTime;
            document.getElementById('servings-specific').value = servings;
        }
    }

    e.preventDefault();
})

// Event listener to show recipe
document.getElementById('recipe-list').addEventListener('click', function(e) {
    if(e.target.id === 'recipe-list-name') {
        document.getElementById('recipe-form').style.display = 'block';
        document.getElementById('recipe-home').style.display = 'none';
    
        e.preventDefault();
    }

    e.preventDefault();
})

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}




    



    






