import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'


async function getCoins() {
  const headersInstance = headers()

  // Forward the authorization header
  const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '07be9ded-0c97-43bc-89e0-1792a21ab5a0',
    },
  })
  return res.json()
}

async function getCoinMeta() {
  const headersInstance = headers()

  // Forward the authorization header
  const res = await fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info', {
    headers: {
      'X-CMC_PRO_API_KEY': '07be9ded-0c97-43bc-89e0-1792a21ab5a0',
    },
  })
  return res.json()
}

export default async function UserPage() {
  const coins = await getCoins()
  const meta = await getCoinMeta()
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='container mx-auto my-5'>
      <div className='grid grid-cols-7 p-4'>
        <div className='font-bold text-lg col-span-2'>Name</div>
        <div className='font-bold text-lg'>Price</div>
        <div className='font-bold text-lg'>24h%</div>
        <div className='font-bold text-lg'>7d%</div>
        <div className='font-bold text-lg'>Market Cap</div>
        <div className='font-bold text-lg'>24h Volume</div>
      </div>
      
      {coins.data.map((coins) =>
        <Link href={`/${coins.slug}`}>
          <div className='bg-slate-800 mb-3 p-4 rounded-lg grid grid-cols-7'>
            <div className='flex items-center  col-span-2'>
              {/* <div>
                <Image
                  src={coins.iconUrl}
                  width={32}
                  height={32}
                  alt="Picture of the author"
                />
              </div> */}

              <div className='font-bold ps-3'>{coins.name}</div>
              <div className='ps-3 text-slate-500 text-sm'>{coins.symbol}</div>
            </div>

            <div>{formatter.format(coins.quote.USD.price)}</div>
            <div>
              {coins.quote.USD.percent_change_24h < 0 && <div className='text-red-500 text-sm'>{coins.quote.USD.percent_change_24h}</div>}
              {coins.quote.USD.percent_change_24h > 0 && <div className='text-green-500 text-sm'>{coins.quote.USD.percent_change_24h}</div>}
            </div>
            <div>
              {coins.quote.USD.percent_change_7d < 0 && <div className='text-red-500 text-sm'>{coins.quote.USD.percent_change_7d}</div>}
              {coins.quote.USD.percent_change_7d > 0 && <div className='text-green-500 text-sm'>{coins.quote.USD.percent_change_7d}</div>}
            </div>
            <div className='text-sm'>{formatter.format(coins.quote.USD.market_cap)}</div>
            <div className='text-sm'>{formatter.format(coins.quote.USD.volume_24h)}</div>
          </div>
        </Link>

      )}
    </div>
  )

}