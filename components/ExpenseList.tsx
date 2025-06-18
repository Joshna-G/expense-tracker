import { Expense } from "./ExpenseForm";

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  return (
    <div style={{ 
      padding: "1.5rem",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem"
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: "1rem",
        color: "#6a0dad",
        fontSize: "1.25rem",
        borderBottom: "2px solid #f0f0f0",
        paddingBottom: "0.5rem"
      }}>Expense History</h3>
      
      {expenses.length === 0 ? (
        <p style={{ 
          textAlign: "center", 
          color: "#6c757d",
          fontStyle: "italic"
        }}>No expenses recorded yet</p>
      ) : (
        <div style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "0.5rem"
        }}>
          {expenses.map((e, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0",
              borderBottom: "1px solid #f5f5f5",
            }}>
              <div style={{ flex: 2 }}>
                <p style={{ 
                  margin: 0,
                  fontWeight: "bold",
                  color: "#333"
                }}>{e.title}</p>
                <p style={{ 
                  margin: "0.25rem 0 0 0",
                  fontSize: "0.875rem",
                  color: "#6c757d"
                }}>
                  {new Date(e.date).toLocaleDateString()} • {e.category}
                </p>
              </div>
              
              <div style={{ 
                flex: 1, 
                textAlign: "right",
                fontWeight: "bold",
                color: "#dc3545",
                fontSize: "1.1rem"
              }}>
                ₹{Number(e.amount).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}