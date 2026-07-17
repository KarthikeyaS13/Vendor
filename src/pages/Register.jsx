import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invitationService } from '../services/invitationService';
import { FormProvider, useFormContext } from '../context/FormContext';
import Step1CompanyInfo from '../components/MultiStepForm/Step1CompanyInfo';
import Step2BusinessDetails from '../components/MultiStepForm/Step2BusinessDetails';
import Step3BankDetails from '../components/MultiStepForm/Step3BankDetails';
import Step4DocumentUpload from '../components/MultiStepForm/Step4DocumentUpload';
import Step5Review from '../components/MultiStepForm/Step5Review';
import { Toaster } from 'react-hot-toast';

const RegistrationWizard = () => {
  const { currentStep } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1CompanyInfo />;
      case 2: return <Step2BusinessDetails />;
      case 3: return <Step3BankDetails />;
      case 4: return <Step4DocumentUpload />;
      case 5: return <Step5Review />;
      default: return <Step1CompanyInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-4">
        {renderStep()}
      </div>
    </div>
  );
};

export default function Register() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitationData, setInvitationData] = useState(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const data = await invitationService.validateToken(token);
        setInvitationData(data);
      } catch (err) {
        setError(err.message || 'Invitation Invalid or Expired');
      } finally {
        setLoading(false);
      }
    };
    if (token) validate();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-200">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  const initialData = {
    vendorName: invitationData.companyName || '',
    vendorLegalName: invitationData.companyName || '',
    contactPerson: invitationData.contactPerson || '',
    email1: invitationData.email || '',
    contactPhone: invitationData.mobile || ''
  };

  return (
    <FormProvider initialData={initialData}>
      <RegistrationWizard />
    </FormProvider>
  );
}
