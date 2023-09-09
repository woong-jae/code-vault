import Url from '~/shared/const/Url';

/* Chrome extension 아이콘 클릭시 세팅 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});
