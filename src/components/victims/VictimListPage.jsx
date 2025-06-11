import React, { useEffect, useState } from 'react';
import VictimCard from './VictimCard';
import AddVictimModal from './AddVictimModal';
import { listWaitingVictims, updateVictimListByCase } from '../../services/victimsService';
import { ConfirmDialog } from 'primereact/confirmdialog';

const VictimListPage = () => {
    const [victims, setVictims] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVictim, setSelectedVictim] = useState(null);

    const fetchVictims = async () => {
        try {
            const data = await listWaitingVictims();
            const allVictims = data.flatMap((entry) =>
                (entry.victims || []).map((v) => ({
                    ...v,
                    case_id: entry.case_id?.$oid || entry.case_id,
                    _id: v._id || `${entry._id?.$oid || entry._id}-${v.name}`,
                    parent_id: entry._id?.$oid || entry._id,
                }))
            );
            setVictims(allVictims);
        } catch (err) {
            console.error('Error fetching victims:', err);
        }
    };

    useEffect(() => {
        fetchVictims();
    }, []);

    const handleApprove = (victim) => {
        setSelectedVictim(victim);
        setShowModal(true);
    };

    const handleDelete = async (victim) => {
        const updatedList = victims
            .filter(v => v.parent_id === victim.parent_id && v._id !== victim._id);
        await updateVictimListByCase(victim.case_id, updatedList);
        setVictims(prev => prev.filter(v => v._id !== victim._id));
    };

    const handleModalClose = async () => {
        setShowModal(false);
        setSelectedVictim(null);
        await fetchVictims();
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Victims Awaiting Review</h2>

            <ConfirmDialog /> {/* Add single ConfirmDialog instance here */}

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

            {selectedVictim && (
                <AddVictimModal
                    visible={showModal}
                    onHide={handleModalClose}
                    prefillVictim={selectedVictim}
                    prevVictims={victims.filter(v => v.parent_id === selectedVictim.parent_id)}
                />
            )}
        </div>
    );
};

export default VictimListPage;
