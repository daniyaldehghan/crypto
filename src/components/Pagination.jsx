import styles from "../module/pagination.module.css";

function Pagination({ pagi, setpagi }) {
  const nextHandler = () => {
    if (pagi >= 10) return;

    setpagi((pagi) => pagi + 1);
  };
  const previousHandler = () => {
    if (pagi <= 1) return;
    setpagi((pagi) => pagi - 1);
  };
  return (
    <div className={styles.continer}>
      <button className={pagi===1?styles.clear:null} onClick={previousHandler}>previous</button>
      <p className={pagi === 1 ? styles.selected : null}>1</p>
      <p className={pagi === 2 ? styles.selected : null}>2</p>
      {pagi > 2 &&
        pagi <
          9&&(
            <>
              {" "}
              <span>...</span>
              <p className={pagi === pagi ? styles.selected : null}>{pagi}</p>
            </>
          )}
      <span>...</span>
      <p className={pagi === 9 ? styles.selected : null}>9</p>
      <p className={pagi === 10 ? styles.selected : null}>10</p>
      <button className={pagi===10?styles.clear:null} onClick={nextHandler}>next</button>
    </div>
  );
}

export default Pagination;
