import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="light">
      <Head>
        <meta name="color-scheme" content="light only" />
      </Head>
      <body className="antialiased bg-[var(--background)]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
