import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

const usersSearchFormValidate = (values: any) => {
    return
}

type UsersSearchFormObjectType = {
    term: string
}
type SetSubmittingType = {
    setSubmitting: (isSubmitting: boolean) => void
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props: PropsType) => {

    const submit = (values: FilterType, {setSubmitting}: SetSubmittingType) => {
        props.onFilterChanged(values)
    }

    return <div>
        <Formik initialValues={{term: ''}} validate={usersSearchFormValidate} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form>
                    <Field type='text' name='term'/>
                    <button type='submit' disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}