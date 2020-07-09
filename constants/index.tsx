type Theme = {
  [key: string]: string | number;
}

enum color {
  brandColor = '#2d75ff',
  brandColorTap = '#2a6ce8',
  tintColor = '#fff',
  textBaseColor = '#333B5A',
  fillColor= '#f7f8fa',
  borderColorBase='#ebedf0',
  warningColor='#fa8c16',
  successColor='#6abf47',
  errorColor='#f4333c',
  importantColor='#ff5b05',
  waitColor='#108ee9'
}
const theme:Theme = {
  color_text_base: color.textBaseColor,

  brand_primary: color.brandColor,
  brand_primary_tap: color.brandColorTap,
  brand_success: color.successColor,
  brand_warning: color.warningColor,
  brand_error: color.errorColor,
  brand_important: color.importantColor,  // 用于小红点
  brand_wait: color.brandColor,

  primary_button_fill: color.brandColor,
  primary_button_fill_tap: color.brandColorTap,

  segmented_control_color: color.brandColor,  // 同时应用于背景、文字颜色、边框色

  input_font_size: 14,

  border_color_base: color.borderColorBase,
}

const SERVICE_URL:string = 'http://common.weihuanginfo.com';

export {
  color,
  theme,
  SERVICE_URL
}
