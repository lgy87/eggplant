export type Theme = Partial<{
  author: string
  name: string
  back_color: string
  border_height: number
  border_width: number
  candidate_format: string
  comment_text_color: string
  corner_radius: number
  font_face: number
  font_point: number
  hilited_candidate_back_color: number
  hilited_candidate_text_color: number
  inline_preedit: boolean
  label_font_point: number
  text_color: string
}>
export type Themes = Array<Theme>
