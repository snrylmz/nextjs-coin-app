import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'


async function getContent(slug) {
  const headersInstance = headers()

  // Forward the authorization header
  const res = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${slug}`, {
    headers: {
      'X-CMC_PRO_API_KEY': '07be9ded-0c97-43bc-89e0-1792a21ab5a0',
    },
  })
  return res.json()
}


export default async function Page({ params: { slug } }) {
  const post = await getContent(slug);
  
  return (
    <main className="flex min-h-screen justify-center px-4 md:px-6 lg:px-12 py-5 md:py-20 bg-slate-950">
      <p>{post.data[1].name}</p>
    </main>
  );
}