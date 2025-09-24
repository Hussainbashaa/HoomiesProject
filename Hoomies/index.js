let food;
let Card = document.getElementById("Card-Cointainer");

const fetchHoomiesRecipies = async (area) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await response.json();
  food = data.meals;

  Card.innerHTML = food
    .map(
      (meal) => `
      <div class="card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img" />
        <h3 class="card-title">${meal.strMeal}</h3>
      </div>
    `
    )
    .join("");
};
fetchHoomiesRecipies("Indian");
let buttons = document.getElementById("crusine-section");
buttons.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let buttonText = e.target.innerText;
    fetchHoomiesRecipies(buttonText);
  }
});
let searchBar = () => {
  let search = document.getElementById("searchInput");
  search.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      let textToSearch = search.value;
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${textToSearch}`
      );
      const data = await response.json();
      food = data.meals;
      if (food) {
        Card.innerHTML = food
          .map(
            (meal) => `
                <div class="card">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img" />
                  <h3 class="card-title">${meal.strMeal}</h3>
                </div>
              `
          )
          .join("");
      } else {
        Card.innerHTML = "<h2>No results found</h2>";
      }
    }
  });
};
searchBar();

async function loadRandomHeroImages() {
  const hero = document.getElementById("hero");

  // List of some cuisines available in TheMealDB
  const areas = [
    "Indian",
    "Pakistani",
    "Chinese",
    "Japanese",
    "American",
    "Turkish",
    "French",
    "Greek",
    "Spanish",
    "Italian",
    "Mexican",
    "Thai",
    "Vietnamese",
    "Russian",
    "Canadian",
  ];

  setInterval(async () => {
    const randomArea = areas[Math.floor(Math.random() * areas.length)];

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${randomArea}`
    );
    const data = await response.json();

    const meals = data.meals;
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    hero.style.backgroundImage = `url(${randomMeal.strMealThumb})`;
  }, 4000);
}

loadRandomHeroImages();
