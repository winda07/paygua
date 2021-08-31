import React from "react";
import styles from "./Loading.module.css";
import LoadingGif from "../../img/Loading.gif";

function Loading(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles.loader}>
                <img className={styles.loader} src={LoadingGif} />
                {props.children}
            </div>
        </div>
    ) : "";
}
export default Loading;