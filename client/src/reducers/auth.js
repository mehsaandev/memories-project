export default (state= {authData : null}, action) => {
    console.log(action.type)
    switch (action.type) {
        case "AUTH":
          // console.log(action?.data);
          localStorage.setItem('profile',JSON.stringify({...action?.data}))
          return {...state,authData: action?.data};
        case "LOGOUT":
          // console.log(action?.data);
          localStorage.clear()
          return {...state,authData: null};
       default:
        return state;
    }
  };
  