import { 
  NEW_POST_USER_FAIL, 
  NEW_POST_USER_REQUEST,

  LIKE_POST_REQUEST,
  LIKE_POST_FAIL,

  COMMENT_TO_POST_FAIL,
  COMMENT_TO_POST_REQUEST,

  UNLIKE_POST_REQUEST,
  UNLIKE_POST_FAIL,

  MORE_COMMENT_TO_POST_REQUEST,
  MORE_COMMENT_TO_POST_FAIL,

  FIRST_GET_POST_USER_FETCHING,
  FIRST_GET_POST_USER_FAIL,
  FIRST_GET_POST_USER_REQUEST,

  ELSE_GET_POST_USER_REQUEST,
  ELSE_GET_POST_USER_FAIL,
  ELSE_GET_POST_USER_FETCHING,

  FETCHING_ELSE_POST_USER,
  NEW_POST_USER_SUCCESS
} from "../actions/postAction";

const initialState = {
  error: '',
  postsData: [],
  postFirstFetching: true,
  currentPage: 2,
  postElseFetching: false,
  totalCount: 0,
  fetchSentPost: false,
  err: ''
}

let newPosts = []

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_POST_USER_REQUEST:
      return {...state, fetchSentPost: true}
      
    case NEW_POST_USER_SUCCESS:
      newPosts = state.postsData.length ? state.postsData.slice(0) : []
      
      if (!newPosts.length) {
        newPosts.push(action.payload)
      } else {
        newPosts.unshift(action.payload)
      }
      console.log(state.postsData);
      return {...state, postsData: newPosts, fetchSentPost: false}
      
    case NEW_POST_USER_FAIL:
      return {...state, error: action.payload, fetchSentPost: false}

    case FIRST_GET_POST_USER_REQUEST:
      return {
        ...state, 
        postsData: action.payload.data,
        totalCount: action.payload.totalCount,
        err: action.payload.data.err
      }

    case FIRST_GET_POST_USER_FAIL:
      return {...state, error: action.payload}

    case FIRST_GET_POST_USER_FETCHING:
      return {...state, postFirstFetching: false}

    case ELSE_GET_POST_USER_REQUEST:
      newPosts = state.postsData.slice(0)
      newPosts = [...newPosts, ...action.payload.data]

      return {
        ...state, 
        currentPage: state.currentPage + 1, 
        postsData: newPosts,
        totalCount: action.payload.totalCount,
        postElseFetching: false
      }

    case ELSE_GET_POST_USER_FAIL:
      return {...state, error: action.payload}

    case ELSE_GET_POST_USER_FETCHING:
      return {...state}

    case FETCHING_ELSE_POST_USER:
      return {...state, postElseFetching: true}

    case LIKE_POST_REQUEST:
      newPosts = state.postsData.slice(0)
      newPosts = newPosts.map(post => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            selfLike: action.payload.likeActive,
            heartCount: ++post.heartCount
          }
        }
        return post
      })
      return {...state, postsData: newPosts}

    case LIKE_POST_FAIL:
      return {...state, error: action.payload}

    case UNLIKE_POST_REQUEST:
      newPosts = state.postsData.slice(0)
      newPosts = newPosts.map(post => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            selfLike: action.payload.likeActive,
            heartCount: --post.heartCount
          }
        }
        return post
      })
      return {...state, postsData: newPosts}

    case UNLIKE_POST_FAIL:
      return {...state, error: action.payload}

    case COMMENT_TO_POST_REQUEST:
      newPosts = state.postsData.slice(0)
      newPosts = newPosts.map(post => {
        if (post.postId === action.payload.postId) {
          newPosts = post.commentData.slice(0)
          newPosts.push(action.payload.comment)

          return {
            ...post,
            commentData: newPosts
          }
        }

        return post
      })
      return {...state, postsData: newPosts}

    case COMMENT_TO_POST_FAIL:
      return {...state, error: action.payload}

    case MORE_COMMENT_TO_POST_REQUEST:
      newPosts = state.postsData.slice(0)
      newPosts = newPosts.map(post => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            commentData: [...action.payload.getComment],
            moreComments: false
          }
        }

        return post
      })
      return {...state, postsData: newPosts}

    case MORE_COMMENT_TO_POST_FAIL:
      return {...state, error: action.payload}
    default:
      break;
  }
  return state
}