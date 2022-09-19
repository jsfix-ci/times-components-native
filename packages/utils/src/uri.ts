export const safeDecodeURIComponent = (encodedURI: string): string => {
  try {
    return decodeURIComponent(encodedURI);
    //return encodedURI ? decodeURIComponent(encodedURI) : ''; TODO potentially replace with this down the orad once we have caught the root cause
  } catch (e) {
    console.error('encodedURI = ' + encodedURI);
    console.error(e);
    return "";
  }
};
