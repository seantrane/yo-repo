export async function yoOptionOrPrompt(prompts: any): Promise<any> {
  const isArray = Array.isArray(prompts);
  if (!isArray) prompts = [prompts];
  const filteredPrompts = [];
  const props = new Map();
  prompts.forEach((prompt) => {
    const option = this.options[prompt.name];
    if (option === undefined) {
      filteredPrompts.push(prompt);
    } else {
      props[prompt.name] = normalize(option);
    }
  });
  if (filteredPrompts.length) {
    const mergeProps = await this.prompt(filteredPrompts);
    Object.assign(props, mergeProps);
  }
  if (!isArray) return props[Object.keys(props)[0]];
  return props;
}

function normalize(option: boolean | string): boolean | string {
  if (typeof option === 'boolean') {
    return option;
  }
  if ((typeof option) === 'string') {
    const lc = option.toLowerCase();
    if (lc === 'true' || lc === 'false') {
      return lc === 'true';
    }
  }
  return option;
}

export default yoOptionOrPrompt;
