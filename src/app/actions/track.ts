import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'

export namespace TrackActions {
  export enum Type {
    SET = 'TRACK_ACTIONS_SET',
    ADD = 'TRACK_ACTIONS_ADD',
  }
}

export type TrackActions = Omit<typeof TrackActions, 'Type'>
export const useTrackActions = (dispatch: Dispatch) => {
  const {Type, ...actions} = TrackActions
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as TrackActions
}
