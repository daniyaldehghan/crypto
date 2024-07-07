import React, { useEffect, useState } from "react";
import { getData } from "../services/cryptoApi";
import TableCoin from "./TableCoin";
import Pagination from "./Pagination";
import Search from "./Search";
import Modal from "./Modal";

function Homepage() {
  const [loading, setloading] = useState(false);
  const [coins, setcoins] = useState([]);
  const [pagi, setpagi] = useState(1);
  const [currency, setcurrency] = useState("USD");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const fechData = async () => {
      const res = await fetch(getData(pagi, currency));
      const json = await res.json();
      setcoins(json);
      setloading(true);
    };
    fechData();
  }, [pagi, currency]);
  return (
    <div>
      <Search currency={currency} setcurrency={setcurrency} />
      <TableCoin coins={coins} loading={loading} currency={currency}  setChart={setChart}/>
      <Pagination pagi={pagi} setpagi={setpagi} />
      {chart&&<Modal setChart={setChart} chart={chart}/>}
    </div>
  );
}

export default Homepage;
