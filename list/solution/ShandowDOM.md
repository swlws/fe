# Shadow DOM

Shadow DOM provides a way to add a separate isolated and encapsulated DOM tree to an element.

Shadow DOM provides three benefits:

- DOM scoping. DOM APIs like document.querySelector won't find elements in the component's shadow DOM, so it's harder for global scripts to accidentally break your component.
- Style scoping. You can write encapsulated styles for your shadow DOM that don't affect the rest of the DOM tree.
- Composition. The component's shadow root, which contains its internal DOM, is separate from the component's children. You can choose how children are rendered in your component's internal DOM.

# 文献

- [^] [MDN-Using shadow dom](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM)
