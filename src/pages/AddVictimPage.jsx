// src/pages/AddVictimPage.jsx
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";

const AddVictimPage = () => {
    const [victim, setVictim] = useState({
        name: "",
        anonymous: false,
        gender: "",
        age: "",
        occupation: "",
        ethnicity: "",
        email: "",
        phone: "",
        secure_messaging: "",
        risk_level: "",
        protection_needed: false,
        case_id: "",
    });

    const [cases, setCases] = useState([]);

    const genders = ["male", "female", "other"];
    const riskLevels = ["low", "moderate", "high"];

    // Fetch cases from backend
    useEffect(() => {
        axios.get("http://localhost:8000/api/cases") // Update this to match your backend
            .then(res => {
                const caseOptions = res.data.map(c => ({
                    label: `${c.case_id} - ${c.incident_details?.title ?? 'Untitled'}`,
                    value: c._id?.$oid || c._id
                }));
                setCases(caseOptions);
            })
            .catch(err => {
                console.error("Failed to fetch cases", err);
            });
    }, []);

    const handleChange = (key, value) => {
        setVictim((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting victim:", victim);

        // Optionally submit to backend:
        // axios.post("http://localhost:8000/api/victims", victim)
        //   .then(res => console.log("Victim created", res.data))
        //   .catch(err => console.error("Error creating victim", err));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Victim</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Case Selection */}
                <span className="p-float-label">
                    <Dropdown
                        id="case_id"
                        value={victim.case_id}
                        options={cases}
                        onChange={(e) => handleChange("case_id", e.value)}
                        className="w-full"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a case"
                    />
                    <label htmlFor="case_id">Related Case</label>
                </span>

                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        inputId="anon"
                        checked={victim.anonymous}
                        onChange={(e) => handleChange("anonymous", e.checked)}
                    />
                    <label htmlFor="anon">Anonymous</label>
                </div>

                {/* Conditionally render fields if not anonymous */}
                {!victim.anonymous && (
                    <>
                        <span className="p-float-label">
                            <InputText
                                id="name"
                                value={victim.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="name">Name</label>
                        </span>

                        <span className="p-float-label">
                            <Dropdown
                                id="gender"
                                value={victim.gender}
                                options={genders}
                                onChange={(e) => handleChange("gender", e.value)}
                                className="w-full"
                            />
                            <label htmlFor="gender">Gender</label>
                        </span>

                        <span className="p-float-label">
                            <InputText
                                id="age"
                                type="number"
                                value={victim.age}
                                onChange={(e) => handleChange("age", e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="age">Age</label>
                        </span>

                        <span className="p-float-label">
                            <InputText
                                id="occupation"
                                value={victim.occupation}
                                onChange={(e) => handleChange("occupation", e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="occupation">Occupation</label>
                        </span>

                        <span className="p-float-label">
                            <InputText
                                id="ethnicity"
                                value={victim.ethnicity}
                                onChange={(e) => handleChange("ethnicity", e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="ethnicity">Ethnicity</label>
                        </span>
                    </>
                )}

                {/* Contact Fields */}
                <span className="p-float-label">
                    <InputText
                        id="email"
                        value={victim.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full"
                    />
                    <label htmlFor="email">Email</label>
                </span>

                <span className="p-float-label">
                    <InputText
                        id="phone"
                        value={victim.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full"
                    />
                    <label htmlFor="phone">Phone</label>
                </span>

                <span className="p-float-label">
                    <InputText
                        id="secure_messaging"
                        value={victim.secure_messaging}
                        onChange={(e) => handleChange("secure_messaging", e.target.value)}
                        className="w-full"
                    />
                    <label htmlFor="secure_messaging">Secure Messaging</label>
                </span>

                {/* Risk Assessment */}
                <span className="p-float-label">
                    <Dropdown
                        id="risk_level"
                        value={victim.risk_level}
                        options={riskLevels}
                        onChange={(e) => handleChange("risk_level", e.value)}
                        className="w-full"
                    />
                    <label htmlFor="risk_level">Risk Level</label>
                </span>

                <div className="flex items-center gap-2">
                    <Checkbox
                        inputId="protection_needed"
                        checked={victim.protection_needed}
                        onChange={(e) => handleChange("protection_needed", e.checked)}
                    />
                    <label htmlFor="protection_needed">Protection Needed</label>
                </div>

                <Button label="Submit Victim" type="submit" className="mt-4" />
            </form>
        </div>
    );
};

export default AddVictimPage;
