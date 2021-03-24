import styles from '../styles/Main.module.scss';
import TimelineData from './data.json';

import { DateTime } from "luxon";

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



export default function CustomizedTimeline() {

  const dateNowObj = DateTime.now();
  const [dateTab, setTableau] = useState([]);
  useEffect(() => {
    for( let i = 0; i < 30; i++){    
        setTableau(old => [...old, DateTime.now().plus({ day: i })]);
    }
  }, []);

  const handleClick = (test) => {
    console.log(test);
  }

  // console.log(dateNowObj);
  // console.log(TimelineData);
  // var weekNow = dateNowObj.weekNumber;
  // var dateNow = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  // var info = dateNowObj.Info.months("long", { locale: "fr" });
  // var test = DateTime.fromISO('2017-W23-3') //=> '2017-W24-5'.
  // var test = DateTime.fromISO('2017-W23-3').plus({semaines : 1, jours : 2 }).toISOWeekDate() ; //=> '2017-W24-5'.
  // console.log(dateNowObj);
  // console.log(TimelineData);
  // console.log(tab);
  // console.log(TimelineData.mars);

  return (

      <Timeline align="alternate">
        {dateTab.map((data, idx) => (
            <TimelineItem data={data} key={idx} className={styles.marginAltBottom}>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                  {data.weekdayLong} {data.day} {data.monthLong} {data.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color={data.color} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                {TimelineData.[data.monthLong].map((dataJson, idx1) => {  
                          if(data.day == dataJson.date_start)
                          return <Paper data={dataJson} key={idx1} elevation={3} className={styles.paperAlt}  onClick={ () => handleClick(dataJson)}>
                              <Typography variant="h6" component="h1">
                                {dataJson.title}
                              </Typography>
                              <Typography>{dataJson.resume}</Typography>
                            </Paper> 
                }) }
                </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
  );
}