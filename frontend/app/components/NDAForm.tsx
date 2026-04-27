"use client";

import { NDAFormData, Party } from "@/app/lib/ndaTypes";

interface Props {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

function PartyFields({
  label,
  party,
  onChange,
}: {
  label: string;
  party: Party;
  onChange: (p: Party) => void;
}) {
  const field = (name: keyof Party, placeholder: string) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
        {name.replace(/([A-Z])/g, " $1")}
      </label>
      <input
        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={party[name]}
        placeholder={placeholder}
        onChange={(e) => onChange({ ...party, [name]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-700">{label}</h3>
      {field("printName", "Full name")}
      {field("title", "Job title")}
      {field("company", "Company name")}
      {field("noticeAddress", "Email or postal address")}
    </div>
  );
}

export default function NDAForm({ data, onChange }: Props) {
  const set = <K extends keyof NDAFormData>(key: K, value: NDAFormData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Purpose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purpose
          <span className="text-gray-400 font-normal ml-1">
            — how Confidential Information may be used
          </span>
        </label>
        <textarea
          rows={3}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.purpose}
          onChange={(e) => set("purpose", e.target.value)}
        />
      </div>

      {/* Effective Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Effective Date
        </label>
        <input
          type="date"
          className="rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.effectiveDate}
          onChange={(e) => set("effectiveDate", e.target.value)}
        />
      </div>

      {/* MNDA Term */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          MNDA Term
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.mndaTermType === "expires"}
              onChange={() => set("mndaTermType", "expires")}
            />
            Expires after
            <input
              type="number"
              min="1"
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.mndaTermYears}
              onChange={(e) => set("mndaTermYears", e.target.value)}
              disabled={data.mndaTermType !== "expires"}
            />
            year(s) from Effective Date
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.mndaTermType === "continues"}
              onChange={() => set("mndaTermType", "continues")}
            />
            Continues until terminated
          </label>
        </div>
      </div>

      {/* Term of Confidentiality */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Term of Confidentiality
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.confidentialityTermType === "years"}
              onChange={() => set("confidentialityTermType", "years")}
            />
            <input
              type="number"
              min="1"
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.confidentialityTermYears}
              onChange={(e) => set("confidentialityTermYears", e.target.value)}
              disabled={data.confidentialityTermType !== "years"}
            />
            year(s) from Effective Date
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.confidentialityTermType === "perpetuity"}
              onChange={() => set("confidentialityTermType", "perpetuity")}
            />
            In perpetuity
          </label>
        </div>
      </div>

      {/* Governing Law */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Governing Law
          <span className="text-gray-400 font-normal ml-1">— state</span>
        </label>
        <input
          className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Delaware"
          value={data.governingLaw}
          onChange={(e) => set("governingLaw", e.target.value)}
        />
      </div>

      {/* Jurisdiction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Jurisdiction
        </label>
        <input
          className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='e.g. courts located in New Castle, DE'
          value={data.jurisdiction}
          onChange={(e) => set("jurisdiction", e.target.value)}
        />
      </div>

      {/* Modifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          MNDA Modifications
          <span className="text-gray-400 font-normal ml-1">— optional</span>
        </label>
        <textarea
          rows={2}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="List any modifications to the standard terms, or leave blank."
          value={data.modifications}
          onChange={(e) => set("modifications", e.target.value)}
        />
      </div>

      {/* Parties */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <PartyFields
          label="Party 1"
          party={data.party1}
          onChange={(p) => set("party1", p)}
        />
        <PartyFields
          label="Party 2"
          party={data.party2}
          onChange={(p) => set("party2", p)}
        />
      </div>
    </form>
  );
}
