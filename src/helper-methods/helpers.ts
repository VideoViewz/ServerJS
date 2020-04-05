import {Video} from 'src/video/entities/video.entity';

export function courseToUpper(name: string): string
{
  return name[ 0 ].toUpperCase() + name.slice(1).toLowerCase();
}


/**
 * Check if the url string is embedable (for youtube videos)
 * @param url the video info to upload
 */
export function analyzeURL(url: string)
{
  if (!url.includes('/embed/'))
  {
    let newUrl: string = '';
    if (url.includes('/watch?v='))
    {
      const urlArr = url.split('/watch?v=');
      newUrl = `https://www.youtube.com/embed/${urlArr[ 1 ]}`;
    }
    else if (url.startsWith('https://youtu.be/'))
    {
      // mobile link
      newUrl = `https://www.youtube.com/embed/${url.split('https://youtu.be/')[ 1 ]}`;
    }
    url = newUrl;
  }
  return url;
}


/**
 * Check if the video url is from youtube
 * @param url video url
 */
export function checkYoutube(url: string)
{
  const regex = /(http(?:s?):\/\/)?(?:www\.)?youtu(?:be\.com\/(watch\?v=|embed\/)|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  return regex.test(url);
}