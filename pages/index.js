import Head from 'next/head';
import { useState } from 'react';
import InfoTimeline from '../components/InfoTimelineComponent';
import Timeline from '../components/TimelineComponent';
import styles from '../styles/Main.module.scss';

export default function Home() {

  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Events Timeline </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Events Timeline</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.containerBox}>
         <Timeline setCurrentItem={setCurrentItem}/>
        </div>
        <div className={styles.containerBoxAlt}>
          <InfoTimeline currentItem={currentItem} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Events Timeline est édité par l'agence </p>
        <a
          href="https://heaven.fr/fr/"
          target="_blank"
          rel="noopener noreferrer"
        >Heaven
        </a>
      </footer>
    </div>
  )
}
