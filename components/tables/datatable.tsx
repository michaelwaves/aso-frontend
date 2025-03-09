"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CommandBar from "./CommandBar";
import { useState } from "react";
import Pagination from "./Pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    actionButtons?: React.FC<{ table: ReturnType<typeof useReactTable<any>> }>[];
    className?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    actionButtons,
    className
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
    });

    return (
        <div className={cn("mx-auto", className)}>
            <div className="bg-white rounded-md shadow-sm mt-2">
                {/* The CommandBar now handles the FilterPanel display */}
                <div className="rounded-md border w-full p-4">
                    <CommandBar
                        table={table}
                        data={data}
                    />

                    {actionButtons && (
                        <div className="flex flex-row w-full gap-2 py-2">
                            {actionButtons.map((ActionButton, index) => (
                                <ActionButton key={index} table={table} />
                            ))}
                        </div>
                    )}

                    <div className="overflow-x-auto h-[400px]">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
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
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </div>
                </div>
                <div>
                    <Pagination table={table} />
                </div>
            </div>
        </div>
    );
}
