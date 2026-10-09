window.SCULPTIFY_CONFIG = Object.freeze({
  supabaseUrl: "https://fxluchtdfpediivhoksl.supabase.co",
  supabasePublishableKey: "sb_publishable_y2OadDy1zy8QlWy-YAcdlg_uzAYMLzj"
});
window.SCULPTIFY_FUNCTION_URL = function(name){
  return window.SCULPTIFY_CONFIG.supabaseUrl.replace(/\/$/,"") + "/functions/v1/" + name;
};
