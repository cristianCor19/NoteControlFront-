import { Check } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function ColorSelect({selectedColor, onColorSelect}){
  const colors = [
    "#FFB3B3", "#FFD9B3", "#FFFFB3", "#B3FFB3", "#B3D9FF",
    "#FFB3D9", "#FFD9B3", "#FFFFB3", "#B3FFFF", "#E0B3FF",
    "#FFE0B3", "#FFFFB3", "#E6E6FF", "#FFE6F0", "#FFD6CC",
    "#E6FFE6", "#E6FFFF", "#F2F2F2", "#F0E6FF", "#FFF0E6",
  ];

  return (
    <div className="grid grid-cols-10 gap-10 w-full">
      {colors.map((color, index) => (
        <button
          key={index}
          className={cn(
            "w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2", selectedColor === color && "ring-2 ring-blue-600 ring-offset-2"
          )}
          style={{background: color}}
          onClick={() => onColorSelect(color)}
          type="button"
        >
          {selectedColor === color && <Check className="w-4 h-4 mx-auto text-gray-700"/>}
        </button>

      ))}

    </div>
  )
}

export default ColorSelect

