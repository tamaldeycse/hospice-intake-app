import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  User, 
  Stethoscope, 
  Activity, 
  Users, 
  Wallet, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  CheckCircle2, 
  Info,
  MapPin,
  HeartPulse,
  Scale,
  BrainCircuit,
  Baby
} from 'lucide-react';

// --- Constants & Mock Data ---
const STEPS = [
  { id: 'consent', title: 'Consent', icon: ClipboardCheck },
  { id: 'basic', title: 'Basic Info', icon: User },
  { id: 'clinical', title: 'Clinical', icon: Stethoscope },
  { id: 'vitals', title: 'Vitals', icon: Activity },
  { id: 'psychosocial', title: 'Psychosocial', icon: Users },
  { id: 'socioeconomic', title: 'Economy', icon: Wallet },
  { id: 'risk', title: 'Risk', icon: AlertTriangle },
];

const WONG_BAKER_FACES = [
  { score: 0, label: 'No Hurt', emoji: '😊' },
  { score: 2, label: 'Hurts Little Bit', emoji: '🙂' },
  { score: 4, label: 'Hurts Little More', emoji: '😐' },
  { score: 6, label: 'Hurts Even More', emoji: '😟' },
  { score: 8, label: 'Hurts Whole Lot', emoji: '😰' },
  { score: 10, label: 'Hurts Worst', emoji: '😭' },
];

const ESAS_SYMPTOMS = [
  'Pain', 'Tiredness', 'Drowsiness', 'Nausea', 'Lack of Appetite', 
  'Shortness of Breath', 'Depression', 'Anxiety', 'Well-being'
];

// --- Components ---

const StepIndicator = ({ currentStep, steps }) => (
  <div className="hidden md:flex flex-col w-64 bg-slate-50 border-r border-slate-200 p-6 space-y-2">
    <div className="mb-8">
      <h1 className="text-xl font-bold text-teal-700 leading-tight">Ruma Abedona Hospice</h1>
      <p className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Care & Palliative Care</p>
    </div>
    {steps.map((step, index) => {
      const Icon = step.icon;
      const isActive = index === currentStep;
      const isCompleted = index < currentStep;
      return (
        <div 
          key={step.id} 
          className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
            isActive ? 'bg-teal-100 text-teal-800 shadow-sm' : 'text-slate-500'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            isActive ? 'border-teal-600 bg-teal-600 text-white' : 
            isCompleted ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300'
          }`}>
            {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
          </div>
          <span className={`text-sm font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
            {step.title}
          </span>
        </div>
      );
    })}
  </div>
);

