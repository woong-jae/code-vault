import Repository from '~/adapter/Repository';
import SolveProblem from '.';
import Solution from '~/entity/Solution';

const dummyRepository: Repository<{ platform: string; id: string }, Solution> =
  {
    async getItem() {
      return null;
    },
    async setItem() {
      return;
    },
  };
const solutionData = {
  id: '12345',
  code: 'console.log("hello")',
  language: 'javascript',
  platform: 'boj',
};

let solveProblem: SolveProblem;

beforeEach(() => {
  solveProblem = new SolveProblem(dummyRepository);
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('SolveProblem', () => {
  it('초기값으로 solution은 null을 가진다', () => {
    expect(solveProblem.getSolution()).toBeNull();
  });

  it('setSolution으로 solution을 생성한다', () => {
    solveProblem.setSolution(solutionData);
    const solution = solveProblem.getSolution();
    expect(solution).not.toBeNull();
    expect(solution?.id).toBe(solutionData.id);
    expect(solution?.code).toBe(solutionData.code);
    expect(solution?.language).toBe(solutionData.language);
    expect(solution?.platform).toBe(solutionData.platform);
  });

  it('solution이 존재하면 setSolution으로 저장소에 제출할 수 있다', () => {
    const spy = jest.spyOn(dummyRepository, 'setItem');

    solveProblem.submitSolution();
    expect(spy).not.toHaveBeenCalled();

    solveProblem.setSolution(solutionData);
    solveProblem.submitSolution();
    expect(spy).toHaveBeenCalled();
  });
});
