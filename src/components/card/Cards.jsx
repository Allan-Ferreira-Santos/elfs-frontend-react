import React from 'react';
import '../card/Style.css';

export default function Cards(props) {
  return (
    <div className="cards">
      <div>
        <img src={props.url} alt="" />
      </div>

      <div className="description">
        <p className="typeProduct">{props.name}</p>
        <p className="price">R$: {props.preco}</p>
      </div>
    </div>
  );
}
