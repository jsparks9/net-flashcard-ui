export default interface Card {
  card_id: string;
  quiz_text: string;
  image?: string;
  answers: string[];
}