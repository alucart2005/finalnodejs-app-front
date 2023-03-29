
const Loader = () => { // Declares a function component called Loader
  return ( // Returns a JSX element
    <div className="loader-overlay">  {/* Creates a div with the classname loader-overlay */}
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  {/* Creates a div with the classname lds-spinner, containing 12 divs */}
    </div>
  )
}

export default Loader; // Exports the Loader component