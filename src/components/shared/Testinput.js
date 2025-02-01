
const TestInput = ({ label, placeholder, className = '', value, setvalue ,labelclassName}) => {
    return (
      <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
        <label htmlFor={label} className={`font-semibold ${labelclassName}`}>
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-3 border border-solid border-gray-400 rounded placeholder-gray-500 text-black"
          id={label}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
      </div>
    );
  };
  
  export default TestInput;
  