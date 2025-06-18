import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Expense } from '../lib/types';
import ExportButtons from 'components/ExportButtons';

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Layout>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '1.5rem'
      }}>
        <h2 style={{ 
          color: '#6a0dad', 
          marginBottom: '1.5rem',
          fontSize: '1.75rem'
        }}>Expense History</h2>
        
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '1.5rem'
        }}>
          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading expenses...</p>
          ) : expenses.length === 0 ? (
            <p style={{ 
              textAlign: 'center', 
              color: '#6c757d',
              fontStyle: 'italic'
            }}>No expenses recorded yet</p>
          ) : (
            <div style={{
              maxHeight: 'calc(100vh - 300px)',
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}>
              {expenses.map((expense, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #f5f5f5',
                }}>
                  <div style={{ flex: 2 }}>
                    <p style={{ 
                      margin: 0,
                      fontWeight: 'bold',
                      color: '#333'
                    }}>{expense.title}</p>
                    <p style={{ 
                      margin: '0.25rem 0 0 0',
                      fontSize: '0.875rem',
                      color: '#6c757d'
                    }}>
                      {new Date(expense.date).toLocaleDateString()} • {expense.category}
                    </p>
                  </div>
                  
                  <div style={{ 
                    flex: 1, 
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: '#dc3545',
                    fontSize: '1.1rem'
                  }}>
                    ₹{Number(expense.amount).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
       <ExportButtons data={expenses} />
    </Layout>
  );
}