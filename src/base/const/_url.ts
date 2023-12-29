const SETTING_PAGE = `chrome-extension://${chrome.runtime.id}/setting.html`;

export const url = {
  SETTING_PAGE,
  GITHUB_OAUTH_CODE: `https://github.com/login/oauth/authorize?client_id=e1f73f73ee1f2865bcd5&scope=user,repo&redirect_uri=${SETTING_PAGE}`,
};
