import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

import styles from "../module/tablelist.module.css";
import { Vortex } from "react-loader-spinner";
import Modal from "./Modal";
import { getchart } from "../services/cryptoApi";

function TableCoin({ coins, loading, currency, setChart }) {
  return (
    <div className={styles.continer}>
      {!!loading ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total voloume</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coins={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <Vortex />
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coins, currency, setChart }) => {
  const {
    image,
    symbol,
    name,
    current_price,
    total_volume,
    market_cap_change_percentage_24h: market_cap_24,
  } = coins;
  const modalHandler = async () => {
    const res = await fetch(getchart(coins.id));
    const json = await res.json();
    setChart({ ...json, coins });
  };
  return (
    <tr>
      <td>
        <div className={styles.img} onClick={modalHandler}>
          <img src={image} alt={name} />
          <p>{symbol.toUpperCase()}</p>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "USD" && "$"} {currency === "JPY" && "¥"}{" "}
        {currency === "EUR" && "€"} {current_price.toLocaleString()}{" "}
      </td>
      <td className={market_cap_24 > 0 ? styles.selected : styles.err}>
        {market_cap_24.toFixed(2)} %
      </td>
      <td>
        {" "}
        {currency === "USD" && "$"} {currency === "JPY" && "¥"}{" "}
        {currency === "EUR" && "€"} {total_volume.toLocaleString()}
      </td>
      <td>
        <img src={market_cap_24 > 0 ? chartUp : chartDown} alt="" />{" "}
      </td>
    </tr>
  );
};
