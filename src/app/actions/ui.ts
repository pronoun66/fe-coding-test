import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'

export namespace UiActions {
  export enum Type {
    TRACK_IN_PROCESS = 'UI_TRACK_IN_PROCESS',
    PLAYLISTS_IN_PROCESS = 'UI_PLAYLIST_IN_PROCESS',
    SEARCH_IN_PROCESS = 'UI_SEARCH_IN_PROCESS',
    ERROR = 'UI_ERROR',
  }
}

export type UiActions = Omit<typeof UiActions, 'Type'>
export const useUiActions = (dispatch: Dispatch) => {
  const {Type, ...actions} = UiActions
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as UiActions
}
