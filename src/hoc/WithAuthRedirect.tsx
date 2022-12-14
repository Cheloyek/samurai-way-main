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

// export const WithAuthRedirect = <T>(Component: ComponentType<T>) => {
//     debugger
//     function RedirectComponent (props: MapStateToPropsForRedirectType) {
//             if (!props.isAuth) return <Redirect to='/login'/>
//             return <Component {...props}/>
//     }

    // export function WithAuthRedirect<T>(Component: ComponentType<T>) {
        // function RedirectComponent (props: MapStateToPropsForRedirectType) {
        //     let {isAuth, ...restProps} = props
        //     if (!isAuth) return <Redirect to='/login'/>
        //     return <Component {...restProps as T}/>
        // }
    // }
        export const WithAuthRedirect = (Component: any) => {
        class RedirectComponent extends React.Component {
            render() {
                // if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
            }
        }

    let ConnectAuthRedirectComponent: any = connect (mapStateToPropsForRedirect) (RedirectComponent)

    return ConnectAuthRedirectComponent
}

