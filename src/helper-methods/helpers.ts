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
      newUrl = `${urlArr[ 0 ]}/embed/${urlArr[ 1 ]}`;
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