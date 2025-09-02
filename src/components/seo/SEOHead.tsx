import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  children?: React.ReactNode;
}

export function SEOHead({
  title = 'Monil Bariya - Computer Science Engineering Student',
  description = 'Passionate Computer Science Engineering student leveraging modern development practices and AI-assisted tools to build innovative software solutions.',
  keywords = [],
  image = 'https://monil-bariya.vercel.app/images/og-image.jpg',
  url = 'https://monil-bariya.vercel.app',
  children,
}: SEOHeadProps) {
  const allKeywords = [
    'Monil Bariya',
    'Computer Science Engineering',
    'Software Developer',
    'Web Developer',
    'Portfolio',
    ...keywords,
  ].join(', ');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Monil Bariya - Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@monilbariya28" />

      {/* Additional meta tags */}
      <meta name="author" content="Monil Bariya" />
      <meta name="creator" content="Monil Bariya" />
      <meta name="publisher" content="Monil Bariya" />
      <link rel="canonical" href={url} />

      {children}
    </Head>
  );
}
