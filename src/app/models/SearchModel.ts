/** Search model definitions **/
import { TrackModel } from '../models'

export interface SearchModel {
  tracks?: {
    href: string
    items: TrackModel[]
    limit: number
    next?: string
    offset: number
    previous?: number
    total: number
  }
}
