/**
 * CompanySection component
 * Handles company and contact information with pincode autofill
 * Redesigned with 3-column grid layout
 */

import React, { useEffect, useRef } from 'react';
import { UseVendorBasicsReturn } from '../hooks/useVendorBasics';
import { UsePincodeLookupReturn } from '../hooks/usePincodeLookup';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

// =============================================================================
// PROPS
// =============================================================================

interface CompanySectionProps {
  vendorBasics: UseVendorBasicsReturn;
  pincodeLookup: UsePincodeLookupReturn;
  transportMode: 'road' | 'air' | 'rail' | 'ship';
  onTransportModeChange: (mode: 'road' | 'air' | 'rail' | 'ship') => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const CompanySection: React.FC<CompanySectionProps> = ({
  vendorBasics,
  pincodeLookup,
  transportMode,
  onTransportModeChange,
}) => {
  const { basics, errors, setField, validateField } = vendorBasics;
  const {
    geo,
    isLoading,
    error: geoError,
    setPincode,
    setState,
    setCity,
    isManual,
  } = pincodeLookup;

  // Ref for transport mode select element
  const transportSelectRef = useRef<HTMLSelectElement>(null);

  // Common label className with enhanced typography
  const labelClass = "block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2";

  // Common input className with enhanced styling
  const inputClass = (hasError: boolean) =>
    `mt-1 block w-full border rounded-lg shadow-sm px-4 py-3 text-sm text-slate-800 placeholder-slate-400
     focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200 bg-white
     ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`;

  // Disable non-road options on mount and whenever transportMode changes
  useEffect(() => {
    if (transportSelectRef.current) {
      Array.from(transportSelectRef.current.options).forEach((option) => {
        if (option.value !== 'road') {
          option.disabled = true;
          option.setAttribute('aria-disabled', 'true');
          option.setAttribute('tabindex', '-1');
          option.classList.add('fc-option-disabled');
        }
      });
    }
  }, [transportMode]);

  return (
    <div className="fc-form-shell bg-white rounded-xl shadow-lg border border-slate-200 p-10">
      {/* Card Header with Divider */}
      <div className="mb-8 pb-5 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <InformationCircleIcon className="w-7 h-7 text-blue-500" />
          Company Information
        </h2>
      </div>

      {/* 3-Column Grid */}
      <div className="fc-form-grid grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">

        {/* ==================== ROW 1 ==================== */}
        {/* Legal Company Name (Col 1) */}
        <div>
          <label htmlFor="legalCompanyName" className={labelClass}>
            Legal Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="legalCompanyName"
            name="legalCompanyName"
            value={basics.legalCompanyName}
            onChange={(e) => setField('legalCompanyName', e.target.value.slice(0, 60))}
            onBlur={() => validateField('legalCompanyName')}
            maxLength={60}
            className={inputClass(!!errors.legalCompanyName)}
            placeholder="Enter legal company name"
            required
          />
          {errors.legalCompanyName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.legalCompanyName}</p>
          )}
        </div>

