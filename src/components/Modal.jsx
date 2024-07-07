import React, { useState } from "react";
import styles from "../module/moda.module.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { conver } from "../helpers/chartobject";
function Modal({ setChart, chart }) {
  const [type, setType] = useState("prices");
  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const typ = e.target.innerText.toLowerCase().replace(" ", "_");
      setType(typ);
    }
  };
  const clearHandler = () => {
    setChart(null);
  };
  return (
    <div className={styles.modal}>
      <span className={styles.clear} onClick={clearHandler}>
        X
      </span>
      <div className={styles.box}>
        <div className={styles.name}>
          <img src={chart.coins.image} alt="" />
          <p>{chart.coins.symbol}</p>
        </div>
        <div className={styles.chart}>
          <Chartrow data={conver(chart, type)} type={type} />
        </div>
        <div className={styles.button} onClick={typeHandler}>
          <button>prices</button>
          <button>market caps</button>
          <button>total volumes</button>
        </div>
        <div className={styles.list}>
          <div>
            <p>Prices :</p>
            <span>$ {chart.coins.current_price}</span>
          </div>
          <div>
            <p>ATH :</p>
            <span> {chart.coins.ath} </span>
          </div>
          <div>
            <p>total volume :</p>
            <span>{chart.coins.total_volume}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

const Chartrow = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />

        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
