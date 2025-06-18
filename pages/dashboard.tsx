import Layout from "../components/Layout";
import Charts from "../components/Charts";
import ExpenseList from "../components/ExpenseList";
import ExportButtons from "../components/ExportButtons";
import BudgetTracker from "../components/BudgetTracker";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(5000);

  useEffect(() => {
    fetch("/api/expenses")
      .then(res => res.json())
      .then(setExpenses);
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ color: "#6a0dad", marginBottom: "30px" }}>Dashboard</h2>
        
        {/* Budget Tracker Section */}
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "20px", 
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#6a0dad", marginTop: 0 }}>Budget Overview</h3>
          <BudgetTracker expenses={expenses} budget={budget} />
        </div>
        
        {/* Charts Section */}
        <div style={{ marginBottom: "30px" }}>
          <Charts data={expenses} />
        </div>
        
        {/* Expenses Section */}
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "20px", 
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#6a0dad", marginTop: 0 }}>Recent Expenses</h3>
          <ExpenseList expenses={expenses} />
        </div>
        
        <ExportButtons data={expenses} />
      </div>
    </Layout>
  );
}