'use client';

/**
 * CONTACT FORM COMPONENT
 * 
 * Comprehensive contact form for police station representation requests.
 * Collects all essential details for case briefing.
 * GDPR compliant with consent checkbox.
 */

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  requestType: 'self' | 'client';
  clientName: string;
  clientDOB: string;
  policeStation: string;
  interviewDate: string;
  interviewTime: string;
  attendanceType: 'arrested' | 'voluntary';
  offenceSummary: string;
  contactWindow: 'now' | 'specify';
  contactWindowTime: string;
  supportNeeds: string;
  consent: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNumber: '',
    email: '',
    requestType: 'self',
    clientName: '',
    clientDOB: '',
    policeStation: '',
    interviewDate: '',
    interviewTime: '',
    attendanceType: 'voluntary',
    offenceSummary: '',
    contactWindow: 'now',
    contactWindowTime: '',
    supportNeeds: '',
    consent: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.requestType === 'client' && !formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required when requesting for a client';
    }
    if (formData.requestType === 'client' && !formData.clientDOB.trim()) {
      newErrors.clientDOB = 'Client date of birth is required';
    }
    if (!formData.policeStation.trim()) newErrors.policeStation = 'Police station is required';
    if (!formData.interviewDate.trim()) newErrors.interviewDate = 'Interview date is required';
    if (!formData.interviewTime.trim()) newErrors.interviewTime = 'Interview time is required';
    if (!formData.offenceSummary.trim()) newErrors.offenceSummary = 'Brief summary is required';
    if (formData.contactWindow === 'specify' && !formData.contactWindowTime.trim()) {
      newErrors.contactWindowTime = 'Please specify a contact time';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must consent to data storage and email communication';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          contactNumber: '',
          email: '',
          requestType: 'self',
          clientName: '',
          clientDOB: '',
          policeStation: '',
          interviewDate: '',
          interviewTime: '',
          attendanceType: 'voluntary',
          offenceSummary: '',
          contactWindow: 'now',
          contactWindowTime: '',
          supportNeeds: '',
          consent: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Request Police Station Solicitor Attendance</h2>
        
        {/* Requestor Information */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Your Contact Details</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-700 mb-1">
              Your Contact Number (Mobile Preferred) <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactNumber ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="01732 247427"
              required
            />
            {errors.contactNumber && <p className="text-red-600 text-sm mt-1">{errors.contactNumber}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Is this for <span className="text-red-600">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="requestType"
                  value="self"
                  checked={formData.requestType === 'self'}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value as 'self' | 'client' })}
                  className="mr-2"
                />
                <span>You</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="requestType"
                  value="client"
                  checked={formData.requestType === 'client'}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value as 'self' | 'client' })}
                  className="mr-2"
                />
                <span>Your client (if solicitor contacting on behalf)</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Client Information (if applicable) */}
        {formData.requestType === 'client' && (
          <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Client Information</h3>
            
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-slate-700 mb-1">
                Client Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientName ? 'border-red-500' : 'border-slate-300'
                }`}
                required={formData.requestType === 'client'}
              />
              {errors.clientName && <p className="text-red-600 text-sm mt-1">{errors.clientName}</p>}
            </div>
            
            <div>
              <label htmlFor="clientDOB" className="block text-sm font-medium text-slate-700 mb-1">
                Client Date of Birth <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="clientDOB"
                value={formData.clientDOB}
                onChange={(e) => setFormData({ ...formData, clientDOB: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientDOB ? 'border-red-500' : 'border-slate-300'
                }`}
                required={formData.requestType === 'client'}
              />
              {errors.clientDOB && <p className="text-red-600 text-sm mt-1">{errors.clientDOB}</p>}
            </div>
          </div>
        )}
        
        {/* Interview Details */}
        <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Interview Details</h3>
          
          <div>
            <label htmlFor="policeStation" className="block text-sm font-medium text-slate-700 mb-1">
              Which Police Station <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="policeStation"
              value={formData.policeStation}
              onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.policeStation ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="e.g., Medway, Maidstone, Canterbury"
              required
            />
            {errors.policeStation && <p className="text-red-600 text-sm mt-1">{errors.policeStation}</p>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="interviewDate" className="block text-sm font-medium text-slate-700 mb-1">
                Date of Interview/Appointment <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="interviewDate"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.interviewDate ? 'border-red-500' : 'border-slate-300'
                }`}
                required
              />
              {errors.interviewDate && <p className="text-red-600 text-sm mt-1">{errors.interviewDate}</p>}
            </div>
            
            <div>
              <label htmlFor="interviewTime" className="block text-sm font-medium text-slate-700 mb-1">
                Time of Interview/Appointment <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                id="interviewTime"
                value={formData.interviewTime}
                onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.interviewTime ? 'border-red-500' : 'border-slate-300'
                }`}
                required
              />
              {errors.interviewTime && <p className="text-red-600 text-sm mt-1">{errors.interviewTime}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Arrested or Voluntary Attendance <span className="text-red-600">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendanceType"
                  value="arrested"
                  checked={formData.attendanceType === 'arrested'}
                  onChange={(e) => setFormData({ ...formData, attendanceType: e.target.value as 'arrested' | 'voluntary' })}
                  className="mr-2"
                />
                <span>Arrested</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendanceType"
                  value="voluntary"
                  checked={formData.attendanceType === 'voluntary'}
                  onChange={(e) => setFormData({ ...formData, attendanceType: e.target.value as 'arrested' | 'voluntary' })}
                  className="mr-2"
                />
                <span>Voluntary Attendance</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="offenceSummary" className="block text-sm font-medium text-slate-700 mb-1">
              Brief Summary of Alleged Offence or Police Request <span className="text-red-600">*</span>
            </label>
            <textarea
              id="offenceSummary"
              value={formData.offenceSummary}
              onChange={(e) => setFormData({ ...formData, offenceSummary: e.target.value })}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.offenceSummary ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Brief description of the matter..."
              required
            />
            {errors.offenceSummary && <p className="text-red-600 text-sm mt-1">{errors.offenceSummary}</p>}
          </div>
        </div>
        
        {/* Contact Preferences */}
        <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Contact Preferences</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Best Contact Window <span className="text-red-600">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactWindow"
                  value="now"
                  checked={formData.contactWindow === 'now'}
                  onChange={(e) => setFormData({ ...formData, contactWindow: e.target.value as 'now' | 'specify' })}
                  className="mr-2"
                />
                <span>Now / As soon as possible</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactWindow"
                  value="specify"
                  checked={formData.contactWindow === 'specify'}
                  onChange={(e) => setFormData({ ...formData, contactWindow: e.target.value as 'now' | 'specify' })}
                  className="mr-2"
                />
                <span>Specify time</span>
              </label>
            </div>
            {formData.contactWindow === 'specify' && (
              <div className="mt-3">
                <input
                  type="time"
                  id="contactWindowTime"
                  value={formData.contactWindowTime}
                  onChange={(e) => setFormData({ ...formData, contactWindowTime: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactWindowTime ? 'border-red-500' : 'border-slate-300'
                  }`}
                  required={formData.contactWindow === 'specify'}
                />
                {errors.contactWindowTime && <p className="text-red-600 text-sm mt-1">{errors.contactWindowTime}</p>}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="supportNeeds" className="block text-sm font-medium text-slate-700 mb-1">
              Any Vulnerability or Support Requirements
            </label>
            <textarea
              id="supportNeeds"
              value={formData.supportNeeds}
              onChange={(e) => setFormData({ ...formData, supportNeeds: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., interpreter needed, disability support, mental health considerations"
            />
            <p className="text-xs text-slate-500 mt-1">Optional: Please specify any support needs such as interpreter, disability accommodations, or mental health considerations.</p>
          </div>
        </div>
        
        {/* Consent */}
        <div className="border-t border-slate-200 pt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 mr-3"
              required
            />
            <span className="text-sm text-slate-700">
              I consent to the storage and secure email communication of the information provided above. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.consent && <p className="text-red-600 text-sm mt-1">{errors.consent}</p>}
        </div>
        
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Thank you! Your request has been submitted successfully. We will contact you shortly.</p>
            <p className="text-green-700 text-sm mt-2">For urgent matters, please also call 01732 247427 immediately.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">There was an error submitting your request. Please try again or call 01732 247427 immediately.</p>
          </div>
        )}
      </div>
    </form>
  );
}

