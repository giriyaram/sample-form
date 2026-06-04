'use client'
import React from 'react'

const SIZES = ['1830', '1910', '2270', '2450']
const FLOOR_SIZES = ['0 - 10', '10 - 20', '20 - 30', '30 - 40', '40 - 50']
const TOWERS = ['Tower 1', 'Tower 2', 'Tower 3']
const FACINGS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']

interface Props {
  data: { size: string; floorSize: string; tower: string; facing: string }
  onChange: (field: Record<string, string>) => void
  errors: Record<string, string>
}

export default function Step2({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <Field label="Unit Size (sq ft)" required error={errors.size}>
        <select
          className={sel(errors.size)}
          value={data.size}
          onChange={e => onChange({ size: e.target.value })}
        >
          <option value="">Select unit size</option>
          {SIZES.map(s => <option key={s} value={s}>{s} sq ft</option>)}
        </select>
      </Field>

      <Field label="Floor Preference" required error={errors.floorSize}>
        <select
          className={sel(errors.floorSize)}
          value={data.floorSize}
          onChange={e => onChange({ floorSize: e.target.value })}
        >
          <option value="">Select floor range</option>
          {FLOOR_SIZES.map(f => <option key={f} value={f}>Floor {f}</option>)}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tower" required error={errors.tower}>
          <select
            className={sel(errors.tower)}
            value={data.tower}
            onChange={e => onChange({ tower: e.target.value })}
          >
            <option value="">Select tower</option>
            {TOWERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Facing" required error={errors.facing}>
          <select
            className={sel(errors.facing)}
            value={data.facing}
            onChange={e => onChange({ facing: e.target.value })}
          >
            <option value="">Select facing</option>
            {FACINGS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </Field>
      </div>
    </div>
  )
}

function sel(err?: string) {
  return `w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all appearance-none bg-white cursor-pointer focus:ring-2 ${
    err
      ? 'border-red-400 bg-red-50 focus:ring-red-100'
      : 'border-gray-200 focus:border-red-400 focus:ring-red-100'
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
