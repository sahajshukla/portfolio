import { ImageResponse } from 'next/og';

// Tells Next.js to serve this as the favicon (replaces /favicon.ico, /icon).
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// Pull the actual Bricolage Grotesque ttf/woff binary from Google Fonts so
// the favicon uses the same display face as the site headlines.
async function getBricolageFont(): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500&display=swap',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        },
      },
    );
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Icon() {
  const fontData = await getBricolageFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: '#170E07',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D6A24A',
          fontSize: 50,
          fontWeight: 500,
          fontFamily: 'Bricolage',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          // Slight optical nudge so the S sits visually centered (the glyph
          // has a heavier upper bowl and would look top-heavy without it)
          paddingBottom: 4,
        }}
      >
        S
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: 'Bricolage',
              data: fontData,
              style: 'normal',
              weight: 500,
            },
          ]
        : undefined,
    },
  );
}
