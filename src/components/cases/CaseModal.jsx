import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { MapPin, Users, AlertTriangle, Calendar, Clock, User, FileText, Archive, ExternalLink, RotateCcw } from 'lucide-react';

const statusColors = {
  under_investigation: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200",
  active: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200",
  closed: "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-slate-200",
  archived: "bg-gradient-to-r from-gray-100 to-red-100 text-red-800 border-red-200",
};

const priorityColors = {
  critical: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
  high: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
  medium: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
  low: "bg-gradient-to-r from-gray-400 to-slate-400 text-white",
};

const CaseModal = ({ visible, onHide, caseData, onArchiveCase, onRestoreCase }) => {
  const toast = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getVictimCount = (victims) => {
    if (!victims || victims.length === 0) return 0;
    return victims.reduce((total, victim) => total + (victim.count || 1), 0);
  };
  const confirmArchive = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to archive this case? This action cannot be undone.',
      header: 'Archive Case Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        onArchiveCase(caseData._id);
        toast.current.show({
          severity: 'success',
          summary: 'Case Archived',
          detail: `Case ${caseData.case_id} has been successfully archived.`,
          life: 3000
        });
        onHide();
      },
      reject: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Archive Cancelled',
          detail: 'Case archive operation was cancelled.',
          life: 3000
        });
      }
    });
  };

  const confirmRestore = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to restore this case? The case will be moved back to active status.',
      header: 'Restore Case Confirmation',
      icon: 'pi pi-question-circle',
      acceptClassName: 'p-button-success',
      accept: () => {
        onRestoreCase(caseData._id);
        toast.current.show({
          severity: 'success',
          summary: 'Case Restored',
          detail: `Case ${caseData.case_id} has been successfully restored.`,
          life: 3000
        });
        onHide();
      },
      reject: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Restore Cancelled',
          detail: 'Case restore operation was cancelled.',
          life: 3000
        });
      }
    });
  };

  if (!caseData) return null;

  const headerTemplate = (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-lg font-bold text-blue-600 uppercase tracking-wide">
            {caseData.case_id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${priorityColors[caseData.priority]}`}>
            {caseData.priority}
          </span>
          <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border ${statusColors[caseData.status]}`}>
            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
            {caseData.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
        {caseData.title}
      </h2>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <Dialog
        visible={visible}
        onHide={onHide}
        header={headerTemplate}
        style={{ width: '90vw', maxWidth: '900px' }}
        modal
        className="case-modal"
        contentClassName="p-0"
        headerClassName="pb-0"
      >
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Description Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Case Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {caseData.description}
              </p>
            </div>

            {/* Case Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Information */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location
                </h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Country:</span> {caseData.location.country}</p>
                  <p><span className="font-medium">Region:</span> {caseData.location.region}</p>
                  {caseData.location.coordinates && (
                    <p><span className="font-medium">Coordinates:</span> {caseData.location.coordinates.coordinates.join(', ')}</p>
                  )}
                </div>
              </div>

              {/* Victim Information */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Victims
                </h4>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-emerald-600">
                    {getVictimCount(caseData.victims)}
                  </p>
                  <p className="text-sm text-gray-600">Total victims affected</p>
                </div>
              </div>

              {/* Timeline Information */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Timeline
                </h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Created:</span> {formatDate(caseData.created_at)}</p>
                  <p><span className="font-medium">Last Updated:</span> {formatDate(caseData.updated_at)}</p>
                </div>
              </div>

              {/* Case Status */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Status & Priority
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[caseData.status]}`}>
                      {caseData.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Priority:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors[caseData.priority]}`}>
                      {caseData.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Violation Types */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Violation Types
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseData.violation_types.map((type, index) => (
                  <span
                    key={type}
                    className="px-3 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200"
                  >
                    {type.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Perpetrators */}
            {caseData.perpetrators && caseData.perpetrators.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-600" />
                  Perpetrators
                </h4>
                <div className="space-y-3">
                  {caseData.perpetrators.map((perpetrator, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <p className="font-semibold text-red-800">{perpetrator.entity_name}</p>
                      {perpetrator.type && (
                        <p className="text-sm text-red-600 mt-1">
                          Type: {perpetrator.type.replace(/_/g, " ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Links */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Related Information</h4>
              <div className="flex flex-wrap gap-3">
                <Button
                  label="View Reports"
                  icon="pi pi-file-o"
                  className="p-button-outlined p-button-primary"
                  onClick={() => {
                    // Navigation logic will be implemented later
                    console.log('Navigate to reports for case:', caseData.case_id);
                  }}
                />
                <Button
                  label="View Victims"
                  icon="pi pi-users"
                  className="p-button-outlined p-button-secondary"
                  onClick={() => {
                    // Navigation logic will be implemented later
                    console.log('Navigate to victims for case:', caseData.case_id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>        {/* Footer with Archive/Restore Button */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Case ID: {caseData.case_id}
          </div>
          <div className="flex gap-3">
            <Button
              label="Close"
              icon="pi pi-times"
              onClick={onHide}
              className="p-button-outlined"
            />
            {caseData.status === 'archived' ? (
              <Button
                label="Restore Case"
                icon={() => <RotateCcw className="w-4 h-4" />}
                onClick={confirmRestore}
                className="p-button-success"
                severity="success"
              />
            ) : (
              <Button
                label="Archive Case"
                icon="pi pi-archive"
                onClick={confirmArchive}
                className="p-button-danger"
                severity="danger"
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CaseModal;
