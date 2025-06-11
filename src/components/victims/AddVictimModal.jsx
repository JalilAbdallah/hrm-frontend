import React, {useEffect, useRef, useState} from "react";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {createVictim, updateVictimListByCase} from '../../services/victimsService';
import {useAuth} from '../../context/AuthContext';

const genders = [
    {label: "Male", value: "male"},
    {label: "Female", value: "female"},
    {label: "Other", value: "other"}
];

const riskLevels = [
    {label: "Low", value: "low"},
    {label: "Moderate", value: "moderate"},
    {label: "High", value: "high"}
];

const victimTypes = [
    {label: "Victim", value: "victim"},
    {label: "Witness", value: "witness"}
];

const AddVictimModal = ({visible, onHide, prefillVictim, prevVictims}) => {
    const toast = useRef(null);
    const {user} = useAuth();
    const currentUserId = user?.id;

    const [victim, setVictim] = useState({
        victim_type: "victim",
        name: "",
        anonymous: false,
        gender: "",
        age: null,
        occupation: "",
        ethnicity: "",
        email: "",
        phone: "",
        risk_level: "low",
        protection_needed: false,
        case_id: "",
        parent_id: "",
    });

    useEffect(() => {
        if (prefillVictim) {
            setVictim(prev => ({
                ...prev,
                name: prefillVictim.name || "",
                age: prefillVictim.age || null,
                occupation: prefillVictim.occupation || "",
                gender: prefillVictim.gender || "",
                case_id: prefillVictim.case_id || "",
                parent_id: prefillVictim.parent_id || "",
            }));
        }
    }, [prefillVictim]);

    const handleChange = (key, value) => {
        setVictim(prev => ({...prev, [key]: value}));
    };

    const handleSubmit = async () => {
        if (!victim.case_id || !currentUserId) {
            toast.current?.show({
                severity: 'error',
                summary: 'Validation Failed',
                detail: !victim.case_id ? 'Case ID is missing.' : 'Creator ID is missing.',
                life: 3000
            });
            return;
        }

        const payload = {
            type: victim.victim_type,
            name: victim.name,
            anonymous: victim.anonymous,
            creation_context: {
                source_report: '683722ca3007118794dc6420',
                source_case: victim.case_id,
                created_by_admin: currentUserId
            },
            demographics: {
                gender: victim.gender,
                age: victim.age,
                occupation: victim.occupation,
                ethnicity: victim.ethnicity
            },
            contact_info: {
                email: victim.email,
                phone: victim.phone,
                secure_messaging: 'single'
            },
            cases_involved: [victim.case_id],
            risk_assessment: {
                level: victim.risk_level || "low",
                threats: [],
                protection_needed: victim.protection_needed
            },
            support_services: [],
            created_by: currentUserId
        };

        if (!victim.anonymous) {
            if (victim.gender) payload.demographics.gender = victim.gender;
            if (victim.age != null) payload.demographics.age = victim.age;
            if (victim.occupation) payload.demographics.occupation = victim.occupation;
            if (victim.ethnicity) payload.demographics.ethnicity = victim.ethnicity;
        }

        if (victim.email) payload.contact_info.email = victim.email;
        if (victim.phone) payload.contact_info.phone = victim.phone;

        try {
            await createVictim(payload);

            const updatedVictims = (prevVictims || []).filter(v => v.name !== victim.name);
            await updateVictimListByCase(victim.case_id, updatedVictims);

            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Victim/Witness submitted successfully',
                life: 3000
            });

            onHide();
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Submission failed',
                life: 3000
            });
        }
    };

    return (
        <>
            <Toast ref={toast}/>
            <Dialog header="Add Victim/Witness" visible={visible} style={{width: '50vw'}} onHide={onHide}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="victim_type">Victim Type</label>
                        <Dropdown
                            id="victim_type"
                            value={victim.victim_type}
                            options={victimTypes}
                            onChange={(e) => handleChange("victim_type", e.value)}
                            placeholder="Select Type"
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="case_id">Case ID</label>
                        <InputText
                            id="case_id"
                            value={victim.case_id}
                            onChange={(e) => handleChange("case_id", e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-2 col-span-2 mt-2">
                        <Checkbox
                            inputId="anonymous"
                            checked={victim.anonymous}
                            onChange={(e) => handleChange("anonymous", e.checked)}
                        />
                        <label htmlFor="anonymous">Anonymous</label>
                    </div>

                    {!victim.anonymous && (
                        <>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <InputText
                                    id="name"
                                    value={victim.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="gender">Gender</label>
                                <Dropdown
                                    id="gender"
                                    value={victim.gender}
                                    options={genders}
                                    onChange={(e) => handleChange("gender", e.value)}
                                    placeholder="Select Gender"
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="age">Age</label>
                                <InputNumber
                                    id="age"
                                    value={victim.age}
                                    onValueChange={(e) => handleChange("age", e.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="occupation">Occupation</label>
                                <InputText
                                    id="occupation"
                                    value={victim.occupation}
                                    onChange={(e) => handleChange("occupation", e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="ethnicity">Ethnicity</label>
                                <InputText
                                    id="ethnicity"
                                    value={victim.ethnicity}
                                    onChange={(e) => handleChange("ethnicity", e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            value={victim.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Phone</label>
                        <InputText
                            id="phone"
                            value={victim.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="risk_level">Risk Level</label>
                        <Dropdown
                            id="risk_level"
                            value={victim.risk_level}
                            options={riskLevels}
                            onChange={(e) => handleChange("risk_level", e.value)}
                            placeholder="Select Risk Level"
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-2 col-span-2 mt-2">
                        <Checkbox
                            inputId="protection_needed"
                            checked={victim.protection_needed}
                            onChange={(e) => handleChange("protection_needed", e.checked)}
                        />
                        <label htmlFor="protection_needed">Protection Needed</label>
                    </div>

                    <div className="col-span-2 mt-4">
                        <Button label="Submit Victim/Witness" onClick={handleSubmit} className="w-full"/>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddVictimModal;
