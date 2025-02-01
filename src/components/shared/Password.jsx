
 
const Password = ({label,Placeholder,value,setvalue}) =>{
    return <div className="textInputDiv flex flex-col space-y-2 w-full">
    <label for={label} className="front-semibold">{label}</label>
    <input type="password"  placeholder={Placeholder} className="p-3 border border-solid border-gray-400 rounded placeholder-gray-500" id={label} value={value} onChange={(e=>{
        setvalue(e.target.value);
    })}/>
    </div>
}

export default Password;