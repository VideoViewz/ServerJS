import {courseToUpper, analyzeURL} from './helpers';

const MOBILE_LINK = "https://youtu.be/T8r3cWM4JII";
const EMBEDED_LINK = "https://www.youtube.com/embed/T8r3cWM4JII";
const REGULAR_LINK = "https://www.youtube.com/watch?v=T8r3cWM4JII";

describe('Helper function tests', () =>
{
  it('should upper case first letter and lower case the rest', () =>
  {
    expect(courseToUpper('sHUCKI')).toEqual('Shucki');
    expect(courseToUpper('math')).toEqual('Math');
    expect(courseToUpper('Math')).toEqual('Math');
  });

  it('should return an embedable link', () =>
  {
    expect(analyzeURL(REGULAR_LINK)).toEqual(EMBEDED_LINK);
    expect(analyzeURL(EMBEDED_LINK)).toEqual(EMBEDED_LINK);
    expect(analyzeURL(MOBILE_LINK)).toEqual(EMBEDED_LINK);
  });
});
