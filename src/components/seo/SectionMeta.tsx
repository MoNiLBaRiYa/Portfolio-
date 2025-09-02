import Head from 'next/head';

interface SectionMetaProps {
  section: string;
  title: string;
  description: string;
}

export function SectionMeta({ section, title, description }: SectionMetaProps) {
  return (
    <Head>
      <meta name={`${section}-title`} content={title} />
      <meta name={`${section}-description`} content={description} />
    </Head>
  );
}
