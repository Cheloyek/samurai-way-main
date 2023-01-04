import profileReducer, {addPostActionCreator} from "./profile-reducer";

it ('length of posts should be incremented', () => {
    let action = addPostActionCreator('Text')
    let state = {
        posts: [
            {id: 1, message: 'abc', likesCount: '0'},
            {id: 2, message: 'defg', likesCount: '26'},
        ],
        profile: null,
        status: ''
    }
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].message).toBe('Text')
})