        {/* Display Name (Col 2) */}
        <div>
          <label htmlFor="displayName" className={labelClass}>
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={basics.displayName}
            onChange={(e) => setField('displayName', e.target.value.slice(0, 30))}
            onBlur={() => validateField('displayName')}
            maxLength={30}
            className={inputClass(!!errors.displayName)}
            placeholder="Enter display name"
            required
          />
          {errors.displayName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.displayName}</p>
          )}
        </div>

        {/* Company Name (Col 3) */}
        <div>
          <label htmlFor="companyName" className={labelClass}>
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={basics.companyName}
            onChange={(e) => setField('companyName', e.target.value.slice(0, 30))}
            onBlur={() => validateField('companyName')}
            maxLength={30}
            className={inputClass(!!errors.companyName)}
            placeholder="Enter company name"
            required
          />
          {errors.companyName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.companyName}</p>
          )}
        </div>

        {/* ==================== ROW 2 ==================== */}
        {/* Sub Vendor (Col 1) */}
        <div>
          <label htmlFor="subVendor" className={labelClass}>
            Sub Vendor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subVendor"
            name="subVendor"
            value={basics.subVendor}
            onChange={(e) => setField('subVendor', e.target.value.slice(0, 20))}
            onBlur={() => validateField('subVendor')}
            maxLength={20}
            className={inputClass(!!errors.subVendor)}
            placeholder="Enter sub vendor"
            required
          />
          {errors.subVendor && (
            <p className="mt-1.5 text-xs text-red-600">{errors.subVendor}</p>
          )}
        </div>

        {/* Vendor Code (Col 2) */}
        <div>
          <label htmlFor="vendorCode" className={labelClass}>
            Vendor Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vendorCode"
            name="vendorCode"
            value={basics.vendorCode}
            onChange={(e) => {
              // Auto-uppercase and allow only alphanumeric
              const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
              setField('vendorCode', value);
            }}
            onBlur={() => validateField('vendorCode')}
            maxLength={20}
            className={inputClass(!!errors.vendorCode)}
            placeholder="Enter vendor code"
            required
          />
          {errors.vendorCode && (
            <p className="mt-1.5 text-xs text-red-600">{errors.vendorCode}</p>
          )}
        </div>

        {/* Primary Contact Name (Col 3) */}
        <div>
          <label htmlFor="primaryContactName" className={labelClass}>
            Primary Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="primaryContactName"
            name="primaryContactName"
            value={basics.primaryContactName}
            onChange={(e) => {
              // Allow only alphabets, space, hyphen, apostrophe
              const value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '').slice(0, 25);
              setField('primaryContactName', value);
            }}
            onBlur={() => validateField('primaryContactName')}
            maxLength={25}
            className={inputClass(!!errors.primaryContactName)}
            placeholder="Enter primary contact name"
            required
          />
          {errors.primaryContactName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.primaryContactName}</p>
          )}
        </div>

        {/* ==================== ROW 3 ==================== */}
        {/* Primary Contact Phone (Col 1) */}
        <div>
          <label htmlFor="primaryContactPhone" className={labelClass}>
            Primary Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="primaryContactPhone"
            name="primaryContactPhone"
            value={basics.primaryContactPhone}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setField('primaryContactPhone', value);
            }}
            onBlur={() => validateField('primaryContactPhone')}
            inputMode="numeric"
            maxLength={10}
            className={inputClass(!!errors.primaryContactPhone)}
            placeholder="10-digit phone number"
            required
          />
          {errors.primaryContactPhone && (
            <p className="mt-1.5 text-xs text-red-600">{errors.primaryContactPhone}</p>
          )}
        </div>

        {/* Primary Contact Email (Col 2) */}
        <div>
          <label htmlFor="primaryContactEmail" className={labelClass}>
            Primary Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="primaryContactEmail"
            name="primaryContactEmail"
            value={basics.primaryContactEmail}
            onChange={(e) => setField('primaryContactEmail', e.target.value)}
            onBlur={() => validateField('primaryContactEmail')}
            className={inputClass(!!errors.primaryContactEmail)}
            placeholder="email@example.com"
            required
          />
          {errors.primaryContactEmail && (
            <p className="mt-1.5 text-xs text-red-600">{errors.primaryContactEmail}</p>
          )}
        </div>

        {/* Contact Person Name (Col 3) */}
        <div>
          <label htmlFor="contactPersonName" className={labelClass}>
            Contact Person <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactPersonName"
            name="contactPersonName"
            value={basics.contactPersonName}
            onChange={(e) => {
              // Allow only alphabets, space, hyphen, apostrophe
              const value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '').slice(0, 30);
              setField('contactPersonName', value);
            }}
            onBlur={() => validateField('contactPersonName')}
            maxLength={30}
            className={inputClass(!!errors.contactPersonName)}
            placeholder="Enter contact person name"
            required
          />
          {errors.contactPersonName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.contactPersonName}</p>
          )}
        </div>

        {/* ==================== ROW 4 ==================== */}
        {/* Vendor Phone Number (Col 1) */}
        <div>
          <label htmlFor="vendorPhoneNumber" className={labelClass}>
            Vendor Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vendorPhoneNumber"
            name="vendorPhoneNumber"
            value={basics.vendorPhoneNumber}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setField('vendorPhoneNumber', value);
            }}
            onBlur={() => validateField('vendorPhoneNumber')}
            inputMode="numeric"
            maxLength={10}
            className={inputClass(!!errors.vendorPhoneNumber)}
            placeholder="10-digit phone number"
            required
          />
          {errors.vendorPhoneNumber && (
            <p className="mt-1.5 text-xs text-red-600">{errors.vendorPhoneNumber}</p>
          )}
        </div>

        {/* Vendor Email Address (Col 2) */}
        <div>
          <label htmlFor="vendorEmailAddress" className={labelClass}>
            Vendor Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="vendorEmailAddress"
            name="vendorEmailAddress"
            value={basics.vendorEmailAddress}
            onChange={(e) => setField('vendorEmailAddress', e.target.value)}
            onBlur={() => validateField('vendorEmailAddress')}
            className={inputClass(!!errors.vendorEmailAddress)}
            placeholder="email@example.com"
            required
          />
          {errors.vendorEmailAddress && (
            <p className="mt-1.5 text-xs text-red-600">{errors.vendorEmailAddress}</p>
          )}
        </div>

        {/* GST No. (Col 3) */}
        <div>
          <label htmlFor="gstin" className={labelClass}>
            GST No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="gstin"
            name="gstin"
            value={basics.gstin || ''}
            onChange={(e) => {
              // Convert to uppercase and validate character set
              const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
              setField('gstin', value);
            }}
            onBlur={() => {
              if (basics.gstin) {
                validateField('gstin');
              }
            }}
            maxLength={15}
            className={inputClass(!!errors.gstin)}
            placeholder="15-character GST number"
          />
          {errors.gstin && (
            <p className="mt-1.5 text-xs text-red-600">{errors.gstin}</p>
          )}
        </div>

        {/* ==================== ROW 5 ==================== */}
        {/* Pincode (6 digits) (Col 1) */}
        <div>
          <label htmlFor="pincode" className={labelClass}>
            Pincode (6 Digits) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={geo.pincode || ''}
              onChange={(e) => {
                // Only allow digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPincode(value);
              }}
              maxLength={6}
              className={inputClass(!!geoError)}
              placeholder="6-digit pincode"
              required
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          {geoError && (
            <p className="mt-1.5 text-xs text-orange-600">{geoError}</p>
          )}
        </div>

        {/* State (Col 2) */}
        <div>
          <label htmlFor="state" className={labelClass}>
            State <span className="text-red-500">*</span>
            {isManual && (
              <span className="text-xs text-orange-500 ml-2 normal-case">(Manual)</span>
            )}
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={geo.state || ''}
            onChange={(e) => setState(e.target.value)}
            readOnly={!isManual && !geoError}
            className={`mt-1 block w-full border rounded-lg shadow-sm px-4 py-3 text-sm text-slate-800 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200
                       ${!isManual && !geoError ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}
                       border-slate-300 focus:ring-blue-500`}
            placeholder="State (auto-filled)"
            required
          />
        </div>

        {/* City (Col 3) */}
        <div>
          <label htmlFor="city" className={labelClass}>
            City <span className="text-red-500">*</span>
            {isManual && (
              <span className="text-xs text-orange-500 ml-2 normal-case">(Manual)</span>
            )}
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={geo.city || ''}
            onChange={(e) => setCity(e.target.value)}
            readOnly={!isManual && !geoError}
            className={`mt-1 block w-full border rounded-lg shadow-sm px-4 py-3 text-sm text-slate-800 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200
                       ${!isManual && !geoError ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}
                       border-slate-300 focus:ring-blue-500`}
            placeholder="City (auto-filled)"
            required
          />
        </div>

        {/* ==================== ROW 6 ==================== */}
        {/* Address - FULL WIDTH (Span all 3 columns) */}
        <div className="md:col-span-3 fc-span-3">
          <label htmlFor="address" className={labelClass}>
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={basics.address}
            onChange={(e) => setField('address', e.target.value.slice(0, 150))}
            onBlur={() => validateField('address')}
            maxLength={150}
            rows={3}
            className={inputClass(!!errors.address)}
            placeholder="Enter complete address"
            required
          />
          {errors.address && (
            <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>
          )}
        </div>

        {/* ==================== ROW 7 ==================== */}
        {/* Service Modes (Col 1) - Placeholder for future implementation */}
        <div className="fc-vertical-stack">
          {/* Service modes checkboxes can be added here */}
        </div>

        {/* Empty Middle Column (Col 2) */}
        <div></div>

        {/* Transport Mode (Col 3) */}
        <div className="fc-transport-mode">
          <label htmlFor="transportMode" className={labelClass}>
            Transport Mode <span className="text-red-500">*</span>
          </label>
          <select
            ref={transportSelectRef}
            id="transportMode"
            name="transportMode"
            value={transportMode}
            onChange={(e) => {
              // Force selection to 'road' regardless of what user clicks
              onTransportModeChange('road');
            }}
            className={`mt-1 block w-full border rounded-lg shadow-sm px-4 py-3 text-sm text-slate-800 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200 bg-white
                       border-slate-300 focus:ring-blue-500`}
            required
          >
            <option value="road">Road</option>
            <option value="air">Air</option>
            <option value="rail">Rail</option>
            <option value="ship">Ship</option>
          </select>
        </div>
      </div>
    </div>
  );
};
