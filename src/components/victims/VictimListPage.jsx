import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VictimCard from './VictimCard';

const VictimListPage = () => {
    const [victims, setVictims] = useState([]);

    const fetchVictims = () => {
        axios.get('http://127.0.0.1:8000/victims/waited/')
            .then((res) => {
                const allVictims = res.data.flatMap((entry) =>
                    (entry.victims || []).map((v) => ({
                        ...v,
                        case_id: entry.case_id?.$oid || entry.case_id,
                        _id: v._id || `${entry._id?.$oid || entry._id}-${v.name}`,
                        parent_id: entry._id?.$oid || entry._id, // for approve/delete
                    }))
                );
                setVictims(allVictims);
            })
            .catch((err) => {
                console.error('Error fetching victims:', err);
            });
    };

    useEffect(() => {
        fetchVictims();
    }, []);

    const handleApprove = (victim) => {
        axios.patch(`http://localhost:8000/victims/approve/${victim.parent_id}`, {
            name: victim.name,
        })
            .then(() => {
                console.log(`Approved: ${victim.name}`);
                fetchVictims(); // Refresh list
            })
            .catch((err) => {
                console.error('Approval failed:', err);
            });
    };

    const handleDelete = (victim) => {
        axios.delete(`http://localhost:8000/victims/delete/${victim.parent_id}`, {
            data: { name: victim.name },
        })
            .then(() => {
                console.log(`Deleted: ${victim.name}`);
                fetchVictims(); // Refresh list
            })
            .catch((err) => {
                console.error('Delete failed:', err);
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Victims Awaiting Review</h2>

            {victims.length === 0 ? (
                <p className="text-gray-600">No victims found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {victims.map((victim) => (
                        <VictimCard
                            key={victim._id}
                            victim={victim}
                            onApprove={handleApprove}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VictimListPage;
