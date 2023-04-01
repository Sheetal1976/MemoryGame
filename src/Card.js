/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import caterpie from './images/caterpie.png';
import charizard from './images/charizard.jpg';
import dragon from './images/dragon.png';
import pikachu from './images/pikachu.jpg';
import rock from './images/rock.jpg';
import squirtle from './images/squirtle.png';
import Card from './images/Card.png';

const cardImages = [
  {  image: caterpie , matched: false},
  {  image: charizard , matched: false},
  {  image: dragon , matched: false},
  {  image: pikachu , matched: false},
  {  image: rock , matched: false},
  {  image: squirtle , matched: false},
];

const ShuffleCards = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setOne]=useState(null);
  const [choiceTwo , setTwo]=useState(null);
  const [disable ,setDisabled]=useState(false);

  const handleShuffle = () => {
    const shuffle = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((Newcard) => ({ ...Newcard, id: Math.random() }));

    setOne(null);
    setTwo(null);
    setCards(shuffle);
    setTurns(0);
    
  };

  const handleClick = (card) => {
    if (!disable && !card.matched) {
      choiceOne ? setTwo(card) : setOne(card);
    }
  }

  useEffect(()=>{
    handleShuffle();
  },[])

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
        if(choiceOne.image===choiceTwo.image){
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.image === choiceOne.image) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          
          resetTurn();
        }
        else{
           setTimeout(()=> resetTurn(), 1000);
        }
    }
  },[choiceOne,choiceTwo])
 
 const resetTurn=()=>{
    setOne(null);
    setTwo(null);
    setTurns(turns=>turns+1);
    setDisabled(false)
 }

 const flipped=(card)=>{
  return card===choiceOne|| card===choiceTwo||card.matched;
 }

  return (
    <div>
        <h1>Memory Game</h1>
        <button onClick={handleShuffle}>New Game</button>

        <div className='card-grid'>
            {cards.map((card) => (
                <div className='card'  key={card.id}>
                    <div className={flipped(card)? "flipped": ""}>
                        <img className='back' src={Card} style={{width: '150px', height: '150px'}} onClick={() => handleClick(card)} alt='front'/>
                        <img className='front' src={card.image} style={{width: '150px', height: '150px'}}  alt='back'/>
                    </div>
                </div>
            ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
};

export default ShuffleCards;
