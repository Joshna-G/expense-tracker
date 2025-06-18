export interface Expense {
  _id?: string;
  userId: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}
