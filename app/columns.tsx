"use client"
import { ColumnDef } from "@tanstack/react-table";
import SortableHeader from "@/components/tables/SortableHeader";

export interface OligoColumns {
  start: string;
  end: string;
  aso: string;
  gc: string;
  be: string;
  gggg: string;
}
export const columns: ColumnDef<OligoColumns>[] = [
  {
    accessorKey: "start",
    header: ({ column }) => <SortableHeader column={column} text="Start" />,
  },
  {
    accessorKey: "end",
    header: ({ column }) => <SortableHeader column={column} text="End" />,
  },
  {
    accessorKey: "aso",
    header: ({ column }) => <SortableHeader column={column} text="ASO" />,
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.aso.trim()}</span>,
  },
  {
    accessorKey: "gc",
    header: ({ column }) => <SortableHeader column={column} text="GC Content" />,
  },
  {
    accessorKey: "be",
    header: ({ column }) => <SortableHeader column={column} text="BE" />,
  },
  {
    accessorKey: "gggg",
    header: ({ column }) => <SortableHeader column={column} text="GGGG" />,
  },
];