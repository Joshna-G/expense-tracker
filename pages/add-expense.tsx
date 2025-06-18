import Layout from "../components/Layout";
import ExpenseForm from "../components/ExpenseForm";

export default function AddExpensePage() {
  return (
    <Layout>
      <h2 style={{ color: "#6a0dad" }}>Add New Expense</h2>
      <ExpenseForm onAdd={(expense) => { /* handle the new expense here */ }} />
    </Layout>
  );
}
