import styles from '../styles/Main.module.scss'
import InfoItem from "./InfoItem"

function InfoTimeline({currentItem}) {


  return (
    <div>
        {currentItem != null && <InfoItem currentItem={currentItem} />}
    </div>
  );
}

export default InfoTimeline;