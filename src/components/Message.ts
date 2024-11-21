import { createVNode, render } from 'vue';
import Message, { type messageType } from './Message.vue';

export default function ({
  message,
  type = 'info',
  hidden = 30000,
}: {
  message: string;
  type?: messageType;
  hidden?: number;
}) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(createVNode(Message, { message, type, hidden }), container);

  if (hidden >= 0) {
    setTimeout(() => {
      render(null, container);
      container.remove();
    }, hidden);
  }
}
