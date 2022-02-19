import AddButtons from "./AddButtons";
import styles from "./styles/pages.module.css"

export default function HistoryPage(){
    return (
        <div className={styles.page}>
         <h1>HistoryPage</h1>
         <AddButtons/>
        </div>
    );
}