export function createRemove(dom: DocumentFragment) {
  // When the fragment gets inserted into the body, the children get
  // transferred. We need to keep the reference to the children to be able to
  // remove them
  const itemsToRemove = [...dom.children];
  return () => {
    for (const child of itemsToRemove) {
      child.remove();
    }
  };
}
