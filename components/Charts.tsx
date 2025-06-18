import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface Expense {
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface Props {
  data: Expense[];
}

export default function Charts({ data }: Props) {
  const categories = Array.from(new Set(data.map((e) => e.category)));

  const amounts = categories.map((cat) =>
    data
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  return (
    <Bar
      data={{
        labels: categories,
        datasets: [
          {
            label: "Expenses",
            data: amounts,
            backgroundColor: "rgba(231, 161, 248, 0.7)",
          },
        ],
      }}
    />
  );
}
