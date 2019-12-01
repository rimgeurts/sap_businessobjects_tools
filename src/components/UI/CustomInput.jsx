import React from 'react';
import styles from './CustomInput.module.scss';

const CustomInput = (props) => {
    
    return (
        <input 
            className={styles.custominput}
            {...props}
        />

        
    )
}

export default CustomInput;