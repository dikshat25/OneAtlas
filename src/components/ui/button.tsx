import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white border-none hover:bg-primary-hover hover:-translate-y-[1px] active:translate-y-0",
        secondary:
          "bg-white border border-border text-primary hover:bg-secondary hover:border-[#D1D5DB]",
        outline:
          "border border-border bg-transparent hover:bg-secondary text-primary",
        ghost:
          "hover:bg-secondary hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-[22px] py-2 rounded-xl font-semibold text-[15px] gap-2",
        sm: "h-9 rounded-lg px-3 font-medium text-sm gap-1.5",
        lg: "h-14 rounded-2xl px-8 font-semibold text-base gap-2",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
