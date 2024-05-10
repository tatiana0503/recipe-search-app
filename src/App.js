import { useEffect, useState } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import video from './salad.mp4';
import button from './diet.png';
import MyRecipesComponent from './MyRecipesComponent';

function App() {
  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("orange");

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=0a3761ce&app_key=%20a65b11ad84440b6cf237aff8b65fdc85`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    getRecipe();
  }, [wordSubmitted])

  const myRecipeSeach = (e) => {
    setMySearch(e.target.value);
   }

   const finalSearch = (e) => {
    e.preventDefault();
    if (mySearch === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a word!",
      });
    }
    else (setWordSubmitted(mySearch))
    
   }


  return (
    <div className='App'>
      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>
        </video>
        <h1>Let's find a recipe!</h1>
      </div>
      <div className='container'>
        <form onSubmit={finalSearch}>
        <input onChange={myRecipeSeach} value={mySearch} className='search' type='text' placeholder='Search' />
        </form>
      </div>
      <div className='container'>
      <button onClick={finalSearch}>
          <img src={button} alt='icon' width='50px'/>
        </button>
      </div>

      {myRecipes.map((element, index) => (
        <MyRecipesComponent key={index}
        label={element.recipe.label}
        image={element.recipe.image}
        dish={element.recipe.dishType}
        time={element.recipe.totalTime}
        ingredients={element.recipe.ingredientLines}
        />
      ))}

    </div>
  );
}

export default App;
