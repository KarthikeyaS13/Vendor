import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { ArrowLeft, ArrowRight, UploadCloud, FileText, CheckCircle2, RefreshCw, Trash2, ShieldCheck, FileCheck } from 'lucide-react';

const Step4DocumentUpload = () => {
  const { formData, updateDocuments, removeDocument, nextStep, prevStep } = useFormContext();
  const [uploading, setUploading] = useState({});
  const [progress, setProgress] = useState({});

  const requiredDocuments = [
    { id: 'coi', name: 'COI', description: 'Certificate of Incorporation', icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
    { id: 'aoa_moa', name: 'AOA/MOA', description: 'Articles/Memorandum of Assoc.', icon: <UploadCloud className="w-5 h-5 text-blue-500" /> },
    { id: 'msme', name: 'MSME Certificate', description: 'Micro, Small & Medium Enterprise', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'pan', name: 'PAN Copy', description: 'Permanent Account Number', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'tan', name: 'TAN Copy', description: 'Tax Deduction & Collection', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'gst', name: 'GST Certificate', description: 'Goods & Services Tax', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'pf_reg', name: 'PF Reg', description: 'PF Registration Copy', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'esi_reg', name: 'ESI Reg', description: 'ESI Registration Copy', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'labour_reg', name: 'Labour Reg', description: 'Labour Registration Copy', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'fssai_reg', name: 'FSSAI Reg', description: 'FSSAI Registration Copy', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'ph3', name: 'PH3', description: 'PH3 Document', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'ph4', name: 'PH4', description: 'PH4 Document', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'nda', name: 'NDA', description: 'Non-Disclosure Agreement', icon: <FileText className="w-5 h-5 text-slate-400" /> },
    { id: 'service_terms', name: 'Service Terms', description: 'Service Terms Agreement', icon: <FileText className="w-5 h-5 text-slate-400" /> }
  ];

  const handleFileUpload = (docId, file) => {
    if (!file) return;
    
    setUploading(prev => ({ ...prev, [docId]: true }));
    setProgress(prev => ({ ...prev, [docId]: 0 }));
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(prev => ({ ...prev, [docId]: currentProgress }));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(prev => ({ ...prev, [docId]: false }));
          updateDocuments(docId, {
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            status: 'Uploaded',
            url: URL.createObjectURL(file),
            file: file
          });
        }, 500);
      }
    }, 200);
  };

  const DocumentCard = ({ doc }) => {
    const isUploaded = formData.uploadedDocuments?.[doc.id];
    const isUploading = uploading[doc.id];
    const uploadProgress = progress[doc.id] || 0;

    return (
      <div className={`border rounded-2xl p-5 flex flex-col bg-white shadow-sm transition-all ${
        isUploaded ? 'border-green-200 shadow-green-100' : 
        isUploading ? 'border-blue-300 shadow-blue-100 ring-1 ring-blue-100' : 'border-slate-200'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-100 bg-slate-50">
            {isUploaded ? <ShieldCheck className="w-5 h-5 text-green-600" /> : isUploading ? <UploadCloud className="w-5 h-5 text-blue-500" /> : doc.icon}
          </div>
          {isUploaded && <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase tracking-wider">Completed</span>}
          {isUploading && <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Uploading...</span>}
        </div>
        
        <h3 className="font-bold text-slate-900 text-[15px]">{doc.name}</h3>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{doc.description}</p>

        <div className="mt-5 flex-grow flex flex-col justify-end">
          {isUploaded ? (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-700 truncate">{isUploaded.name}</p>
                    <p className="text-[10px] text-slate-500">{isUploaded.size} • 100% Uploaded</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-2" />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => window.open(isUploaded.url, '_blank')}
                  className="flex-1 py-1.5 border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Preview
                </button>
                <button type="button" className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors" title="Re-upload">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => removeDocument(doc.id)} className="p-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : isUploading ? (
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-semibold text-slate-700 truncate pr-2">Uploading file...</p>
                  <span className="text-[10px] font-bold text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
              <button type="button" onClick={() => setUploading(prev => ({ ...prev, [doc.id]: false }))} className="w-full py-1.5 text-slate-500 text-xs font-bold hover:text-slate-700 transition-colors">
                Cancel Upload
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer relative group">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(doc.id, e.target.files[0])} />
              <UploadCloud className="w-5 h-5 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
              <p className="text-[11px] font-bold text-slate-600">Drag & Drop file here</p>
              <p className="text-[9px] text-slate-400 mt-0.5">PDF, JPG, PNG (Max 5MB)</p>
              <div className="mt-3 w-full border border-blue-600 text-blue-600 text-[11px] font-bold py-1.5 rounded-lg text-center group-hover:bg-blue-50 transition-colors">
                Browse Files
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col h-full max-w-5xl mx-auto">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-900">Upload Required Documents</h2>
        <p className="text-sm text-slate-500 mt-1">Please provide the following legal and operational certificates to complete your application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {requiredDocuments.map(doc => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button type="button" onClick={prevStep} className="flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Previous
        </button>
        <div className="flex items-center gap-4">
          <button type="button" onClick={nextStep} className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md shadow-blue-700/20 transition-all flex items-center">
            Next Step <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4DocumentUpload;
