interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return <div className={`toast ${visible ? 'is-visible' : ''}`}>{message}</div>;
}
