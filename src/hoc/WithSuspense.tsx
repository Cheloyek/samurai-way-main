import React, {Component, ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StoreType} from "../redux/redux-store";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: any): MapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export const WithSuspense = (Component: any) => {
    return (props: any) => {
        return <Component/>
        }
}

