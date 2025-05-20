import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import React from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onEdit?: (row: TData) => void
    onDelete?: (row: TData) => void
    loading?: boolean,
    renderActions?: (row: TData) => React.ReactNode
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             onEdit,
                                             onDelete,
                                             loading,
                                             renderActions
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: {
        (row: TData): void;
        (row: TData): void;
        (arg0: any): void;
    }, row: TData) => {
        e.stopPropagation();
        action(row);
    };

    const hasActions = onEdit || onDelete || renderActions

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} hover={false}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                        {hasActions && (
                            <TableHead className='w-[200px] text-right'>
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            {hasActions && <TableCell className='w-[200px] text-right flex justify-end gap-2'>
                                {onEdit && <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => handleActionClick(e, onEdit, row.original)}
                                >
                                    Edit
                                </Button>}
                                {onDelete && (
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) => handleActionClick(e, onDelete, row.original)}
                                    >
                                        Delete
                                    </Button>
                                )}
                                {renderActions && renderActions(row.original)}
                            </TableCell>
                            }
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
