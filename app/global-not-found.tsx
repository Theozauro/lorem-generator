import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, follow" />
        <title>Page not found | lorem-generator.com</title>
      </head>
      <body style={{ margin: 0, background: "#f4f2ed", color: "#171717", fontFamily: "Arial, sans-serif" }}>
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "18vh 24px" }}>
          <p style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase" }}>404</p>
          <h1 style={{ fontSize: "clamp(42px, 8vw, 96px)", lineHeight: 1, margin: "24px 0" }}>Page not found.</h1>
          <Link href="/" style={{ color: "inherit" }}>← Back to generator</Link>
        </main>
      </body>
    </html>
  );
}
