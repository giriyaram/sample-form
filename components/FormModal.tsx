'use client'
import { useEffect, useState } from 'react'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import { addLead } from '@/lib/store'

interface FormData {
  firstName: string
  lastName: string
  mobile: string
  alternateName: string
  alternateNumber: string
  email: string
  size: string
  floorSize: string
  tower: string
  facing: string
  aadharFile: File | null
  panFile: File | null
  chequeFile: File | null
}

const INITIAL: FormData = {
  firstName: '', lastName: '', mobile: '',
  alternateName: '', alternateNumber: '', email: '',
  size: '', floorSize: '', tower: '', facing: '',
  aadharFile: null, panFile: null, chequeFile: null,
}

const STEP_LABELS = ['Personal Details', 'Property Preferences', 'Documents']

export default function FormModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function update(field: Record<string, unknown>) {
    setData(prev => ({ ...prev, ...field }))
    setErrors(prev => {
      const next = { ...prev }
      Object.keys(field).forEach(k => delete next[k])
      return next
    })
  }

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!data.firstName.trim()) e.firstName = 'First name is required'
    if (!data.lastName.trim()) e.lastName = 'Last name is required'
    if (!/^\d{10}$/.test(data.mobile)) e.mobile = 'Enter a valid 10-digit number'
    if (data.alternateNumber && !/^\d{10}$/.test(data.alternateNumber))
      e.alternateNumber = 'Enter a valid 10-digit number'
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Enter a valid email address'
    return e
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (!data.size) e.size = 'Please select a unit size'
    if (!data.floorSize) e.floorSize = 'Please select a floor preference'
    if (!data.tower) e.tower = 'Please select a tower'
    if (!data.facing) e.facing = 'Please select a facing'
    return e
  }

  function validateStep3() {
    const e: Record<string, string> = {}
    if (!data.aadharFile) e.aadharFile = 'Please upload your Aadhar card'
    if (!data.panFile) e.panFile = 'Please upload your PAN card'
    if (!data.chequeFile) e.chequeFile = 'Please upload a cancelled cheque'
    return e
  }

  function handleNext() {
    const errs = step === 1 ? validateStep1() : validateStep2()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep(s => s + 1)
  }

  function handleSubmit() {
    const errs = validateStep3()
    if (Object.keys(errs).length) { setErrors(errs); return }
    addLead({
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      alternateName: data.alternateName,
      alternateNumber: data.alternateNumber,
      email: data.email,
      size: data.size,
      floorSize: data.floorSize,
      tower: data.tower,
      facing: data.facing,
      aadharFile: data.aadharFile?.name ?? '',
      panFile: data.panFile?.name ?? '',
      chequeFile: data.chequeFile?.name ?? '',
    })
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col">

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submitted!</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
              Your expression of interest has been recorded. Our team will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-5 rounded-t-2xl relative flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-red-100 text-xs font-semibold uppercase tracking-widest mb-0.5">
                Step {step} of 3
              </p>
              <h2 className="text-white font-bold text-lg">{STEP_LABELS[step - 1]}</h2>

              {/* Step dots + progress */}
              <div className="flex items-center gap-2 mt-3">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                      s < step ? 'bg-white text-red-600' :
                      s === step ? 'bg-white text-red-600 ring-2 ring-white/40' :
                      'bg-white/25 text-white/60'
                    }`}>
                      {s < step ? '✓' : s}
                    </div>
                    {s < 3 && (
                      <div className={`h-0.5 flex-1 rounded-full transition-all ${s < step ? 'bg-white' : 'bg-white/25'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body — scrollable */}
            <div className="p-5 overflow-y-auto flex-1">
              {step === 1 && <Step1 data={data} onChange={update} errors={errors} />}
              {step === 2 && <Step2 data={data} onChange={update} errors={errors} />}
              {step === 3 && <Step3 data={data} onChange={update} errors={errors} />}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex gap-3 flex-shrink-0 border-t border-gray-100 pt-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Submit Application
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
