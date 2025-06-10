import { CheckCircle } from "lucide-react";

const SuccessMessage = ({ onReset }) => (
  <div className="min-h-screen from-green-50 to-emerald-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-auto border border-green-200">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Submitted</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Your incident report has been successfully submitted and will be reviewed by our team shortly.
      </p>
      <button
        onClick={onReset}
        className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Submit Another Report
      </button>
    </div>
  </div>
);

export default SuccessMessage;