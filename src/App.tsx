import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function App() {
  const [count, setCount] = useState(0);
  const [income, setIncome] = useState(12000);
  const [expenses, setExpenses] = useState(6000);
  const [net, setNet] = useState(1000);
  const [withdraw, setWithdraw] = useState(4);

  var net_income = income - expenses;


  var year = new Date().getFullYear();
  var labels = [year.toString()];
  var values = [net + net_income];
  var savings_values = [net + net_income];

  var multiplier = 100 / withdraw;
  var required = (100 / withdraw) * expenses;
  var i = 0;
  while (values[values.length - 1] * (withdraw / 100) < expenses) {
    year += 1;
    i += 1;
    labels.push(year.toString());
    values.push(values[values.length - 1] * (1 + (5 / 100)) + net_income);
    savings_values.push(savings_values[savings_values.length - 1] + net_income);

    if (i > 100) {
      break;
    }
  }

  console.log(savings_values);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Portifolio',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: values,
      },
      {
        label: 'Savings',
        backgroundColor: 'rgb(255, 255, 5)',
        borderColor: 'rgb(255, 255, 5)',
        data: savings_values,
      }]
  };

  return (
    <div>
      <h1><span className='fire'>FIRE</span> Calcutor</h1>
      <div className='graph-container'>
        <form className='graph-inputs'>
          <label htmlFor='income'>Yearly income after tax</label>
          <input id="income" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}></input>
          <label htmlFor='expenses'>Yearly expenses</label>
          <input id="expenses" type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))}></input>
          <label htmlFor='net-worth'>Current Net Worth</label>
          <input id="net-worth" type="number" value={net} onChange={(e) => setNet(Number(e.target.value))}></input>
          <label htmlFor='withdraw'>Desired Withdraw rate</label>
          <input id="withdraw" type="number" value={withdraw} onChange={(e) => setWithdraw(Number(e.target.value))}></input>
        </form>
        <div className='chart'>
          <Line data={data} />
        </div>
      </div>

    </div>
  )
}

export default App
