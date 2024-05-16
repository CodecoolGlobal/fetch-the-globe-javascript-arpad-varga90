export const _el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Partial<HTMLElementTagNameMap[K]> = {}
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(tag);

  for (const entry of Object.entries(attributes)) {
    const [key, value] = entry;
    (el as any)[key] = value;
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
