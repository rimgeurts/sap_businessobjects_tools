import React from "react";
import styles from "./Modal.module.scss";

const Modal = props => {
  return (
    <div className={styles.modal}>
      <form className={styles.container}>
      
        <label className={styles.row}>Username: <input type="text"/></label>
        <label className={styles.row}>Password: <input type="text"/></label>
        <label className={styles.row}>System: <input type="text"/></label>
      </form>
    </div>
  );
};

export default Modal;
