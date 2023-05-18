const reducer = (product = typeof {}, action)=>{
switch (action.type) {
    // case 'FETCH_ALL':
    //         return product;
    // case 'CREATE':
    //     return product;

    case 'FETCH_ONE':

        // console.log(action.payload)
        // console.log(action.type);
        return action.payload;   
        case 'REV':
            
        return action.payload;      
        case 'FAV':
            
        return action.payload;     

        case 'ALERT':
            
        return action.payload;     

    default:
        return product;
}
}
export default reducer;