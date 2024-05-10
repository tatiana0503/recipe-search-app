function MyRecipesComponent (props) {
    return (
        <div>
            <div className="container">
                <h2>{props.label}</h2>
            </div>
            <div className="container">
                <h3> dish type: {props.dish}</h3>
            </div>
            <div className="container">
                <img className="dish" src={props.image} alt="food"/>
            </div>
            
            <ul className="container list">
                {props.ingredients.map((element, index) => (
                     <li key={index}>
                         ✓ {element}
                    </li>
            ))}

            </ul>

        </div>
    )
}

export default MyRecipesComponent;