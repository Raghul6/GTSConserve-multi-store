

export const phoneNumberValidator = (phoneNumber) => {
  //  console.log(phoneNumber)
    if (!phoneNumber) 
    {    
        return false
    }
    if (typeof phoneNumber !== 'number') {

        return false
    }
    if (phoneNumber.toString().length != 10){
        return false
    } 
    return true
  }
  
  export const integerValidator = (value) => {
    if (!value) return false
  
    return isNumberValidator(value)
  }
  
  export const isNumberValidator = (value) => {
    if (typeof value !== 'number') return false
  
    return true
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
