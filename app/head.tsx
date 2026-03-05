

interface HeadProps {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: string;
}

const Head: React.FC<HeadProps> = ({ title, description, url, image, type = 'website' }) => {
  const metaImage = image

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={metaImage} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={metaImage} />
      <link rel="canonical" href={url} />
    </>
  );
};

export default Head;
