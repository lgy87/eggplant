export type Theme = Partial<{
  author: string
  backColor: string
  borderColor: string
  borderColorWidth: number
  borderHeight: number
  borderWidth: number
  candidateFormat: string
  candidateTextColor: string
  commentTextColor: string
  cornerRadius: number
  dborderWidth: number
  fontFace: string
  fontPoint: number
  hilitedBackColor: string
  hilitedCandidateBackColor: string
  hilitedCandidateLabelColor: string
  hilitedCandidateTextColor: string
  hilitedCommentTextColor: string
  hilitedCornerRadius: number
  hilitedTextColor: string
  horizontal: boolean
  inlinePreedit: boolean
  labelColor: string
  labelFontPoint: number
  name: string
  textColor: string
  id: string
}>
export type PresetColorSchemes = Record<string, Theme>
export type Themes = Array<Theme>

export type Patch<T> = {
  patch: T
}
export type Style<T> = {
  style: T
}
export type StyleItem = Partial<{
  alpha: number
  lineSpacing: number
  colorScheme: string
  showNotificationsWhen:
    | "always"
    | "never"
    | "via notification center"
    | "only when growl is running"
}> &
  Theme
