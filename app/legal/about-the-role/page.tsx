import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scale, Shield, Heart } from 'lucide-react';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'About the role',
  description:
    'What a Police Station Representative does, working in police stations, with defence solicitors, and client care responsibilities.',
  path: '/legal/about-the-role',
});

export default function AboutTheRolePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 prose-clear">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">About the role</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          What a Police Station Representative does and what the role involves in England and Wales.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6 text-primary flex-shrink-0" />
            What a Police Station Representative does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            A Police Station Representative (PSR) attends police stations to advise and assist suspects who are in custody or being interviewed. They may work under the direction of a solicitor or, once accredited, attend in their own right within the scope of the Police Station Representative Accreditation Scheme (PSRAS). The role includes explaining rights, advising on whether to answer questions, and supporting clients through the custody process.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            Working in police stations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            PSRs work in custody suites and interview rooms. They need a solid understanding of PACE (Police and Criminal Evidence Act) codes, custody procedures, disclosure, and the rights of suspects. The role often involves attending at short notice and making clear-headed decisions under pressure.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Working with defence solicitors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Many PSRs work as part of a firm or organisation. They may be supervised by solicitors and must communicate effectively with solicitors, police, and clients. Understanding the division of responsibilities and when to seek further advice is essential.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Client care and ethical duties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            PSRs owe duties of care, confidentiality, and professional conduct to clients. They must act in the client&apos;s best interests, explain matters clearly, and comply with professional and ethical standards. The SRA and the PSRAS framework set expectations for competence and conduct.
          </p>
        </CardContent>
      </Card>

      <p className="text-base text-muted-foreground border-t border-border pt-6 leading-relaxed">
        This platform provides guidance and preparation only. It does not grant accreditation. For the official accreditation process, see our{' '}
        <Link href="/legal/accreditation-process" className="text-primary hover:underline">Accreditation process</Link> page and the SRA and authorised assessment bodies.
      </p>
    </div>
  );
}
