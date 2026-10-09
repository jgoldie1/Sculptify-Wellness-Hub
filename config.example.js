window.SCULPTIFY_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabasePublishableKey: "sb_publishable_REPLACE_WITH_HER_KEY"
});

window.SCULPTIFY_FUNCTION_URL = function(name){
  return window.SCULPTIFY_CONFIG.supabaseUrl.replace(/\/$/,"") + "/functions/v1/" + name;
};
