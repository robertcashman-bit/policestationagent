export function SolicitorInstructionChecklist() {
  const items = [
    "Client full name and date of birth",
    "Police station name and location",
    "Custody record number (if in custody)",
    "DSCC reference (if allocated)",
    "Interview date and time (voluntary interviews)",
    "Brief allegation / offence summary",
    "Investigating officer name or collar number (if known)",
    "Bail or RUI status (if known)",
    "Your firm name and contact details",
  ];

  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50 p-6" aria-labelledby="instruction-checklist">
      <h2 id="instruction-checklist" className="text-lg font-bold text-slate-900 mb-3">
        What to send when instructing police station cover
      </h2>
      <p className="text-sm text-slate-700 mb-4">
        For criminal defence firms instructing freelance police station cover, include as much of the
        following as you have available:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-800">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-600">
        Urgent custody: telephone is preferred. Email and forms are not suitable for immediate
        attendance requests.
      </p>
    </section>
  );
}
