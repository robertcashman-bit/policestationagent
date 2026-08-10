import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary-700 rounded-xl shadow-sm hover:shadow-md",
        navy:
          "bg-primary text-white hover:bg-primary-700 rounded-xl shadow-sm hover:shadow-md",
        gold:
          "bg-gold text-[#060d1a] hover:bg-gold-hover rounded-xl shadow-sm hover:shadow-md font-bold",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 rounded-xl",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted/60 hover:border-border/80 rounded-xl",
        "outline-primary":
          "border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80 rounded-xl",
        ghost:
          "hover:bg-muted/60 text-muted-foreground hover:text-foreground rounded-xl",
        link:
          "text-primary underline-offset-4 hover:underline",
        google:
          "border border-border bg-card text-foreground hover:bg-muted/60 rounded-xl shadow-sm",
        accent:
          "bg-gold text-[#060d1a] hover:bg-gold-hover rounded-xl shadow-sm font-bold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-11 px-7 text-[0.9375rem]",
        xl: "h-13 px-8 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
