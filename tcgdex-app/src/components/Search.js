import React, { Fragment, useState, useEffect } from "react";

export default function Search() {
  const [pokename, setPokename] = useState("");
  const [cards, setCards] = useState([]);

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
      console.log(response);
      console.log(cards);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <form>
        <input
          placeholder="Search Pokemon Name"
          onChange={(e) => setPokename(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {
        <div className="card-images">
          {cards.data.map((card) => (
            <div key={card.id}>
              <img src={card.images.small} />
            </div>
          ))}
        </div>
      }
    </Fragment>
  );
}
