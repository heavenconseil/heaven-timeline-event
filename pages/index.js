import Head from "next/head";
import { useState } from "react";
import InfoTimeline from "../components/InfoTimelineComponent";
import Timeline from "../components/TimelineComponent";
import styles from "../styles/Main.module.scss";

// imput autotcomplete
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

import TimelineData from '../components/data.json';


const useStyles = makeStyles((theme) => ({
	root: {
	  width: 500,
	  '& > * + *': {
		marginTop: theme.spacing(3),
	  },
	},
  }));

export default function Home() {
  const [currentItem, setCurrentItem] = useState(null);

  const [tabTagCheck, setTabTagCheck] = useState([]);
  
  const classes = useStyles()


  const tagTab = [];
  // création d un tableau qui réuni tout tag sans doublon
  const doTagTab = () => {
    for (const property in TimelineData) {
      TimelineData[property].map((data) => {
        data.tag.map((data1) => {
          let check = tagTab.indexOf(data1);
          if (check == -1) {
            tagTab.push(data1);
          }
        });
      });
    }
  };
  doTagTab();

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
          <Timeline setCurrentItem={setCurrentItem} TimelineData={TimelineData} tabTagCheck={tabTagCheck}/>
        </div>
        <div className={styles.containerBoxAlt}>
          <Autocomplete
            onChange={(e, value) => {
              setTabTagCheck(value)
            }}
            multiple
            id="tags-outlined"
            options={tagTab}
            getOptionLabel={(tagTab) => tagTab}
            filterSelectedOptions
            className={styles.filtreImput}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Filtre events"
                placeholder="Favorites"
                className={styles.textFieldImput}
              />
            )}
          />
          <InfoTimeline currentItem={currentItem} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Events Timeline est édité par l'agence </p>
        <a
          href="https://heaven.fr/fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Heaven
        </a>
      </footer>
    </div>
  );
}
