import React, { Component } from 'react';
import './App.css';
import DrawButton from './Components/DrawButton/DrawButton'
import Card from './Components/Card/Card';
import firebase from 'firebase/app';
import 'firebase/database';
import 'tachyons';

import {DB_CONFIG} from './config/firebase/db_config';
class App extends Component {

  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards')
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [
        
      ],
      currentCard:{}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;
    this.database.on('child_added',snap=>{
      currentCards.push(
        {
          id:snap.key,
          term:snap.val().term,
          definition:snap.val().definition
        }
      )
      this.setState(
        {
          cards:currentCards,
          currentCard:this.getRandomCard(currentCards)
        }
      )
    }
  
  )
    
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }
  updateCard(){
    const currentCards = this.state.cards;
    this.setState(
      {
        currentCard:this.getRandomCard(currentCards)
      }
    )
  }
  render() {
    return (
      <div className="App">
      <div className="CardRow">
      <Card term={this.state.currentCard.term} definition={this.state.currentCard.definition}/>
      </div>
        <div className="ButtonRow">
        <DrawButton drawCard={this.updateCard}/>
        </div>
        
      </div>
    );
  }
}

export default App;
