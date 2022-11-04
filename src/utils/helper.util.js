

export const phoneNumberValidator = (phoneNumber) => {
  //  console.log(phoneNumber)
    if (!phoneNumber) 
    {    
        return false
    }
    // if (typeof phoneNumber !== 'number') {
    //     console.log('p')

    //     return false
    // }
    if (phoneNumber.toString().length != 10){
        console.log('c')
        return false
    } 
    return true
  }
  
  export const integerValidator = (value) => {
    if (!value) return false
  
    return isNumberValidator(value)
  }
  
  export const isNumberValidator = (value) => {
    if (typeof value === Number ) return true
  
    return false
  }

  function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
// export default {
//   getOffset,
//   emptyOrRows
// }
