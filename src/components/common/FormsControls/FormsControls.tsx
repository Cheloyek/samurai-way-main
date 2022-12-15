import React from "react";
import {inspect} from "util";
import styles from './FormsControls.module.css'

export const Textarea = ({input, meta, ...props}: any) => {

    const hasError = meta.error && meta.touched
    return (
            <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
                <div>
                    <textarea {...input} {...props}/>
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
    )
}

export const Input = ({input, meta, ...props}: any) => {

    const hasError = meta.error && meta.touched
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}