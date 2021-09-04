import React, { useState } from 'react';

export const Form = (props) => {
    const [formData, setFormData] = useState({});
    const {submitRegistrationData} = props;

    const texNameHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitRegistrationData(formData);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form action="#" onSubmit={handleSubmit}>
                <h1> student registeration form</h1>
                <label for="fname">User Name:</label><br />
                <input type="text" onChange={texNameHandler} className="capital-letters" id="fname" name="fname" /><br />
                <label for="lname">Last Name:</label><br />
                <input type="text" onChange={texNameHandler} className="capital-letters" id="lname" name="lname" /><br />
                <label for="fatherName">Father Name:</label><br />
                <input type="text" onChange={texNameHandler} className="capital-letters" id="fatherName" name="fatherName" /><br />
                <label for="motherName">Mother name:</label><br />
                <input type="text" onChange={texNameHandler} className="capital-letters" id="motherName" name="motherName" /><br />
                <label for="phoneNumber">Phone Number:</label><br />
                <input type="text" onChange={texNameHandler} id="phoneNumber" name="phoneNumber" /><br />
                <label for="adharNumber">AdharNumber:</label><br />
                <input type="text" onChange={texNameHandler} id="adharNumber" name="adharNumber" /><br />
                <label for="coursesEnrolled">Select course:</label><br />
                <select name="coursesEnrolled" onChange={texNameHandler} id="coursesEnrolled">
                    <option value="">Please Select</option>
                    <option value="MERN">MERN</option>
                    <option value="MEAN">MEAN</option>
                    <option value="REACT">REACT</option>
                    <option value="ANGULAR">ANGULAR</option>
                </select><br /><br />
                <input type="submit" value="Submit" />
            </form>
            <br />
        </div>
    )
}
export default Form;