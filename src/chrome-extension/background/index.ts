chrome.scripting.registerContentScripts([
  // Programmers scripts
  {
    id: 'CodeVault-programmers',
    matches: ['https://school.programmers.co.kr/learn/courses/30/lessons/*'],
    js: ['programmers.js'],
    world: 'MAIN',
  },
  // Boj scripts
  // {
  //   id: 'CodeVault-boj-world',
  //   matches: ['https://www.acmicpc.net/status*'],
  //   js: ['js/boj-world.js'],
  //   world: 'MAIN',
  // },
]);
