import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'abc', likesCount: '0'},
        {id: 2, message: 'defg', likesCount: '26'},
    ],
    profile: null,
    status: ''
}

test ('length of posts should be incremented', () => {
    let action = addPostActionCreator('Text')
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

test ('message if new post should be added', () => {
    let action = addPostActionCreator('Text')
    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('Text')
})

test ('after deleting length of messages should be decrement', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})

test (`after deleting length shouldn't be decrement if id is incorrect` , () => {
    let action = deletePost(10)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})