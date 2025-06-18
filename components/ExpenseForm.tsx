import { useState } from "react";

interface Props {
  onAdd: (expense: Expense) => void;
}

export interface Expense {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [form, setForm] = useState<Expense>({
    title: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "amount" ? parseFloat(value) || 0 : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        console.log("✅ Expense saved");
        if (onAdd) onAdd(form);
        setForm({
          title: "",
          amount: 0,
          category: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        console.error("❌ Failed to save expense");
      }
    } catch (error) {
      console.error("❌ Error submitting expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Dinner, Taxi, etc."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount || ""}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">🍽️ Food</option>
          <option value="Travel">✈️ Travel</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Entertainment">🎮 Entertainment</option>
          <option value="Utilities">💡 Utilities</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Add Expense
      </button>

      <style jsx>{`
        .expense-form {
          max-width: 500px;
          margin: 0 auto;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .form-group {
          margin-bottom: 1.2rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        
        input, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d9adf9;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
        
        .submit-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: #d9adf9;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .submit-btn:hover {
          background-color:#6a0dad;
        }
      `}</style>
    </form>
  );
}