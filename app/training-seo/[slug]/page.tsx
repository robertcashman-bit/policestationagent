import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TrainingSeoLandingView } from '@/components/TrainingSeoLandingView';
import {
  allTrainingSeoSlugs,
  getTrainingSeoLanding,
  trainingSeoMetadata,
} from '@/lib/training-seo-landings';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allTrainingSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getTrainingSeoLanding(slug);
  if (!page) return {};
  return trainingSeoMetadata(page);
}

export default async function TrainingSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getTrainingSeoLanding(slug);
  if (!page) notFound();
  return <TrainingSeoLandingView page={page} />;
}
