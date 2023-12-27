import type { Library } from '@googlemaps/js-api-loader'

export type Libraries = Library[]

export interface LoadScriptUrlOptions {
  googleMapsApiKey: string | undefined
  googleMapsClientId?: string | undefined
  version?: string | undefined
  language?: string | undefined
  region?: string | undefined
  libraries?: Libraries | undefined
  channel?: string | undefined
  mapIds?: string[] | undefined
  authReferrerPolicy?: 'origin' | undefined
  apiUrl: string
}

export function makeLoadScriptUrl({
  googleMapsApiKey,
  googleMapsClientId,
  version = 'weekly',
  apiUrl,
  language,
  region,
  libraries,
  channel,
  mapIds,
  authReferrerPolicy,
}: LoadScriptUrlOptions): string {
  const params = []

  if (googleMapsApiKey) {
    params.push(`key=${googleMapsApiKey}`)
  } else if (googleMapsClientId) {
    params.push(`client=${googleMapsClientId}`)
  }

  if (version) {
    params.push(`v=${version}`)
  }

  if (language) {
    params.push(`language=${language}`)
  }

  if (region) {
    params.push(`region=${region}`)
  }

  if (libraries && libraries.length) {
    params.push(`libraries=${libraries.sort().join(',')}`)
  }

  if (channel) {
    params.push(`channel=${channel}`)
  }

  if (mapIds && mapIds.length) {
    params.push(`map_ids=${mapIds.join(',')}`)
  }

  if (authReferrerPolicy) {
    params.push(`auth_referrer_policy=${authReferrerPolicy}`)
  }

  params.push('callback=initMap')

  return `${apiUrl}/maps/api/js?${params.join('&')}`
}
