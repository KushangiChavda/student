const isValidURL = (str = '') => {
    // eslint-disable-next-line
    var pattern_1 = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    // eslint-disable-next-line
    var pattern_2 = new RegExp('((http)s?://)');
    return str.startsWith('http') && !!pattern_2.test(str);
  }

export default isValidURL;