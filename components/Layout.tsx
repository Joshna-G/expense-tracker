import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>💸 Expense Tracker</h2>
        <nav style={navStyle}>
          <Link href="/" style={linkStyle}>
            <div style={navItemStyle}>
              <span>🏠</span> Home
            </div>
          </Link>
          <Link href="/add-expense" style={linkStyle}>
            <div style={navItemStyle}>
              <span>💵</span> Add Expense
            </div>
          </Link>
          <Link href="/dashboard" style={linkStyle}>
            <div style={navItemStyle}>
              <span>📊</span> Dashboard
            </div>
          </Link>
          <Link href="/expense-list" style={linkStyle}>
            <div style={navItemStyle}>
              <span>📋</span> Expense List
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={mainStyle}>{children}</main>
      
    </div>
  );
}

// Styling
const containerStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
};

const sidebarStyle: React.CSSProperties = {
  width: "250px",
  backgroundColor: "#c582f5",
  color: "#530b86",
  padding: "1.5rem 1rem",
  position: "fixed",
  height: "100vh",
  boxSizing: "border-box",
};

const logoStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "2rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const linkStyle: React.CSSProperties = {
  color: "#530b86",
  textDecoration: "none",
};

const navItemStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  transition: "background-color 0.2s",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  marginLeft: "250px", // Same as sidebar width
  padding: "2rem",
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
};