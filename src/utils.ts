type Attributes = {
  [key: string]: string;
};

export const _el = (tag: string, attributes: Attributes): HTMLElement => {
  const el = document.createElement(tag);

  for (const entry of Object.entries(attributes)) {
    const [key, value] = entry;
    el[key] = value;
  }

  return el;
};

export const _replaceOrAdd = (selector: string, el: HTMLElement) => {
  const target = document.querySelector(selector);

  if (target) {
    target.replaceWith(el);
    return;
  }

  document.body.append(el);
};
