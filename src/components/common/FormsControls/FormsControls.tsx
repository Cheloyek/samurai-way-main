import React from "react";
import {inspect} from "util";
import styles from './FormsControls.module.css'

const FormControl = ({input, meta, child, ...props}: any) => {

    const hasError = meta.error && meta.touched
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                {/*<textarea {...input} {...props}/>*/}
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

// export const Textarea = ({input, meta, ...props}: any) => {
//
//     const hasError = meta.error && meta.touched
//     return (
//             <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
//                 <div>
//                     <textarea {...input} {...props}/>
//                 </div>
//                 {hasError && <span>{meta.error}</span>}
//             </div>
//     )
// }

export const Textarea = (props: any) => {

    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

// export const Input = ({input, meta, ...props}: any) => {
//
//     const hasError = meta.error && meta.touched
//     return (
//         <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
//             <div>
//                 <input {...input} {...props}/>
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }

export const Input = (props: any) => {

    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}