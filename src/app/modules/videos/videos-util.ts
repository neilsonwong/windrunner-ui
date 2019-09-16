const isVideoRegExp = new RegExp(/(\.(avi|mkv|ogm|mp4|flv|ogg|wmv|rm|mpeg|mpg)$)/);

export function isVideo(fileName: string) {
    return isVideoRegExp.test(fileName);
}

export function prettyName(fileName: string): string {
    return fileName.replace(/(_|\s+[-]\s+)/g, ' ').replace(/((\[[a-zA-Z0-9\- ~,\.\-&]+\]|\([a-zA-Z0-9\- ~,\.]+\))|(\.[avimkp4]+$)|v[0-9]|F?HD)/g, '').trim();
}