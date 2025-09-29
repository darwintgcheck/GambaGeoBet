import { PublicKey } from '@solana/web3.js'
import { PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT =
  import.meta.env.VITE_RPC_ENDPOINT ?? 'https://api.mainnet-beta.solana.com'

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  'V2grJiwjs25iJYqumbHyKo5MTK7SFqZSdmoRaj8QWb9',
)

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = 'https://explorer.gamba.so'

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = 'play.gamba.so'

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.01 // 1%

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001 // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025 // 0.25%

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Just a helper function
const lp = (
  tokenMint: PublicKey | string,
  poolAuthority?: PublicKey | string,
): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority:
    poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

/**
 * Biz FAKE tokeni tamamilə sildik.
 * İndi yalnız real balans `useUserStore`-dan idarə ediləcək.
 */
export const POOLS = [
  lp('So11111111111111111111111111111111111111112'), // SOL
  lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC
]

/**
 * Default olaraq SOL seçili olur. Amma biz artıq balansı `useUserStore` ilə idarə edirik,
 * ona görə oyunlarda əsas göstərici ₾ olacaq.
 */
export const DEFAULT_POOL = POOLS[0]

/**
 * Token metadata siyahısını da təmizlədik, yalnız "₾ Lari" göstəririk.
 * Artıq FAKE yoxdur.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & { mint: PublicKey })[] = [
  {
    mint: new PublicKey('So11111111111111111111111111111111111111112'), // sadəcə placeholder
    name: 'Lari',
    symbol: '₾',
    image: '/lari.png', // öz şəkil faylını qoy
    baseWager: 1,
    decimals: 0,
    usdPrice: 0,

    // 👇 əlavə etdik ki, başlanğıc balans 200 ₾ görünsün
    balance: 200,
  },
]

/** HTML qaydaları */
export const TOS_HTML = `
  <p><b>1. ასაკობრივი შეზღუდვა:</b> უნდა იყოთ მინიმუმ 18 წლის.</p>
  <p><b>2. კანონის დაცვა:</b> ითამაშეთ პასუხისმგებლობით და კანონიერად.</p>
  <p><b>3. რისკები:</b> თამაშები შეიცავს რისკს; მოგება გარანტირებული არ არის.</p>
  <p><b>4. გარანტიის არქონა:</b> თამაშები მოწოდებულია "როგორც არის".</p>
  <p><b>5. პასუხისმგებლობის შეზღუდვა:</b> ჩვენ არ ვაგებთ პასუხს ზარალზე.</p>
  <p><b>6. ლიცენზია:</b> ეს არის სიმულაციური პლატფორმა, არა ლიცენზირებული კაზინო.</p>
  <p><b>7. სამართლიანი თამაში:</b> ყველა თამაში ტარდება გამჭვირვალედ.</p>
  <p><b>8. კონფიდენციალურობა:</b> თქვენი პირადი მონაცემები მნიშვნელოვანია ჩვენთვის.</p>
  <p><b>9. პასუხისმგებლიანი თამაში:</b> ითამაშეთ გონივრულად.</p>
`

/**
 * Token metadata avtomatik fetch əgər lazım olsa.
 */
export const TOKEN_METADATA_FETCHER = (() => {
  if (import.meta.env.VITE_HELIUS_API_KEY) {
    return makeHeliusTokenFetcher(import.meta.env.VITE_HELIUS_API_KEY, {
      dollarBaseWager: 1,
    })
  }
})()

export const ENABLE_LEADERBOARD = true
export const ENABLE_TROLLBOX = true
