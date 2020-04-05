import {courseToUpper, analyzeURL, checkYoutube} from './helpers';

const MOBILE_LINK = "https://youtu.be/T8r3cWM4JII";
const EMBEDED_LINK = "https://www.youtube.com/embed/T8r3cWM4JII";
const REGULAR_LINK = "https://www.youtube.com/watch?v=T8r3cWM4JII";
const NOT_YOUTUBE = "https://docs.nestjs.com/recipes/swagger#multiple-specifications";

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

  it('should check if url is from youtube and point to a video', () =>
  {
    expect(checkYoutube(MOBILE_LINK)).toEqual(true);
    expect(checkYoutube(EMBEDED_LINK)).toEqual(true);
    expect(checkYoutube(REGULAR_LINK)).toEqual(true);
    expect(checkYoutube(NOT_YOUTUBE)).toEqual(false);
    expect(checkYoutube("www.youtube.com/watch?v=oaYteZ8QJsc")).toEqual(true);
    expect(checkYoutube("www.youtube.com/")).toEqual(false);
    expect(checkYoutube("youtube.com")).toEqual(false);
    expect(checkYoutube("https://youtube.com")).toEqual(false);
  });
});
