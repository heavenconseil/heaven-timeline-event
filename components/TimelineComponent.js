import styles from '../styles/Main.module.scss';
import TimelineData from './data.json';

import { DateTime, Settings } from "luxon";

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

  // const dateNowObjOld = DateTime.now()
  Settings.defaultLocale = "fr";
  const dateNowObj = DateTime.now().setLocale("fr")

  const [startDate, setStartDate] = useState(dateNowObj);

  const handleClick = (itemId, itemTitle, itemResume, itemTag, itemText, itemLink, itemImage, itemColor) => {
    const item = [
      itemId,
      itemTitle,
      itemResume,
      itemTag,
      itemText,
      itemLink,
      itemImage,
      itemColor
    ]
    setCurrentItem(item);
  }

  const handleScroll = (test) => {
    if(test.deltaY > 0){
      setStartDate(startDate.plus({day : 1}));
    }
    else {
      setStartDate(startDate.minus({day : 1}));
    }
  }


  return ( 
    <Timeline align="left" onWheel={handleScroll}>
          {[...Array(30).keys()].map(i => {
            let d = startDate.plus({day : i});
            return( <TimelineItem key={i}>
                    <TimelineOppositeContent>
                      <Typography variant="body2" color="textSecondary">
                      {/* {startDate.plus({day : i}).weekdayLong} {startDate.plus({day : i}).day} {startDate.plus({day : i}).monthLong} {startDate.plus({day : i}).year} */}
                      {d.toFormat("cccc d MMMM yyyy")}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color="" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      { TimelineData[d.toFormat("ddMM")] && TimelineData[d.toFormat("ddMM")].map((dataJson, idx1) => {  
                                if(TimelineData[d.toFormat("ddMM")]){
                                return( 
                                  <Paper data={dataJson} key={idx1} elevation={3} className={styles.paperAlt}  onClick={() => handleClick(dataJson.id, dataJson.title, dataJson.resume, dataJson.tag, dataJson.text, dataJson.link, dataJson.image, dataJson.color)}>
                                    <Typography variant="h6" component="h1">
                                      {dataJson.title}
                                    </Typography>
                                    <Typography>{dataJson.resume}</Typography>
                                  </Paper> 
                                  )
                                }
                      }) }
                    </TimelineContent>
              </TimelineItem>
            )
          })}
    </Timeline>
  )
}