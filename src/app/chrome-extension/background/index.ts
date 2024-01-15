import { url } from '@base/const/url';
import {
  alertToWorld,
  crossContextConfirm,
} from '~/base/infra/chrome-extension';
import { accessTokenStorage } from '~/features/auth';
import { saveSolution } from '~/features/solution';
import { initBojSolutionCatcherFromBackground } from '~/features/solution/platforms/boj';
import { initLeetcodeSolutionCatcherFromBackground } from '~/features/solution/platforms/leetcode';
import createSolutionTracker from '~/features/solution/solution-tracker';

initBojSolutionCatcherFromBackground();
initLeetcodeSolutionCatcherFromBackground();

const solutionTracker = createSolutionTracker();
// TODO: saveSolution 내부로 넣기
solutionTracker.onSolve(async (solution) => {
  const isConfirm = await crossContextConfirm(
    'background',
    '정답입니다!🎉 풀이를 저장하시겠습니까?',
  );

  if (!isConfirm) return;

  const accessToken = await accessTokenStorage.retrieve();
  if (!accessToken) {
    alertToWorld('깃허브 계정과 연동을 진행해주세요.');
    return;
  }

  const result = await saveSolution({ solution, accessToken });
  if ('data' in result) {
    alertToWorld('성공적으로 저장했습니다.');
  } else {
    alertToWorld(result.reason);
  }
});

/* Chrome extension 아이콘 클릭시 설정 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: url.SETTING_PAGE,
  });
});

/* 설치 후 설정 페이지 탭 열기 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== 'install') return;
  chrome.tabs.create({
    url: url.SETTING_PAGE,
  });
});
