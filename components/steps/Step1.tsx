'use client'
import React from 'react'

interface Props {
  data: {
    firstName: string
    lastName: string
    mobile: string
    alternateName: string
    alternateNumber: string
    email: string
  }
  onChange: (field: Record<string, string>) => void
  errors: Record<string, string>
}

export default function Step1({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" required error={errors.firstName}>
          <input
            className={inp(errors.firstName)}
            placeholder="First name"
            value={data.firstName}
            onChange={e => onChange({ firstName: e.target.value })}
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            className={inp(errors.lastName)}
            placeholder="Last name"
            value={data.lastName}
            onChange={e => onChange({ lastName: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Mobile Number" required error={errors.mobile}>
        <input
          className={inp(errors.mobile)}
          placeholder="10-digit mobile number"
          value={data.mobile}
          maxLength={10}
          inputMode="numeric"
          onChange={e => onChange({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Alternate Name" error={errors.alternateName}>
          <input
            className={inp(errors.alternateName)}
            placeholder="Optional"
            value={data.alternateName}
            onChange={e => onChange({ alternateName: e.target.value })}
          />
        </Field>
        <Field label="Alternate Number" error={errors.alternateNumber}>
          <input
            className={inp(errors.alternateNumber)}
            placeholder="Optional"
            value={data.alternateNumber}
            maxLength={10}
            inputMode="numeric"
            onChange={e => onChange({ alternateNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
          />
        </Field>
      </div>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          className={inp(errors.email)}
          placeholder="example@email.com"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
        />
      </Field>
    </div>
  )
}

function inp(err?: string) {
  return `w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
    err
      ? 'border-red-400 bg-red-50 focus:ring-red-100'
      : 'border-gray-200 bg-white focus:border-red-400 focus:ring-red-100'
  }`
}

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
