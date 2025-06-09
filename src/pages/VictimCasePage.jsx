import React, { useEffect, useState } from 'react';
import VictimCard from '../../../../../../../../../../../Downloads/hrm-frontend-feature-cases/hrm-frontend-feature-cases/src/components/victims/VictimCard.jsx';

const VictimCasePage = () => {
    const caseId= 'HRM-2024-001'

    const [victims, setVictims] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const dummyVictims = [
            {
                _id: 'v1',
                name: 'Fatima Al-Sayed',
                anonymous: false,
                age: 42,
                gender: 'female',
                risk_level: 'high',
                occupation: 'Doctor',
                case_id: 'HRM-2024-001',
            },
            {
                _id: 'v2',
                name: '',
                anonymous: true,
                gender: 'male',
                risk_level: 'moderate',
                occupation: 'Unknown',
                case_id: 'HRM-2024-001',
            },
            {
                _id: 'v3',
                name: 'Ahmad Yusuf',
                anonymous: false,
                age: 28,
                gender: 'male',
                risk_level: 'low',
                occupation: 'Teacher',
                case_id: 'HRM-2024-002',
            },
        ];

        // Filter based on the caseId from URL
        const filtered = dummyVictims.filter(v => v.case_id === caseId);
        setVictims(filtered);
    }, [caseId]);

    const filteredVictims = victims.filter((v) =>
        v.anonymous ? true : v.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                    Victims for Case {caseId}
                </h2>
                <div className="w-full md:w-80">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
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
                    filteredVictims.map((victim) => (
                        <VictimCard key={victim._id} victim={victim} />
                    ))
                ) : (
                    <p className="text-gray-500">No victims found for this case.</p>
                )}
            </div>
        </div>
    );
};

export default VictimCasePage;
