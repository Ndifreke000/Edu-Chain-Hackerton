"use client"
import { cn } from "@/lib/utils"

interface DynamicLogoProps {
  text: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  variant?: "primary" | "secondary" | "accent" | "muted"
  seed?: number
}

export function DynamicLogo({ text, size = "md", className, variant = "primary", seed = 0 }: DynamicLogoProps) {
  // Generate a deterministic but seemingly random number based on the text and seed
  const hashCode = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash + seed
  }

  // Get a deterministic random number between min and max
  const getRandomNumber = (min: number, max: number, seed: number): number => {
    const hash = hashCode(text + seed.toString())
    return min + Math.abs(hash % (max - min))
  }

  // Generate a color based on the variant
  const getColor = (variant: string): string => {
    switch (variant) {
      case "primary":
        return "hsl(var(--primary))"
      case "secondary":
        return "hsl(var(--secondary))"
      case "accent":
        return "hsl(var(--accent))"
      case "muted":
        return "hsl(var(--muted))"
      default:
        return "hsl(var(--primary))"
    }
  }

  // Get a lighter version of the color for the background
  const getLighterColor = (variant: string): string => {
    switch (variant) {
      case "primary":
        return "hsl(var(--primary) / 0.2)"
      case "secondary":
        return "hsl(var(--secondary) / 0.2)"
      case "accent":
        return "hsl(var(--accent) / 0.2)"
      case "muted":
        return "hsl(var(--muted) / 0.2)"
      default:
        return "hsl(var(--primary) / 0.2)"
    }
  }

  // Generate shapes for the logo
  const generateShapes = () => {
    const shapes = []
    const numShapes = getRandomNumber(3, 6, 1)

    for (let i = 0; i < numShapes; i++) {
      const shapeType = getRandomNumber(0, 3, i + 2)
      const x = getRandomNumber(10, 90, i + 3)
      const y = getRandomNumber(10, 90, i + 4)
      const size = getRandomNumber(10, 30, i + 5)
      const rotation = getRandomNumber(0, 360, i + 6)
      const opacity = (getRandomNumber(3, 8, i + 7) / 10).toFixed(1)

      if (shapeType === 0) {
        // Circle
        shapes.push(<circle key={i} cx={x} cy={y} r={size / 2} fill={getColor(variant)} opacity={opacity} />)
      } else if (shapeType === 1) {
        // Rectangle
        shapes.push(
          <rect
            key={i}
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            transform={`rotate(${rotation} ${x} ${y})`}
            fill={getColor(variant)}
            opacity={opacity}
          />,
        )
      } else {
        // Triangle
        const points = `${x},${y - size / 2} ${x - size / 2},${y + size / 2} ${x + size / 2},${y + size / 2}`
        shapes.push(
          <polygon
            key={i}
            points={points}
            transform={`rotate(${rotation} ${x} ${y})`}
            fill={getColor(variant)}
            opacity={opacity}
          />,
        )
      }
    }

    return shapes
  }

  // Generate initials from the text
  const getInitials = (): string => {
    return text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  // Set size based on prop
  const sizeClass = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-xl",
  }[size]

  return (
    <div className={cn("relative flex items-center justify-center rounded-md overflow-hidden", sizeClass, className)}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ background: getLighterColor(variant) }}
      >
        {generateShapes()}
      </svg>
      <span className="relative z-10 font-bold text-foreground">{getInitials()}</span>
    </div>
  )
}

