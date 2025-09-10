import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Navigation, Maximize2 } from "lucide-react";
import GoogleStreetView360 from "./GoogleStreetView360";

interface TempleVR360ModalProps {
  templeName: string;
  deity: string;
  latitude: number;
  longitude: number;
  children?: React.ReactNode;
}

const TempleVR360Modal = ({ templeName, deity, latitude, longitude, children }: TempleVR360ModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <Navigation className="w-4 h-4" />
            Street View 360°
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
                {templeName} - Google Street View 360°
              </DialogTitle>
              <Badge className="bg-gradient-temple text-primary-foreground text-xs">
                {deity}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
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

        <div className="flex-1 relative overflow-hidden bg-background p-4">
          <GoogleStreetView360 
            latitude={latitude}
            longitude={longitude}
            templeName={templeName}
            deity={deity}
            height={isFullscreen ? "calc(100vh - 120px)" : "400px"}
          />

          {/* Mobile-friendly overlay instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden pointer-events-none">
            <div className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <p className="text-xs text-muted-foreground text-center">
                Use touch gestures to navigate the 360° view
              </p>
            </div>
          </div>

          {/* Desktop instructions */}
          <div className="absolute bottom-8 right-8 hidden md:block pointer-events-none">
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft max-w-xs">
              <p className="text-xs text-muted-foreground">
                Drag to look around, use scroll to zoom. Experience the temple's surroundings in 360°.
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