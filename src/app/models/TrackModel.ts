/** Track model definitions **/

export interface TrackModel {
  album: {
    album_type: string
    artists: {
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }[]
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: {
      height: number
      url: string
      width: number
    }[]
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
  }
  artists: {
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: number
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: false
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}
