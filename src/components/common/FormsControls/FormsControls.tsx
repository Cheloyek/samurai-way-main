import React from "react";
import { Field } from "redux-form";
import {inspect} from "util";
import styles from './FormsControls.module.css'

const FormControl = ({input, meta: {touched, error}, ...props}: any) => {

    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {

    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder: any, name: any, validators: any, component: any, props: any = {}, text = '') => (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)