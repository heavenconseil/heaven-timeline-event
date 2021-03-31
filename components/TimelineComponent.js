import styles from '../styles/Main.module.scss';

// Luxon pour les dates équivalent a "momentjs"
import { DateTime, Settings } from "luxon";

// Timeline composant
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider, Hidden, TableSortLabel } from '@material-ui/core';

import Holidays from 'date-holidays';




export default function CustomizedTimeline({setCurrentItem, TimelineData, tabTagCheck}) {
// lib date
  Settings.defaultLocale = "fr";
  const dateNowObj = DateTime.now().setLocale("fr")
  const [startDate, setStartDate] = useState(dateNowObj)

  // lib holidays
  // var hd = new Holidays('FR')

  // console.log(hd);
  const hd = new Holidays()
  hd.init("FR")
  let allHolidays = hd.getHolidays(2021)
  console.log(allHolidays);


  const testTag = (tagItem) => {
    let check = 0
    let checkEmpty = tabTagCheck.length
    if(tabTagCheck && checkEmpty != 0){
      tabTagCheck.map((data) => {
        let include = tagItem.includes(data)  
        if (include == true) {
          check++
        }
      })
    } 
    if (check > 0 || checkEmpty == 0) {
      return (true)
    } 
    else{
      return(false)
    }
  }

  // création d un tableau qui réuni les données a envoyer au composant parent pour l affichage des infos de l'item
  const handleClick = (itemId, itemTitle, itemResume, itemTag, itemText, itemLink, itemImage, itemDateStart, itemDateEnd) => {
    const item = [
      itemId,
      itemTitle,
      itemResume,
      itemTag,
      itemText,
      itemLink,
      itemImage,
      itemDateStart,
      itemDateEnd
    ]
    setCurrentItem(item);
  }

  // charge une nouvelle date dans le timeline a chaque scroll
  const handleScroll = (test) => {
    if(test.deltaY > 0){
      setStartDate(startDate.plus({day : 1}));
    }
    else {
      setStartDate(startDate.minus({day : 1}));
    }
  }

  return ( 
    <Timeline align="left" onWheel={handleScroll} className={styles.ulAlt}>
          {[...Array(30).keys()].map(i => {
            let d = startDate.plus({day : i})
            let dTimelineData = TimelineData[ d.toFormat("ddMM")]
              return (
                <React.Fragment key={i}>
                  {d.toFormat("dd") == "01" && <h1 className={styles.monthAlt}>{d.monthLong}</h1>}
                  <TimelineItem className={styles.liAlt}>
                    <TimelineOppositeContent>
                      <Typography variant="body2" color="textSecondary">
                      {d.toFormat("cccc d MMMM yyyy")}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color="primary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      { dTimelineData && dTimelineData.map((dataJson, idx1) => {                       
                          let check = testTag(dataJson.tag)
                          if(check == true ){
                            return( 
                              <Paper data={dataJson} key={idx1} elevation={3} className={styles.paperAlt}  onClick={() => handleClick(dataJson.id, dataJson.title, dataJson.resume, dataJson.tag, dataJson.text, dataJson.link, dataJson.image, dataJson.start_date, dataJson.end_date)}>
                                <Typography variant="h6" component="h1">
                                  {dataJson.title}
                                </Typography>
                              </Paper> 
                            )
                          }
                      }) }
                    </TimelineContent>
                 </TimelineItem>
                </React.Fragment>
              )
            }
         )}
    </Timeline>
  )
}