import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [totalExpenses, setTotalExpenses] = useState(0);
  type Expense = { title: string; amount: number };
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      // Fix for NaN issue - properly handle amount conversion
      const total = data.reduce((sum: number, expense: any) => {
        // Handle cases where amount might be a string with space in key
        const amount = expense.amount || (expense as any)[" amount"];
        // Convert to number, default to 0 if invalid
        const amountNum = Number(amount) || 0;
        return sum + amountNum;
      }, 0);
      
      setTotalExpenses(total);
      setRecentExpenses(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

  const quickActions = [
    { title: "Add Expense", icon: "💵", path: "/add-expense" },
    { title: "View Dashboard", icon: "📊", path: "/dashboard" },
    { title: "See All Expenses", icon: "📋", path: "/expense-list" },
  ];

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Head Section */}
        <div style={{
          backgroundColor: "#6a0dad",
          color: "white",
          padding: "3rem 2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center",
          background: "linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)"
        }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            marginBottom: "1rem",
            fontWeight: "700"
          }}>Welcome to Expense Tracker</h1>
          <p style={{ 
            fontSize: "1.25rem",
            marginBottom: "2rem",
            opacity: "0.9"
          }}>Take control of your finances with our powerful tracking tools</p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap"
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.path)}
                style={{
                  backgroundColor: "white",
                  color: "#6a0dad",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <span>{action.icon}</span>
                {action.title}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
        <div style={{
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center"
}}>
  <h3 style={{ color: "#6c757d", marginTop: 0 }}>Total Expenses</h3>
  {isLoading ? (
    <div style={{ 
      height: "60px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{
        width: "24px",
        height: "24px",
        border: "3px solid #f3f3f3",
        borderTop: "3px solid #6a0dad",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ) : (
    <>
      <p style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        color: "#dc3545",
        margin: "0.5rem 0"
      }}>
        ₹{totalExpenses.toLocaleString('en-IN')}
      </p>
      <p style={{ color: "#6c757d", fontSize: "0.9rem" }}>
        All time recorded expenses
      </p>
    </>
  )}
</div>

          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3 style={{ color: "#6c757d", marginTop: 0 }}>Recent Activity</h3>
            {isLoading ? (
              <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Loading...</p>
              </div>
            ) : recentExpenses.length === 0 ? (
              <p style={{ color: "#6c757d", fontStyle: "italic" }}>No recent expenses</p>
            ) : (
              <div>
                {recentExpenses.map((expense, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    <span>{expense.title}</span>
                    <span style={{ color: "#dc3545", fontWeight: "600" }}>
                      ₹{Number(expense.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3 style={{ color: "#6c757d", marginTop: 0 }}>Quick Tips</h3>
            <ul style={{
              textAlign: "left",
              paddingLeft: "1.5rem",
              color: "#495057"
            }}>
              <li>Track daily expenses for better budgeting</li>
              <li>Review your spending weekly</li>
              <li>Set monthly financial goals</li>
              <li>Use categories to analyze spending</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#6a0dad", textAlign: "center", marginBottom: "1.5rem" }}>Key Features</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            {[
              {
                icon: "📊",
                title: "Visual Dashboard",
                description: "Beautiful charts to visualize your spending patterns"
              },
              {
                icon: "📱",
                title: "Easy Input",
                description: "Quickly add expenses from any device"
              },
              {
                icon: "📅",
                title: "Date Tracking",
                description: "Organize expenses by date for better insights"
              },
              {
                icon: "🏷️",
                title: "Categories",
                description: "Categorize expenses for detailed analysis"
              }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem"
                }}>{feature.icon}</div>
                <h3 style={{
                  color: "#6a0dad",
                  marginTop: 0,
                  marginBottom: "0.5rem"
                }}>{feature.title}</h3>
                <p style={{ color: "#495057" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}