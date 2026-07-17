import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children, initialData = {} }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    uploadedDocuments: {}
  });
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const goToStep = (step) => setCurrentStep(step);

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      nextStep,
      prevStep,
      goToStep
    }}>
      {children}
    </FormContext.Provider>
  );
};
