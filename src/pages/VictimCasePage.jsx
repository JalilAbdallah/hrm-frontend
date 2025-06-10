import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
import {getVictimsByCase, updateRiskAssessment} from '../services/victimsService.js';

const riskLevels = [
    {label: 'Low', value: 'low'},
    {label: 'Moderate', value: 'moderate'},
    {label: 'High', value: 'high'},
];

const VictimCasePage = () => {
    const {caseId} = useParams();
    const [victims, setVictims] = useState([]);
    const [search, setSearch] = useState('');
    const toast = React.useRef(null);

    useEffect(() => {
        const fetchVictims = async () => {
            try {
                const data = await getVictimsByCase(caseId);
                setVictims(data);
            } catch (error) {
                console.error('Error fetching victims:', error);
                setVictims([]);
            }
        };

        if (caseId) {
            fetchVictims();
        }
    }, [caseId]);

    const handleRiskLevelChange = async (victimId, newLevel) => {
        if (!victimId) {
            console.error('Victim ID is undefined. Skipping update.');
            return;
        }

        const victim = victims.find(v => v._id === victimId || v.id === victimId);
        if (!victim) {
            console.error('Victim not found in list.');
            return;
        }

        const riskData = {
            level: newLevel,
            threats: victim.risk_assessment?.threats || [],
            protection_needed: victim.risk_assessment?.protection_needed || false
        };

        try {
            await updateRiskAssessment(victimId, riskData);

            setVictims(prev =>
                prev.map(v =>
                    (v._id === victimId || v.id === victimId)
                        ? {...v, risk_assessment: {...v.risk_assessment, ...riskData}}
                        : v
                )
            );

            toast.current?.show({
                severity: 'success',
                summary: 'Updated',
                detail: 'Risk level updated successfully',
                life: 2000,
            });
        } catch (err) {
            console.error('Error updating risk:', err);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update risk level',
                life: 2000,
            });
        }
    };

    const filteredVictims = victims.filter((v) =>
        v.anonymous ? true : v.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <Toast ref={toast}/>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                    Victims for Case {caseId}
                </h2>
                <div className="w-full md:w-80">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search"/>
                        <input
                            type="text"
                            placeholder="Search victims by name"
                            className="p-inputtext p-component w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVictims.length > 0 ? (
                    filteredVictims.map((victim) => {
                        const victimId = victim._id || victim.id;
                        return (
                            <div
                                key={victimId || victim.name || Math.random()}
                                className="bg-white rounded-xl shadow p-4 border border-gray-200 flex flex-col gap-3"
                            >
                                <h3 className="text-lg font-semibold">
                                    {victim.anonymous ? 'Anonymous' : victim.name}
                                </h3>
                                <p className="text-sm text-gray-700">Gender: {victim.demographics?.gender}</p>
                                <p className="text-sm text-gray-700">Occupation: {victim.demographics?.occupation}</p>
                                <p className="text-sm text-gray-700">Age: {victim.demographics?.age}</p>

                                <Dropdown
                                    value={victim.risk_assessment?.level || 'low'}
                                    options={riskLevels}
                                    onChange={(e) => handleRiskLevelChange(victimId, e.value)}
                                    placeholder="Select risk level"
                                    className="w-full"
                                />
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No victims found for this case.</p>
                )}
            </div>
        </div>
    );
};

export default VictimCasePage;
