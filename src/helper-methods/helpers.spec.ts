import { courseToUpper } from './helpers';

describe('Helper function tests', () => {
  it('should upper case first letter and lower case the rest', () => {
    expect(courseToUpper('sHUCKI')).toEqual('Shucki');
    expect(courseToUpper('math')).toEqual('Math');
    expect(courseToUpper('Math')).toEqual('Math');
  });
});
