import styles from '../styles/TimelineInfo.module.scss';

const TimelineItem = ({ data }) => (
    <div className={styles.card}>
        <div className={styles.titleDate}>
          <p>{data.title}</p>
          <div className={styles.date}>          
            <time>{data.date_start}</time>
            <time>{data.date_end}</time>
          </div> 
        </div>
        <p>{data.category}</p>
        <p>{data.text}</p>
    </div>
);

export default TimelineItem;