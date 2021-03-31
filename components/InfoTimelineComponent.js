import styles from '../styles/Main.module.scss'
import InfoItem from "./InfoItem"
import TimelineData from './data.json';
import React, { useState } from 'react';

// imput autotcomplete
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

function InfoTimeline({currentItem}) {

  const classes = useStyles()

  const [valueImputTab,setValueImput] = useState()

  const handleChange = e => setValueImput(e.target.value)


  const tagTab = [];
  // création d un tableau qui réuni tout tag sans doublon
  const doTagTab = () => {
    for (const property in TimelineData) {
      TimelineData[property].map((data) => {
        data.tag.map((data1) => {
          let check = tagTab.indexOf(data1)
          if(check == -1){
            tagTab.push(data1)
          }
        })
      })
    }
  }
  doTagTab()

  
  
  return (
    <div className={styles.boxContainerCard}>
      <div className={classes.root}>
        <Autocomplete
            // onChange={handleChange}
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
                className={styles.textFieldImput
                }
              />
            )
          }
        />
      </div>
      {/* {valueImputTab} */}
      {currentItem != null && <InfoItem currentItem={currentItem} />}
    </div>
  );
}

export default InfoTimeline;