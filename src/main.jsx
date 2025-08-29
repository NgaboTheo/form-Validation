// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities with Validation

import { createRoot } from "react-dom/client";
import "./App.css";
import React, { useState } from "react";                                


// eslint-disable-next-line react-refresh/only-export-components
function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");     
    const [gender, setGender] = useState("male");
    const [subjects, setSubjects] = useState({
        english: false,
        maths: false,
        physics: false,
    });
    const [resume, setResume] = useState(null);
    const [url, setUrl] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [about, setAbout] = useState("");
    const [errors, setErrors] = useState({});

    // Validation logic
    const validateForm = () => {
        let formErrors = {};

        if (!firstName.trim()) formErrors.firstName = "First Name is required";
        if (!lastName.trim()) formErrors.lastName = "Last Name is required";

        if (!email.trim()) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Invalid email format";
        }

        if (!contact.trim()) {
            formErrors.contact = "Contact number is required";
        } else if (!/^[0-9]{10}$/.test(contact)) {
            formErrors.contact = "Contact must be 10 digits";
        }

        if (!resume) formErrors.resume = "Resume upload is required";

        if (!url.trim()) {
            formErrors.url = "URL is required";
        } else {
            try {
                new URL(url);
            } catch {
                formErrors.url = "Invalid URL format";
            }
        }

        if (!selectedOption) formErrors.selectedOption = "Please select an option";
        if (!about.trim()) formErrors.about = "About section is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(
                firstName,
                lastName,
                email,
                contact,
                gender,
                subjects,
                resume,
                url,
                selectedOption,
                about
            );
            alert("Form submitted successfully ✅");
        } else {
            alert("Please fix the errors in the form ❌");
        }
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("male");
        setSubjects({
            english: false,
            maths: false,
            physics: false,
        });
        setResume(null);
        setUrl("");
        setSelectedOption("");
        setAbout("");
        setErrors({});
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">First Name*</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label htmlFor="lastname">Last Name*</label>
                    <input
                        type="text"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}

                    <label htmlFor="email">Enter Email*</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="contact">Contact*</label>
                    <input
                        type="tel"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter Mobile number"
                    />
                    {errors.contact && <p className="error">{errors.contact}</p>}

                    <label>Gender*</label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                    /> Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                    /> Female
                    <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={(e) => setGender(e.target.value)}
                    /> Other

                    <label>Your best Subject</label>
                    <input
                        type="checkbox"
                        checked={subjects.english}
                        onChange={() => handleSubjectChange("english")}
                    /> English
                    <input
                        type="checkbox"
                        checked={subjects.maths}
                        onChange={() => handleSubjectChange("maths")}
                    /> Maths
                    <input
                        type="checkbox"
                        checked={subjects.physics}
                        onChange={() => handleSubjectChange("physics")}
                    /> Physics

                    <label htmlFor="file">Upload Resume*</label>
                    
                    <input
                        type="file"
                        id="file"
                    
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                    {errors.resume && <p className="error">{errors.resume}</p>}

                    <label htmlFor="url">Enter URL*</label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                    />
                    {errors.url && <p className="error">{errors.url}</p>}

                    <label>Select your choice*</label>
                    <select
                        id="select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="" disabled>
                            Select your Ans
                        </option>
                        <optgroup label="Beginners">
                            <option value="1">HTML</option>
                            <option value="2">CSS</option>
                            <option value="3">JavaScript</option>
                        </optgroup>
                        <optgroup label="Advance">
                            <option value="4">React</option>
                            <option value="5">Node</option>
                            <option value="6">Express</option>
                            <option value="t">MongoDB</option>
                        </optgroup>
                    </select>
                    {errors.selectedOption && <p className="error">{errors.selectedOption}</p>}

                    <label htmlFor="about">About*</label>
                    <textarea
                        id="about"
                        cols="30"
                        rows="5"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="About yourself"
                    ></textarea>
                    {errors.about && <p className="error">{errors.about}</p>}

                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">Submit</button>
                </form>
            </fieldset>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
