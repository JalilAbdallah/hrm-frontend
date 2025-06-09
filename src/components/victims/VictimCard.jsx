import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const riskLevels = [
    { label: 'Low', value: 'low' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'High', value: 'high' },
];

const VictimCard = ({ victim }) => {
    const [risk, setRisk] = React.useState(victim.risk_level);
    const toastRef = React.useRef(null);

    const updateRiskLevel = async (newRisk) => {
        try {
            setRisk(newRisk);

            await axios.patch(`http://localhost:5000/api/victim/${victim._id}/risk`, {
                risk_level: newRisk,
            });

            toastRef.current?.show({
                severity: 'success',
                summary: 'Updated',
                detail: `Risk level changed to "${newRisk}"`,
                life: 2000,
            });
        } catch (error) {
            console.error('API error:', error);
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update risk level.',
                life: 3000,
            });
        }
    };

    return (
        <div className="p-4 border rounded shadow-sm bg-white space-y-2">
            <Toast ref={toastRef} />
            <h3 className="text-lg font-bold text-gray-900">
                {victim.anonymous ? 'Anonymous' : victim.name}
            </h3>
            <p>Gender: {victim.gender}</p>
            <p>Age: {victim.age ?? 'Unknown'}</p>
            <p>Occupation: {victim.occupation}</p>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                <Dropdown
                    value={risk}
                    options={riskLevels}
                    onChange={(e) => updateRiskLevel(e.value)}
                    placeholder="Select risk level"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default VictimCard;
