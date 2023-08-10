export function getParamswithoutSlash(
    url: string,
    params: string,
): string | null {
  url = url.replace('#/', '/');
  return new URL(url).searchParams.get(params);
}

export const dateFormatShort: Intl.DateTimeFormatOptions = { weekday: undefined, year: 'numeric', month: 'short', day: 'numeric' };

export function GetParams(url: string, params: string): string | null {
  return new URL(url).searchParams.get(params);
}

export function IsMobileFingerprint(): boolean {
  return false;
}
export function isMobileQuick(): boolean {
  return (navigator.userAgent).includes('Android') || (navigator.userAgent).includes('iPhone');
}
export function IsMinimalWidth(): boolean {
  return window.screen.availWidth <= 992;
}

export function wordPerMinute(Text: string): number {
  const wpm: number = 225;
  const words: number = Text.trim().split(/\s+/).length;
  const time: number = Math.ceil(words / wpm);
  return time;
}

export function scrollAcction(callback: () => void) {
  let scrollPercentRounded: number = 0;
  scrollPercentRounded = Math.round((window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100);
  if (scrollPercentRounded >= 70) {
    callback();
  }
}

export function resetScroll() {
  window.scrollTo(0, 0);
}

export function timeout(delay: number) {
  return new Promise((res) => {
    setTimeout(res, delay);
    window.scrollTo(0, 0);
  });
}
// Metatag Title
export const setMetaTitle = (title: string) => {
  const el = document.querySelector('title') as HTMLTitleElement;
  el.innerText = `${title}`;
};
// Metatag Description
export const setMetaDescription = (Description: string) => {
  const el = document.querySelector('meta[name=\'description\']') as HTMLTitleElement;
  el.setAttribute('content', Description);
};
// Metatag keywords
export const setkeywordsMeta = (keywords: string[]) => {
  const el = document.querySelector('meta[name=\'keywords\']') as HTMLTitleElement;
  el.setAttribute('content', keywords.filter((element) =>
    element != '' && element !== null && element !== undefined).join(','));
};

export function disableScrolling() {
  const x = window.scrollX;
  const y = window.scrollY;
  document.body.style.overflow = 'hidden';
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

export function enableScrolling() {
  window.onscroll = function () { };
}
