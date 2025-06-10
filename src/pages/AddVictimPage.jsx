import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";

const AddVictimPage = () => {
    const [victim, setVictim] = useState({
        victim_type: "victim", // NEW FIELD
        name: "",
        anonymous: false,
        gender: "",
        age: null,
        occupation: "",
        ethnicity: "",
        email: "",
        phone: "",
        risk_level: "",
        protection_needed: false,
        case_id: "",
    });

    const [cases, setCases] = useState([]);

    const genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" }
    ];
    const riskLevels = [
        { label: "Low", value: "low" },
        { label: "Moderate", value: "moderate" },
        { label: "High", value: "high" }
    ];
    const victimTypes = [
        { label: "Victim", value: "victim" },
        { label: "Witness", value: "witness" }
    ];

    useEffect(() => {
        axios.get("http://localhost:8000/api/cases")
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
        console.log("Submitting victim/witness:", victim);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Victim/Witness</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

                {/* Victim/Witness Dropdown */}
                <span className="p-float-label col-span-2">
                    <Dropdown
                        id="victim_type"
                        value={victim.victim_type}
                        options={victimTypes}
                        onChange={(e) => handleChange("victim_type", e.value)}
                        className="w-full"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select Type"
                    />
                    <label htmlFor="victim_type">Victim or Witness</label>
                </span>

                {/* Case Selection */}
                <span className="p-float-label col-span-2">
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
                <div className="flex items-center gap-2 col-span-2">
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
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select gender"
                            />
                            <label htmlFor="gender">Gender</label>
                        </span>

                        <span className="p-float-label">
                            <InputNumber
                                id="age"
                                value={victim.age}
                                onValueChange={(e) => handleChange("age", e.value)}
                                className="w-full"
                                placeholder="Age"
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

                {/* Risk Assessment */}
                <span className="p-float-label">
                    <Dropdown
                        id="risk_level"
                        value={victim.risk_level}
                        options={riskLevels}
                        onChange={(e) => handleChange("risk_level", e.value)}
                        className="w-full"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select risk level"
                    />
                    <label htmlFor="risk_level">Risk Level</label>
                </span>

                <div className="flex items-center gap-2 col-span-2">
                    <Checkbox
                        inputId="protection_needed"
                        checked={victim.protection_needed}
                        onChange={(e) => handleChange("protection_needed", e.checked)}
                    />
                    <label htmlFor="protection_needed">Protection Needed</label>
                </div>

                <div className="col-span-2">
                    <Button label="Submit Victim/Witness" type="submit" className="w-full" />
                </div>
            </form>
        </div>
    );
};

export default AddVictimPage;
