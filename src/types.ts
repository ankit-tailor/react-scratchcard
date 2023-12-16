export type ScratchCardProps = {
  width?: number;
  height?: number;
  image?: string;
  finishPercent?: number;
  onComplete?: () => void;
  brushSize?: number;
  children?: React.ReactNode;
};
