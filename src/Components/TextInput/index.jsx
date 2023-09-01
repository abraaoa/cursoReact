import "./styles.css"
export const TextInput = ({searchValue,handleChange}) => {
  return(
  <input type="search" className='text-input'
    onChange={handleChange}
    value={searchValue}
  />
  );
}