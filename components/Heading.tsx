import Head from "next/head";

export default function Heading() {
  return (
    <Head>
      {/* Meta */}
      <meta charSet="UTF-8" />
      <meta name="author" content="Ahmed Abu Qahf" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Resize, convert and edit your images with precision and ease!"
      />
      <meta
        name="keywords"
        content="Sharp, Image Processing, Image Converter, Image Resizer, Image Editor"
      />
      <meta name="robots" content="index, follow" />

      {/* Links */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://sharpstudio.vercel.app/" />

      {/* Open Graph */}
      <meta property="og:title" content="EditorSetup" />
      <meta
        property="og:description"
        content="Resize, convert and edit your images with precision and ease!"
      />
      <meta property="og:url" content="https://sharpstudio.vercel.app/" />
      <meta property="og:image" content="/img/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="https://sharpstudio.vercel.app/" />
      <meta name="twitter:creator" content="Ahmed Abu Qahf" />
      <meta name="twitter:title" content="SharpStudio" />
      <meta
        name="twitter:description"
        content="Resize, convert and edit your images with precision and ease!"
      />
      <meta name="twitter:image" content="/img/og-image.png" />

      {/* Title */}
      <title>SharpStudio</title>
    </Head>
  );
}
