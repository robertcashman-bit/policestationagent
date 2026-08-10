import { LEGAL_ADVICE_HUB_TOP_DISCLAIMER } from '@/lib/legalCopy';

export default function LegalAdviceHubDisclaimer() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
      <p className="text-gray-800 leading-relaxed">{LEGAL_ADVICE_HUB_TOP_DISCLAIMER}</p>
    </div>
  );
}
