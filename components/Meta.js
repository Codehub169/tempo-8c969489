import Head from 'next/head';

const Meta = ({
  title = 'hueneu | Where stories find their aesthetic.',
  description = 'hueneu is a graphic design studio specializing in story-first, intentional, and evocative designs. We decode stories and craft designs that speak quietly but stay with you.',
  keywords = 'graphic design, branding, packaging, social media, stationery, coffee table books, creative projects, design studio, hueneu, story-first design, intentional design, evocative design',
  ogImage = 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80', // Placeholder - replace with actual brand image
  ogUrl = 'https://hueneu.com', // Replace with actual domain
  canonicalUrl = 'https://hueneu.com', // Replace with actual domain
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="hueneu" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      {/* <meta name="twitter:site" content="@hueneu_" /> Optional: if you have a Twitter handle for the site itself */}
      
      {/* Favicons and Theme */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> {/* Create this file */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> {/* Create this file */}
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> {/* Create this file */}
      <link rel="manifest" href="/site.webmanifest" /> {/* Create this file */}
      <meta name="theme-color" content="#A3B18A" /> {/* Primary color */}
      <meta name="msapplication-TileColor" content="#DAD7CD" /> {/* Secondary color */}
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
};

export default Meta;
