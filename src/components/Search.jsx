import React, { useEffect, useState } from "react";
import { searchinput } from "../services/cryptoApi";

import styles from "../module/search.module.css";
import { Vortex } from "react-loader-spinner";
function Search({ currency, setcurrency }) {
  const [text, setText] = useState("");
  const [coin, setCoin] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setCoin([]);
    const controler = new AbortController();
    if (!text) {
      {
        setloading(false);
      }
      return;
    }
    const getsearch = async () => {
      try {
        const res = await fetch(searchinput(text), {
          signal: controler.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoin(json.coins);
          setloading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };
    setloading(true);
    getsearch();
    return () => {
      controler.abort();
    };
  }, [text]);
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setcurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
      </select>
      {(!!coin.length || loading) && (
        <div className={styles.symbol}>
          {loading && <Vortex />}

          <ul>
            {coin.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt="" />
                <p>{coin.symbol}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
