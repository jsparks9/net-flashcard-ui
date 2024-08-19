import Card from "./Card";

export default interface Deck {
  deckId: string;
  deckName: string;
  description: string;
  userId: string;
  cards: Card[];
}