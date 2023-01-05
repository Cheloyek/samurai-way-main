import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'test'}/>)
        const instance = component.getInstance()
        // @ts-ignore
        expect (instance.state.status).toBe('test')
    })
    test('after creation <span> status should be displayed', () => {
        const component = create(<ProfileStatus status={'test'}/>)
        const root = component.root
        // @ts-ignore
        let span = root.findByType('span')
        // @ts-ignore
        expect (span.length).not.toBeNull()
    })
    test("after creation <span> status shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={'test'}/>)
        const root = component.root
        // @ts-ignore

        expect (() => {
            let input = root.findByType('input')
        }).toThrow()
    })
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status={'test'}/>)
        const root = component.root
        // @ts-ignore
        let span = root.findByType('span')
        expect (span.children[0]).toBe('test')
    })
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={'test'}/>)
        const root = component.root
        // @ts-ignore
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect (input.props.value).toBe('test')
    })
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'test'} updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateEditMode()
        // @ts-ignore
        expect (mockCallback.mock.calls.length).toBe(1)
    })
})

