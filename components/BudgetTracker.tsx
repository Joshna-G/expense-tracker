import { Expense } from "./ExpenseForm";

interface Props {
  expenses: Expense[];
  budget: number;
}

export default function BudgetTracker({ expenses = [], budget = 0 }: Props) {
  // Safely calculate total spent with NaN protection
  const totalSpent = expenses.reduce((sum, e) => {
    const amount = Number(e?.amount) || 0; // Handle undefined/null and convert to number
    return sum + (isNaN(amount) ? 0 : amount); // Double protection against NaN
  }, 0);

  // Ensure budget is a valid number
  const validBudget = isNaN(Number(budget)) ? 0 : Number(budget);
  
  const remaining = validBudget - totalSpent;
  const percentageSpent = validBudget > 0 ? (totalSpent / validBudget) * 100 : 0;

  // Format currency with NaN protection
  const formatCurrency = (value: number) => {
    const numValue = isNaN(value) ? 0 : value;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numValue).replace('₹', '₹');
  };

  return (
    <div style={{
      padding: "1.5rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem"
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: "1rem",
        color: "#6a0dad",
        fontSize: "1.25rem"
      }}>Budget Overview</h3>
      
      {/* Progress bar */}
      <div style={{
        height: "10px",
        backgroundColor: "#e9ecef",
        borderRadius: "5px",
        marginBottom: "1.5rem",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${Math.min(percentageSpent, 100)}%`,
          height: "100%",
          backgroundColor: percentageSpent > 80 ? "#dc3545" : "#6a0dad",
          transition: "width 0.3s ease"
        }}></div>
      </div>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        {/* Budget */}
        <div style={{ flex: 1, minWidth: "120px" }}>
          <p style={{
            margin: "0.25rem 0",
            fontSize: "0.875rem",
            color: "#6c757d"
          }}>Total Budget</p>
          <p style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#6a0dad"
          }}>{formatCurrency(validBudget)}</p>
        </div>
        
        {/* Spent */}
        <div style={{ flex: 1, minWidth: "120px" }}>
          <p style={{
            margin: "0.25rem 0",
            fontSize: "0.875rem",
            color: "#6c757d"
          }}>Total Spent</p>
          <p style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#dc3545"
          }}>{formatCurrency(totalSpent)}</p>
        </div>
        
        {/* Remaining */}
        <div style={{ flex: 1, minWidth: "120px" }}>
          <p style={{
            margin: "0.25rem 0",
            fontSize: "0.875rem",
            color: "#6c757d"
          }}>Remaining</p>
          <p style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: remaining >= 0 ? "#28a745" : "#dc3545"
          }}>
            {formatCurrency(Math.abs(remaining))}
            {remaining < 0 && " (Over)"}
          </p>
        </div>
      </div>
    </div>
  );
}