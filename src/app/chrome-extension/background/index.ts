import { initBojSolutionEventEmitterFromBackground } from '~/features/solution/core/createSolutionEventEmitter';
import createSolutionTracker from '~/features/solution/core/createSolutionTracker';
import saveSolution from '~/features/solution/core/saveSolution';
import Url from '~/shared/const/Url';
import {
  alertToWorld,
  crossContextConfirm,
} from '~/shared/infrastructure/chrome-extension';

initBojSolutionEventEmitterFromBackground();

const solutionTracker = createSolutionTracker();
// TODO: saveSolution 내부로 넣기
solutionTracker.onSolve(async solution => {
  const isConfirm = await crossContextConfirm(
    'background',
    '[Code-Vault]\n정답입니다!🎉 풀이를 저장하겠습니까?',
  );
  if (!isConfirm) return;

  const isSuccess = await saveSolution(solution);

  alertToWorld(isSuccess ? '성공적으로 저장했습니다' : '저장에 실패했습니다');
});

/* Chrome extension 아이콘 클릭시 설정 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});

/* 설치 후 설정 페이지 탭 열기 */
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason !== 'install') return;
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});
