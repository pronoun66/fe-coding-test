import { TrackModel } from '../models'

export interface PlaylistModel {
  collaborative: false
  description: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: {
    url: string
  }[]
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
  }
  public: string
  snapshot_id: string
  tracks?: {
    href: string
    items: TrackModel[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  type: string
  uri: string
}
