import * as React from "react"
import {cn} from "@/lib/utils"

function Table({className, ...props}: React.ComponentProps<"table">) {
    return (
        <div
            data-slot="table-container"
            className="relative w-full overflow-x-auto rounded-sm bg-card shadow-sm"
        >
            <table
                data-slot="table"
                className={cn("w-full text-sm [&_th,&_td]:last:pr-6", className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({className, ...props}: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn(
                "bg-background [&_tr]:border-b [&_tr]:border-border",
                className
            )}
            {...props}
        />
    )
}

function TableBody({className, ...props}: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    )
}

function TableRow({
                      className,
                      hover = true,
                      ...props
                  }: React.ComponentProps<"tr"> & { hover?: boolean }) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "border-b border-border",
                hover && "hover:bg-muted/10",
                className
            )}
            {...props}
        />
    )
}

function TableHead({className, ...props}: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "px-6 py-4 text-left text-foreground font-medium",
                className
            )}
            {...props}
        />
    )
}

function TableCell({className, ...props}: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn("px-6 py-4 text-foreground", className)}
            {...props}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
}
