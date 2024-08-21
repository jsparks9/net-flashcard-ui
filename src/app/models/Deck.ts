import Card from "./Card";

export default interface Deck {
  deckId: string;
  user: string;
  deckName: string;
  description: string;
  createdAt: Date;
  cards: Card[];
}
