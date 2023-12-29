import Url from '@base/const/url';
import {
  alertToWorld,
  crossContextConfirm,
} from '~/base/infra/chrome-extension';
import { Solution } from '~/modules/solution';
import { initBojSolutionCatcherFromBackground } from '~/modules/solution/domain/platforms/boj';
import { initLeetcodeSolutionCatcherFromBackground } from '~/modules/solution/domain/platforms/leetcode';
import createSolutionTracker from '~/modules/solution/infra/solution-tracker';

initBojSolutionCatcherFromBackground();
initLeetcodeSolutionCatcherFromBackground();

const solutionTracker = createSolutionTracker();
// TODO: saveSolution 내부로 넣기
solutionTracker.onSolve(async (solution) => {
  const isConfirm = await crossContextConfirm(
    'background',
    '[Code-Vault]\n정답입니다!🎉 풀이를 저장하겠습니까?',
  );

  if (!isConfirm) return;

  const isSuccess = await Solution.saveSolution(solution);

  alertToWorld(isSuccess ? '성공적으로 저장했습니다' : '저장에 실패했습니다');
});

/* Chrome extension 아이콘 클릭시 설정 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});

/* 설치 후 설정 페이지 탭 열기 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== 'install') return;
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});
