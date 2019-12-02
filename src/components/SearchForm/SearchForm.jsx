import React from 'react';
import styles from './SearchForm.module.scss'
import CustomInput from '../UI/CustomInput'


const SearchForm = (props) => {

    return (
        <div className="container">
            
            <form className={styles.loginform} onSubmit={props.handleReportInfoSubmit}>
                <div className="form1">
                    <label className={styles.label} onChange={props.handleReportInfoChange}> Enter Report ID:
                        <CustomInput type="text"></CustomInput>
                    </label>
                </div>
                <div className="form2"> 
                    <label className={styles.label}> Report Name:
                        <CustomInput readOnly type="text" value={props.reportName}></CustomInput>
                    </label>
                </div>
                <CustomInput type="submit" value="Search..."></CustomInput>
            </form>
        </div>
    )
}

export default SearchForm;

