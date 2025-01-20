function conditionalItem<T>(condition: boolean, item: T): T[] {
  return condition ? [item] : [];
}

export default conditionalItem;
