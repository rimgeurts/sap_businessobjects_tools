import React from 'react';
import CustomInput from '../UI/CustomInput';
import styles from './LoginForm.module.scss';

const LoginForm = (props) => {

    return (
        <form className={styles.loginform} onSubmit={props.handleSubmit} >
            <CustomInput
                className={styles.login}
                onClick={props.handleClick}
                type="text"
                name="username"
                value={props.server.username}
                onChange={props.handleChange}
            />

            <CustomInput
                className={styles.login}
                onClick={props.handleClick}
                type="password"
                name="password"
                value={props.server.password}
                onChange={props.handleChange}
            />

            <CustomInput
                className={styles.login}
                onClick={props.handleClick}
                type="text"
                name="server"
                value={props.server.server}
                onChange={props.handleChange}
            />
            
            <input
                className={styles.loginbutton} 
                type="submit" 
                value="Login" 
            />
        </form>
    )
}

export default LoginForm;