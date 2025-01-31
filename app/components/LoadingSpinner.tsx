import * as React from "react"
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: 'sm' | 'default'
}

export const LoadingSpinner = ({ size = 'default' }: LoadingSpinnerProps) => {
    return (
        <div className={cn(
          "inline-block animate-spin rounded-full border-2 border-transparent border-t-2 border-b-2",
            size === 'sm' ? "h-4 w-4" : "h-6 w-6",
          )}>
        </div>
    )
}