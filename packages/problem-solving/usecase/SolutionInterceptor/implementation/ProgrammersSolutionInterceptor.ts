import SolutionInterceptor from '..';
import { InterceptListener } from '../types';

export default class ProgrammersSolutionInterceptor
  implements SolutionInterceptor
{
  onIntercept(callback: InterceptListener): void {
    throw new Error('Method not implemented.');
  }
}
