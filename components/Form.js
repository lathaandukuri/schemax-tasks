import React  from 'react'
import './css/todo.css'

function Form(props) {
    const handleSubmit =(evt) =>{
        evt.preventDefault();
        alert('registertation succesfull');
        
    }
    const handleChange=(e)=>{
        e.preventDefault();
    }
    return (
        <main>
            <h1> User registration form</h1>
            <form  onSubmit={handleSubmit}>
                <label>firstname</label>
                <input
                type="firstname"
                onChange={handleChange}
                name="firstName"
                placeholder="First Name"
                value={props.firstName}
                />
                <br />
                <label>lastname</label>
                <input
                className="text"
                type="lastname"
                onChange={handleChange}
                name="lastName"
                placeholder="Last Name"
                value={props.lastName}
                />
                <br/>
                <label>Gender:</label>
                <label>
                    <input
                    className="radiobutton"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={props.gender === "male"}
                    onChange={handleChange}
                    />
                    male
                </label>
                <label>
                    <input
                    className="radiobutton"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={props.gender === "female"}
                    onChange={handleChange}
                    />
                    Female
                </label>
                <br />
                <label>emailid:</label>
                <input classname="inputform"
                type="text"
                name="emailid"
                checked={handleChange}
                />
                <br/>
                <label>password:</label>
                <input classname="inputform"
                type="password"
                checked={handleChange}
                />
                <br/>
                <button  className="submit" onChange={props.handleSubmit}
                >Submit</button>
            </form>  
    </main>
            

        
    )
}
export default Form




    


