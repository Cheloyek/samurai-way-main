import usersReducer, {actions, follow, InitialStateType, unfollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'User 1',
                status: 'Status 1',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
                uniqueUrlName: null
            },
            {
                id: 1,
                name: 'User 2',
                status: 'Status 2',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
            },
            {
                id: 2,
                name: 'User 3',
                status: 'Status 3',
                photos: {
                    small: null,
                    large: null
                },
                followed: true
            },
            {
                id: 3,
                name: 'User 4',
                status: 'Status 4',
                photos: {
                    small: null,
                    large: null
                },
                followed: true
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {
            term: '1',
            friend: null
        }
    }
})

test('follow test', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow test', () => {

    const newState = usersReducer(state, actions.unfollowSuccess(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()

})

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success
}


test('follow thunk test', async() => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))

})

test('unfollow thunk test', async() => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unfollow(2)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 2))

})