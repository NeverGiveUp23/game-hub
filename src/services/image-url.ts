const croppedImagesUrl = (url: string) => {
  const target: string = 'media/';
  const index = url.indexOf(target) + target.length
  return url.slice(0, index) + 'crop/600/400/' + url.slice(index) ;
}

export default croppedImagesUrl;