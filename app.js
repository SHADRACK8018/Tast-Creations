// Fetch the recipe data from db.json and handle CRUD operations

let recipes = [];
const recipeList = document.getElementById('recipeList');
const recipeFormContainer = document.getElementById('recipeFormContainer');
const recipeForm = document.getElementById('recipeForm');
const closeFormBtn = document.getElementById('closeFormBtn');
const addRecipeBtn = document.getElementById('addRecipeBtn');

// Fetch recipes from db.json (for mock data, replace this with actual fetching)
fetch('db.json')
    .then(response => response.json())
    .then(data => {
        recipes = data;
        renderRecipes();
    })
    .catch(err => console.error('Error fetching recipes:', err));

// Add Recipe Button Handler
addRecipeBtn.addEventListener('click', () => {
    document.getElementById('formTitle').textContent = 'Add a New Recipe';
    recipeForm.reset();
    recipeFormContainer.style.display = 'flex';
});

// Close Form Button Handler
closeFormBtn.addEventListener('click', () => {
    recipeFormContainer.style.display = 'none';
});

// Render Recipes on the Page
function renderRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
            <button onclick="editRecipe(${recipe.id})">Edit</button>
            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Add or Update Recipe
recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value.split(',').map(i => i.trim());
    const steps = document.getElementById('recipeSteps').value.split('\n').map(s => s.trim());
    const cookingTime = document.getElementById('recipeTime').value;

    if (name && ingredients && steps && cookingTime) {
        const newRecipe = {
            id: recipes.length + 1,
            name,
            ingredients,
            steps,
            cookingTime,
        };
        recipes.push(newRecipe);
        renderRecipes();
        recipeFormContainer.style.display = 'none';
    }
});

// Edit Recipe
function editRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        document.getElementById('formTitle').textContent = 'Edit Recipe';
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeIngredients').value = recipe.ingredients.join(', ');
        document.getElementById('recipeSteps').value = recipe.steps.join('\n');
        document.getElementById('recipeTime').value = recipe.cookingTime;
        recipeFormContainer.style.display = 'flex';

        // Update Recipe on Submit
        recipeForm.onsubmit = (e) => {
            e.preventDefault();
            recipe.name = document.getElementById('recipeName').value;
            recipe.ingredients = document.getElementById('recipeIngredients').value.split(',').map(i => i.trim());
            recipe.steps = document.getElementById('recipeSteps').value.split('\n').map(s => s.trim());
            recipe.cookingTime = document.getElementById('recipeTime').value;

            renderRecipes();
            recipeFormContainer.style.display = 'none';
        };
    }
}

// Delete Recipe
function deleteRecipe(id) {
    recipes = recipes.filter(recipe => recipe.id !== id);
    renderRecipes();
}