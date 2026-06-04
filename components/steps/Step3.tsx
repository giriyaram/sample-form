'use client'
import { useRef } from 'react'

interface Props {
  data: { aadharFile: File | null; panFile: File | null; chequeFile: File | null }
  onChange: (field: Record<string, File | null>) => void
  errors: Record<string, string>
}

export default function Step3({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400 -mt-1 mb-1">All file types accepted (PDF, JPG, PNG, etc.)</p>

      <UploadField
        label="Aadhar Card"
        icon="🪪"
        file={data.aadharFile}
        error={errors.aadharFile}
        onFile={f => onChange({ aadharFile: f })}
      />
      <UploadField
        label="PAN Card"
        icon="💳"
        file={data.panFile}
        error={errors.panFile}
        onFile={f => onChange({ panFile: f })}
      />
      <UploadField
        label="Cancelled Cheque"
        icon="🏦"
        file={data.chequeFile}
        error={errors.chequeFile}
        onFile={f => onChange({ chequeFile: f })}
      />
    </div>
  )
}

function UploadField({
  label, icon, file, error, onFile,
}: {
  label: string
  icon: string
  file: File | null
  error?: string
  onFile: (f: File | null) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>

      <div
        onClick={() => ref.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3 ${
          file
            ? 'border-green-400 bg-green-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-200 hover:border-red-400 hover:bg-red-50/20'
        }`}
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>

        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="text-sm font-semibold text-green-700 truncate">✓ {file.name}</p>
              <p className="text-xs text-green-500 mt-0.5">{(file.size / 1024).toFixed(0)} KB — click to replace</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">
                Click to upload <span className="text-red-500">{label}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">All file types accepted</p>
            </>
          )}
        </div>

        {file && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onFile(null) }}
            className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 text-lg leading-none"
            title="Remove file"
          >
            ×
          </button>
        )}

        <input
          ref={ref}
          type="file"
          className="hidden"
          onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]) }}
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
