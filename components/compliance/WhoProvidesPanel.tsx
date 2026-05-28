/**
 * CTA COMPLIANCE PANEL COMPONENT
 *
 * Must appear immediately above EVERY primary contact CTA block: Call/WhatsApp/Email/Form
 * Title: "Who provides the legal service"
 */

export default function WhoProvidesPanel() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 mb-6">
      <h3 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">
        Who provides the legal service
      </h3>
      <p className="text-sm text-slate-700 leading-relaxed mb-2">
        If you contact us via this website, you are contacting Robert Cashman in his capacity as a
        solicitor at Tuckers Solicitors LLP (SRA ID: 127795). Any Legal Aid or private retainer is
        with Tuckers Solicitors LLP. This website is operated by Defence Legal Services Ltd t/a
        Police Station Agent and provides general information; it does not itself provide legal
        services.
      </p>
      <p className="text-sm text-red-800 font-semibold leading-relaxed">
        We are NOT Kent Police or any police force. Instructions are accepted for people in police
        custody and scheduled voluntary (VAI) interviews at Kent stations — not general legal advice
        by telephone.
      </p>
    </div>
  );
}
