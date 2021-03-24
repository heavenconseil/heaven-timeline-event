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
import { Divider, Hidden } from '@material-ui/core';



export default function CustomizedTimeline({setCurrentItem}) {

  const dateNowObj = DateTime.now();
  const [dateTab, setTableau] = useState([]);
  useEffect(() => {
    for( let i = 0; i < 30; i++){    
        setTableau(old => [...old, DateTime.now().plus({ day: i })]);
    }
  }, []);

  const [startDate, setStartDate] = useState(dateNowObj);




  const handleClick = (item) => {
    setCurrentItem(item);
  }

  const handleScroll = (test) => {
    console.log(test.deltaY);
    if(test.deltaY > 0){
      setStartDate(startDate.plus({day : 1}));
    }
    else {
      setStartDate(startDate.minus({day : 1}));
    }
  }
  
  return (
    <div style={{overflow:"hidden"}} onWheel={handleScroll} >
        {[...Array(30).keys()].map(i => {
          return(
            <p onClick={() => handleClick(startDate.plus({day : i}).toISODate())} key={i}>{startDate.plus({day : i}).toISODate()}</p>
          )
        })}
    </div>
  )

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
                {TimelineData[data.monthLong].map((dataJson, idx1) => {  
                          if(data.day == dataJson.date_start)
                          return <Paper data={dataJson} key={idx1} elevation={3} className={styles.paperAlt}  onClick={ () => handleScroll(dataJson)}>
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