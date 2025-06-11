import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const VictimCard = ({ victim, onApprove, onDelete }) => {
    const toastRef = useRef(null);

    const handleApprove = () => {
        onApprove(victim);
        toastRef.current?.show({
            severity: 'success',
            summary: 'Approved',
            detail: `${victim.name} has been approved.`,
            life: 2000,
        });
    };

    const handleDelete = () => {
        confirmDialog({
            message: `Are you sure you want to delete ${victim.name}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                onDelete(victim);
                toastRef.current?.show({
                    severity: 'warn',
                    summary: 'Deleted',
                    detail: `${victim.name} has been deleted.`,
                    life: 2000,
                });
            },
        });
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

            <div className="flex gap-2 mt-3">
                <Button
                    label="Approve"
                    icon="pi pi-check"
                    className="p-button-success"
                    onClick={handleApprove}
                />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};

export default VictimCard;
