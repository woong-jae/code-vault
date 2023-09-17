import type { ProgrammingLanguage } from '../types';

const parseBojLanguage = (langNum: string): ProgrammingLanguage => {
  switch (langNum) {
    case '0':
      return 'c';
    case '84':
      return 'cpp';
    // case '86':
    //   return 'csharp';
    case '17':
      return 'javascript';
    case '28':
    case '73':
      return 'python';
    case '93':
      return 'java';
    case '69':
      return 'kotlin';
    // case '12':
    //   return 'go';
    // case '68':
    //   return 'ruby';
    // case '74':
    //   return 'swift';
    // case '94':
    //   return 'rust';
    default:
      return 'unknown';
  }
};

export default parseBojLanguage;
