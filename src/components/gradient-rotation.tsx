import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { FC } from "react";

type GradientRotationProps = {
  hueRotation: number;
  onRemove: () => void;
  onChange: (value: number) => void;
  opacity: number;
  imageUrl: string;
};

const GradientRotation: FC<GradientRotationProps> = ({
  hueRotation,
  onRemove,
  onChange,
  opacity,
  imageUrl,
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <Label>Rotation {hueRotation}°</Label>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
    <div className="relative">
      <div
        className="absolute w-full h-2 rounded-md -top-3"
        style={{
          background:
            "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
        }}
      />
      <Slider
        value={[hueRotation]}
        onValueChange={([value]) => onChange(value)}
        min={0}
        max={360}
        step={1}
        className="mt-2"
      />
    </div>
    <div className="relative w-full h-32">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--base-gradient)",
          filter: `hue-rotate(${hueRotation}deg)`,
          opacity: opacity,
        }}
      />
    </div>
  </div>
);

export default GradientRotation;
