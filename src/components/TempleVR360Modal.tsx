import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, X, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface TempleVR360ModalProps {
  templeName: string;
  image360Url: string;
  deity: string;
  children?: React.ReactNode;
}

const TempleVR360Modal = ({ templeName, image360Url, deity, children }: TempleVR360ModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            360° View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className={`${
          isFullscreen 
            ? "w-screen h-screen max-w-none max-h-none m-0 rounded-none" 
            : "max-w-4xl w-full h-[80vh] max-h-[600px]"
        } p-0 bg-card`}
      >
        <DialogHeader className="p-4 pb-2 bg-card border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg font-bold text-foreground">
                {templeName} - 360° Virtual Tour
              </DialogTitle>
              <Badge className="bg-gradient-temple text-primary-foreground text-xs">
                {deity}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRotate}
                className="h-8 w-8 hover:bg-secondary"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="h-8 w-8 hover:bg-secondary"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="h-8 w-8 hover:bg-secondary"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="h-8 w-8 hover:bg-secondary"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 relative overflow-hidden bg-background">
          <div 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-temple-stone to-muted"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: "transform 0.3s ease-in-out"
            }}
          >
            <img
              src={image360Url}
              alt={`360° view of ${templeName}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-temple"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
              }}
              onError={(e) => {
                e.currentTarget.src = '/src/assets/hero-temple.jpg';
              }}
            />
          </div>

          {/* Mobile-friendly overlay instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <p className="text-xs text-muted-foreground text-center">
                Use controls above to explore the temple
              </p>
            </div>
          </div>

          {/* Desktop instructions */}
          <div className="absolute bottom-4 right-4 hidden md:block">
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft max-w-xs">
              <p className="text-xs text-muted-foreground">
                Use the controls to rotate, zoom, and explore this sacred space in detail.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-friendly bottom bar */}
        <div className="p-4 bg-card border-t md:hidden">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-1">{templeName}</p>
            <p className="text-xs text-muted-foreground">
              Sacred temple of {deity} - Virtual 360° Experience
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TempleVR360Modal;