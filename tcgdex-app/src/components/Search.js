import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [pokename, setPokename] = useState("");
  const [cards, setCards] = useState([]);
  const [cardsFetched, setCardsFetched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${pokename}`
      ); /*, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });*/
      const cardData = await response.json();
      setCards(cardData);
      setCardsFetched(true);
      console.log(response);
      console.log(cards);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="NavBars">
        <Link className="Links" to="/home">
          Home
        </Link>
        <Link className="Links" to="/userProfile">
          UserProfile
        </Link>
        <Link className="Links" to="/login">
          Login
        </Link>
        <Link className="Links" to="/collection">
          Collection
        </Link>
        <Link className="Links" to="/search">
          Search
        </Link>
      </div>
      <form>
        <input
          placeholder="Search Pokemon Name"
          onChange={(e) => setPokename(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Search</button>
      </form>

      <div className="cardImages">
        {cardsFetched ? (
          cards.data.map((card) => (
            <div className="individual-card" key={card.id}>
              <img src={card.images.small} />
            </div>
          ))
        ) : (
          <div className="nosearch">Searched cards will appear below</div>
        )}
      </div>
    </Fragment>
  );
}
