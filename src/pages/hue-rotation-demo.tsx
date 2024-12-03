import GradientRotation from "@/components/gradient-rotation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { hueRotationStore } from "@/stores/hue-rotation-store";
import { useStore } from "@nanostores/react";
import { Plus } from "lucide-react";
import { ChangeEvent, CSSProperties, useState } from "react";

const HueRotationDemo = () => {
  const { color1, color2, opacity, rotations } = useStore(hueRotationStore);
  const [imageUrl, setImageUrl] = useState("");

  const baseGradient = `linear-gradient(to right, ${color1}, ${color2})`;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const addRotation = () => {
    const lastRotation = rotations[rotations.length - 1] || 0;
    const newRotation = (lastRotation + 120) % 360;
    hueRotationStore.setKey("rotations", [...rotations, newRotation]);
  };

  const removeRotation = (index: number) => {
    hueRotationStore.setKey(
      "rotations",
      rotations.filter((_, i) => i !== index)
    );
  };

  const updateRotation = (index: number, value: number) => {
    const newRotations = [...rotations];
    newRotations[index] = value;
    hueRotationStore.setKey("rotations", newRotations);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Multiple Hue Rotations Demo</CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-6"
        style={{ "--base-gradient": baseGradient } as CSSProperties}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Color 1 (Min Value)</Label>
            <Input
              type="color"
              value={color1}
              onChange={(e) =>
                hueRotationStore.setKey("color1", e.target.value)
              }
              className="h-12 w-full"
            />
            <Input
              type="text"
              value={color1}
              onChange={(e) =>
                hueRotationStore.setKey("color1", e.target.value)
              }
              className="mt-2"
            />
          </div>
          <div>
            <Label>Color 2 (Max Value)</Label>
            <Input
              type="color"
              value={color2}
              onChange={(e) =>
                hueRotationStore.setKey("color2", e.target.value)
              }
              className="h-12 w-full"
            />
            <Input
              type="text"
              value={color2}
              onChange={(e) =>
                hueRotationStore.setKey("color2", e.target.value)
              }
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label>Opacity ({Math.round(opacity * 100)}%)</Label>
          <Slider
            value={[opacity]}
            onValueChange={([value]) =>
              hueRotationStore.setKey("opacity", value)
            }
            min={0}
            max={1}
            step={0.01}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Background Image</Label>
          <div className="flex items-center gap-4 mt-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          {rotations.map((rotation, index) => (
            <GradientRotation
              key={index}
              hueRotation={rotation}
              onRemove={() => removeRotation(index)}
              onChange={(value) => updateRotation(index, value)}
              opacity={opacity}
              imageUrl={imageUrl}
            />
          ))}
        </div>

        <Button onClick={addRotation} className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Rotation
        </Button>
      </CardContent>
    </Card>
  );
};

export default HueRotationDemo;
