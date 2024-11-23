export async function GET() {
  try {
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=24261',
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'c6d8a486-7049-49cc-9b22-4c4ca76f2b82',
          'Accept-Encoding': 'deflate, gzip',
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch octa price', { status: 500 });
  }
}
