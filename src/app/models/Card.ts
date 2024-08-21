export default interface Card {
  cardId: string;
  user: string;
  quizText: string;
  answer: string;
  image?: string;
  createdAt: Date;
}
