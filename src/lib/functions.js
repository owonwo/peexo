/* eslint-disable */
export const slugify = (text) => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
  const p = new RegExp(a.split('').join('|'), 'g');


  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const logError = (err) => {
  // eslint-disable-next-line
  if (process.browser) console.error(err)
}

export const debug = (a) => {
  // eslint-disable-next-line
  debugger

  return a
}

export const trace = (info = '') => (x) => {
  // eslint-disable-next-line
  console.info(`${info}:`, x);
  return x;
};

export const log = (x, msg) => trace(msg)(x)

export const makeSlug = (name, id) => {
  if (name) {
    return `${slugify(name)}-${id}`;
  }

  return '';
};

const iterate = fn => (alloc, cur) => (alloc) + (fn ? fn(cur) : cur);
export const sumArray = (arr, fn) => arr.reduce(iterate(fn), 0);

// eslint-disable-next-line
export const filterKeys = (object = {}, keys = [], negate = false) => {
  return Object.entries(object).reduce((alloc, [key, value]) => {
    const cond = negate ? !keys.includes(key) : keys.includes(key);
    if (cond) alloc[key] = value
    return alloc
  }, {})
}

// store mutation setters
export const quickCommit = key => (store, payload) => {
  store[key] = payload
}
// converts map to object
export const mapToObject = map => [...map.entries()]
  .reduce((alloc, [key, value]) => {
    alloc[key] = value
    return alloc
  }, {})

// setting multiple mutations
export const setMutations = (arr, prefix = 'set_') => {
  if (!Array.isArray(arr)) throw Error('First paramater must be an Array')

  const commits = new Map(arr.map(key => [`${prefix}${key}`, quickCommit(key)]))
  return mapToObject(commits)
}

export const isImage = (mimeType = '') => /image\/(jpeg|png|jpg)/g.test(mimeType)