const SectionHeader = ({ title, description }) => (
  <div className="mb-6 border-b border-slate-100 pb-4">
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
  </div>
);

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required = false }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700 flex items-center">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
    />
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Consent
    consented: false,
    admissionDate: new Date().toISOString().split('T')[0],
    
    // Basic Info
    patientName: '',
    regNo: '',
    age: '',
    gender: 'Male',
    diagnosis: '',
    referredBy: '',
    aadhaar: '',
    phone: '',
    address: '',
    
    // Clinical
    painScale: 0,
    symptoms: [],
    diet: 'Veg',
    pastHistory: '',
    
    // Vitals
    pulse: '',
    bp: '',
    rr: '',
    temp: '',
    weight: '',
    mobility: '1',
    
    // Psychosocial
    caregiverName: '',
    caregiverRelation: '',
    insightPatient: '1',
    insightCaregiver: '1',
    
    // ESAS
    esas: ESAS_SYMPTOMS.reduce((acc, s) => ({ ...acc, [s]: 0 }), {}),
    
    // Socioeconomic
    monthlyIncome: '',
    education: '1',
    occupation: '1'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'consent':
        return (
          <div className="space-y-6">
            <SectionHeader title="Admission Consent" description="Patient Admission Certificate & Terms" />
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl space-y-4">
              <h3 className="font-bold text-amber-900">Bengali Language Consent Summary</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                আমি বুঝি যে, হসপিস প্রোগ্রাম ব্যথা সহ শারীরিক উপসর্গের উপশমের উপর জোর দেয়... (I understand that the hospice program emphasizes relief of physical symptoms including pain. I understand the nature of hospice care is palliative, for comfort, but not curative.)
              </p>
              <div className="space-y-3 pt-4 border-t border-amber-200">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="consented" 
                    checked={formData.consented} 
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-amber-400 text-teal-600 focus:ring-teal-500" 
                  />
                  <span className="text-sm font-medium text-amber-900">
                    I unconditionally accept the terms of Ruma Abedona Hospice as described in the official documentation.
                  </span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
              <InputField label="Bed Number" name="bedNumber" placeholder="Ex: 402-A" value={formData.bedNumber} onChange={handleChange} />
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-6">
            <SectionHeader title="Patient Information" description="Primary identification and contact details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="patientName" value={formData.patientName} onChange={handleChange} required />
              <InputField label="Registration No. (OP/IP)" name="regNo" value={formData.regNo} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <InputField label="Aadhaar / PAN No." name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
              <InputField label="E-mail ID" name="email" value={formData.email} onChange={handleChange} />
              <div className="md:col-span-2">
                <InputField label="Primary Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="e.g., Stage IV Lung Carcinoma" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Detailed Address</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  className="w-full mt-1 px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none h-24"
                />
              </div>
            </div>
          </div>
        );

      case 'clinical':
        return (
          <div className="space-y-8">
            <SectionHeader title="Pain & Symptom Evaluation" description="Subjective assessment of physical distress" />
            
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-800 flex items-center">
                <BrainCircuit className="mr-2 text-teal-600" /> Wong-Baker FACES Pain Scale
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {WONG_BAKER_FACES.map((face) => (
                  <button
                    key={face.score}
                    onClick={() => setFormData({...formData, painScale: face.score})}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      formData.painScale === face.score 
                      ? 'bg-teal-50 border-teal-500 scale-105 shadow-md' 
                      : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-4xl mb-2">{face.emoji}</span>
                    <span className="text-xs font-bold text-slate-800">{face.score}</span>
                    <span className="text-[10px] text-slate-500 text-center leading-tight">{face.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-700 border-l-4 border-teal-500 pl-3">Symptom Checklist</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Delirium', 'Nausea', 'Cough', 'Swelling', 'Vomiting', 'Constipation', 'Breathlessness', 'Heartburn', 'Weight Loss'].map(symp => (
                    <label key={symp} className="flex items-center space-x-2 text-sm p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <input type="checkbox" className="rounded text-teal-600" />
                      <span>{symp}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200">
                <span className="text-slate-400 text-sm mb-4">Pain Body Map (Digital Annotation)</span>
                <div className="w-48 h-64 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                   {/* Mock SVG Body Outline */}
                   <svg viewBox="0 0 100 200" className="w-full h-full opacity-30">
                     <circle cx="50" cy="20" r="15" fill="currentColor" />
                     <path d="M50 35 L50 120 M50 50 L20 100 M50 50 L80 100 M50 120 L30 180 M50 120 L70 180" stroke="currentColor" strokeWidth="4" />
                   </svg>
                   <p className="absolute text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/80 px-2 py-1">Tap to Mark Area</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-6">
            <SectionHeader title="Vital Signs & Mobility" description="Quantitative clinical measurements" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                <InputField label="Pulse (min)" name="pulse" value={formData.pulse} onChange={handleChange} placeholder="72" />
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <InputField label="BP (mmHg)" name="bp" value={formData.bp} onChange={handleChange} placeholder="120/80" />
              </div>
              <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                <InputField label="RR (/min)" name="rr" value={formData.rr} onChange={handleChange} placeholder="16" />
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <InputField label="Temp (°C/F)" name="temp" value={formData.temp} onChange={handleChange} placeholder="98.4" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center">
                <Activity className="mr-2 text-teal-600" /> Mobility Status
              </h3>
              <div className="space-y-2">
                {[
                  { id: '1', label: 'Moves Independently' },
                  { id: '2', label: 'Reduced but mobile (uses aid like walker)' },
                  { id: '3', label: 'Reduced but mobile (uses wheelchair)' },
                  { id: '4', label: 'Mainly Bed Bound or sits with support' },
                  { id: '5', label: 'Fully Bed Ridden' },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer ${
                    formData.mobility === m.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input 
                      type="radio" 
                      name="mobility" 
                      value={m.id} 
                      checked={formData.mobility === m.id} 
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="w-6 h-6 rounded-full border-2 border-current flex-shrink-0 flex items-center justify-center mr-3 font-bold text-xs">
                      {m.id}
                    </span>
                    <span className="text-sm font-medium">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'psychosocial':
        return (
          <div className="space-y-6">
            <SectionHeader title="Psychosocial & Caregiver" description="Caregiver context and illness awareness" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <InputField label="Caregiver's Name" name="caregiverName" value={formData.caregiverName} onChange={handleChange} />
              <InputField label="Relation to Patient" name="caregiverRelation" value={formData.caregiverRelation} onChange={handleChange} />
              <InputField label="Caregiver Occupation" name="caregiverJob" onChange={handleChange} />
              <InputField label="Primary Phone" name="caregiverPhone" onChange={handleChange} />
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-slate-800 mb-4">Insight on Illness (1-5 Scale)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Patient's Awareness</label>
                  <input type="range" min="1" max="5" value={formData.insightPatient} name="insightPatient" onChange={handleChange} className="w-full accent-teal-600" />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>UNAWARE</span>
                    <span>AWARE OF TRAJECTORY</span>
                    <span>FULL IMPLICATIONS</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Caregiver's Awareness</label>
                  <input type="range" min="1" max="5" value={formData.insightCaregiver} name="insightCaregiver" onChange={handleChange} className="w-full accent-teal-600" />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>UNAWARE</span>
                    <span>AWARE OF TRAJECTORY</span>
                    <span>FULL IMPLICATIONS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'socioeconomic':
        return (
          <div className="space-y-6">
            <SectionHeader title="Socio-Economic Assessment" description="Financial background and Kuppuswamy Scale" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-3 bg-teal-50 p-4 rounded-lg flex items-center space-x-3 text-teal-800">
                <Info size={20} />
                <p className="text-xs">This data helps us determine eligibility for charitable grants and support kits.</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Monthly Income</label>
                <select name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg bg-white">
                  <option value="">Select Range</option>
                  <option value="1">Below ₹2,640</option>
                  <option value="2">₹2,641 - ₹7,886</option>
                  <option value="3">₹7,887 - ₹13,160</option>
                  <option value="4">Above ₹52,734</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Education (Head of Family)</label>
                <select name="education" className="w-full px-4 py-2 border rounded-lg bg-white">
                  <option>Professional Degree</option>
                  <option>Graduate / Post Graduate</option>
                  <option>Intermediate</option>
                  <option>High School</option>
                  <option>Middle School</option>
                  <option>Primary School</option>
                  <option>Illiterate</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Ration Card Type</label>
                <select className="w-full px-4 py-2 border rounded-lg bg-white">
                  <option>BPL (Below Poverty Line)</option>
                  <option>APL (Above Poverty Line)</option>
                  <option>Antyodaya (AAY)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="font-bold text-slate-800 mb-4">Rehab Support Needs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Wheel Chair', 'Air/Water Bed', 'Walker', 'Commode Chair', 'Food Kit', 'Education Support'].map(aid => (
                  <label key={aid} className="flex items-center space-x-2 bg-white border border-slate-200 p-3 rounded-lg text-sm cursor-pointer hover:border-teal-400">
                    <input type="checkbox" className="text-teal-600 rounded" />
                    <span>{aid}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-6">
            <SectionHeader title="Risk Assessment" description="ESAS-R Scores & Critical Alarms" />
            
            <div className="bg-slate-900 text-white p-6 rounded-2xl">
              <h3 className="text-teal-400 font-bold mb-6 flex items-center uppercase tracking-widest text-xs">
                <Scale className="mr-2" size={16} /> Edmonton Symptom Assessment Scale (0-10)
              </h3>
              <div className="space-y-6">
                {ESAS_SYMPTOMS.map((symp) => (
                  <div key={symp} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-300">{symp}</span>
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        formData.esas[symp] > 7 ? 'bg-red-500 text-white' : 
                        formData.esas[symp] > 3 ? 'bg-amber-500 text-white' : 'bg-teal-500 text-white'
                      }`}>
                        {formData.esas[symp]}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      step="1"
                      value={formData.esas[symp]} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        esas: { ...formData.esas, [symp]: parseInt(e.target.value) }
                      })}
                      className="w-full accent-teal-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h4 className="text-red-800 font-bold text-sm flex items-center">
                <AlertTriangle className="mr-2" size={16} /> Clinical Risk Alerts
              </h4>
              <p className="text-red-700 text-xs mt-1">Check if any of these emergencies are observed:</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {['Airway Obstruction', 'Active Bleeding', 'Pathological Fracture', 'Convulsions/Seizures', 'Spinal Cord Compression'].map(risk => (
                  <label key={risk} className="flex items-center space-x-2 text-xs font-bold text-red-900">
                    <input type="checkbox" className="rounded border-red-300 text-red-600 focus:ring-red-500" />
                    <span>{risk}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[85vh]">
        
        {/* Left Sidebar Stepper */}
        <StepIndicator currentStep={currentStep} steps={STEPS} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Mobile Header (Hidden on MD) */}
          <div className="md:hidden p-4 bg-teal-700 text-white flex justify-between items-center">
            <h1 className="font-bold text-sm truncate">Step {currentStep + 1}: {STEPS[currentStep].title}</h1>
            <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full uppercase">RAH Hospice</span>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            {renderStepContent()}
          </div>

          {/* Footer Controls */}
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            <div className="flex space-x-3">
              <button className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl text-teal-700 font-bold hover:bg-teal-50">
                <Save size={18} />
                <span>Save Draft</span>
              </button>
              
              {currentStep === STEPS.length - 1 ? (
                <button 
                  onClick={() => alert("Form Submitted Successfully to Hospice DB")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all transform active:scale-95"
                >
                  <CheckCircle2 size={20} />
                  <span>Submit Records</span>
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentStep === 0 && !formData.consented}
                  className={`bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all transform active:scale-95 ${
                    currentStep === 0 && !formData.consented ? 'opacity-50 cursor-not-allowed grayscale' : ''
                  }`}
                >
                  <span>Continue</span>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
