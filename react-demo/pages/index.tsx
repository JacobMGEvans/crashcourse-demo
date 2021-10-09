import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./index.module.css";

const Home = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleString());
  const [asyncElement, setAsyncElement] = useState(false);

  // side effect for current time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>React Testing Crash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Testing React Crash Course Demo</h1>

        <div className={styles.grid}>
          <section className={styles.card}>
            <h3>Counter: </h3>
            <div className={styles["button-container"]}>
              <button
                className={styles.button}
                onClick={() => setCount((count) => count + 1)}
              >
                Increment + 
              </button>
              <button
                className={styles.button}
                onClick={() => setCount((count) => count - 1)}
              >
                Decrement - 
              </button>
              <button className={styles.button} onClick={() => setCount(0)}>
                Reset
              </button>
            </div>
            <output className={styles.count}>{count}</output>
          </section>

          <section className={styles.card}>
            <h3>Learning Resources & Documentation</h3>
            <p>
              React Testing Library:
              <a href="https://testing-library.com/docs/react-testing-library/intro">
                Documentation
              </a>
            </p>
            <p>
              Jest Documentation:
              <a href="https://jestjs.io/docs/en/getting-started">
                Documentation
              </a>
            </p>

            <p>
              Testing Pyramid:
              <a href="https://kentcdodds.com/blog/write-tests">
                Why & what tests to write Blog
              </a>
            </p>
            <p>
              React Testing Library:
              <a href="https://kentcdodds.com/blog/common-mistakes-with-react-testing-library">
                Best Practices Blog
              </a>
            </p>
          </section>

          <section className={styles.card}>
            <h3>Async Button Load</h3>
            <button
              className={styles.button}
              onClick={() =>
                
                setTimeout(() => setAsyncElement((ele) => !ele), 1500)
              }
            >
              Async Load
            </button>
            {asyncElement && (
              <p>
                <b>HELLO WORLD!</b>
              </p>
            )}
          </section>

          <section className={styles.card}>
            <h3>Current Time:</h3>
            <time>{time}</time>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
