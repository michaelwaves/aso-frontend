"use client"
import { useState, useMemo } from "react"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table, Column } from "@tanstack/react-table"
import { CircleX, Filter, FilterX } from "lucide-react"

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import RangeSlider from "../RangedSlider"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MultiSelect } from "../MultiSelect"
import { Input } from "../ui/input"


interface DataTableFilterProps<TData> {
    table: Table<TData>
}

const searchableIds = ['id', 'email_address', 'surname', 'given_name']
const numericalIds = ['risk_score']
const dateIds = ['created_at', 'updated_at', 'date_of_birth', 'date_of_incorporation', "time_of_posting", "time_of_transaction"]

ChartJS.register(CategoryScale, LinearScale, BarElement);

function ColumnFilter({ column }: { column: Column<any> }) {
    const columnValues = useMemo(() => (column?.getFacetedUniqueValues ?
        Array.from(column.getFacetedUniqueValues().keys())
        : []), [column])

    // Check and convert date values
    const formattedColumnValues = useMemo<any>(() => {
        return columnValues.map((value) => {
            // Check if the value is a valid date
            const date = new Date(value);
            const isDate = typeof value === 'object' && value !== null
            return isDate
                ? { label: date.toLocaleDateString(), value } // Format date for display
                : { label: String(value), value }; // Non-date value as-is
        })
    }, [columnValues]);


    //handle date datafields
    if (dateIds.includes(column.id)) {
        const [range, setRange] = useState<number[]>([NaN, NaN]);

        const updateFilter = (index: 0 | 1, value: string) => {
            // get milliseconds since midnight 1970 UTC
            const numValue = value.trim() === "" ? NaN : new Date(value).getTime();
            if (isNaN(numValue)) return; // Ignore invalid dates

            const newRange = [...range];
            newRange[index] = numValue;
            setRange(newRange);

            // Apply filter logic
            if (!isNaN(newRange[0]) || !isNaN(newRange[1])) {
                column.setFilterValue(newRange);
            } else {
                column.setFilterValue(null); // Clear filter when both values are empty
            }
        }
        return (
            <div className="p-2">
                <p className="text-sm font-semibold mb-1">{column.id}</p>
                <div className="flex gap-2 flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="above">Above</label>
                        <Input
                            id="above"
                            type="datetime-local"
                            onChange={(e) => updateFilter(0, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="above">Below</label>
                        <Input
                            id="below"
                            type="datetime-local"
                            onChange={(e) => updateFilter(1, e.target.value)}
                        />
                    </div>
                </div>
            </div>
        );
        //handle searchable fields like id
    } else if (searchableIds.includes(column.id)) {

        return (<div className="p-2">
            <p className="text-sm font-semibold mb-1">{column.id}</p>

            <Input
                placeholder={`Search ${column.id}`}
                onChange={(e) => column?.setFilterValue(e.target.value)} // Update filter value
            ></Input>

        </div>)
    } // Handle numerical range filtering
    else if (numericalIds.includes(column.id)) {

        const updateFilter = (index: 0 | 1, value: string) => {
            const range = column.getFilterValue() as [number, number]
            const newRange = [...range]
            newRange[index] = Number(value)
            // Apply filter logic
            if (!isNaN(newRange[0]) || !isNaN(newRange[1])) {
                column.setFilterValue(newRange);
            } else {
                column.setFilterValue(null); // Clear filter when both values are empty
            }

        };

        return (
            <div className="p-2">
                <p className="text-sm font-semibold mb-1">{column.id}</p>
                <div className="flex flex-row gap-2 text-sm mt-1">
                    <div className="flex flex-col">
                        <label htmlFor="above">Above</label>
                        <Input id="above" type="number"
                            onChange={(e) => updateFilter(0, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="below">Below</label>
                        <Input id="below" type="number"
                            onChange={(e) => updateFilter(1, e.target.value)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    //else return multi select
    return (
        <div className="p-2">
            <p className="text-sm font-semibold mb-1">{column.id}</p>
            <MultiSelect
                options={formattedColumnValues}
                onValueChange={(selectedValues: string[]) => {
                    column?.setFilterValue(selectedValues)
                }} // Update filter value
            />
        </div>
    );
}

export function DataTableFilter<TData>({
    table,
}: DataTableFilterProps<TData>) {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuToggle = (open: boolean) => {
        setMenuOpen(open)
    }

    // Get columns that are filterable
    const filterableColumns = useMemo(() => {
        return table.getAllColumns().filter(column =>
            column.getCanFilter() &&
            column.getFacetedUniqueValues &&
            Array.from(column.getFacetedUniqueValues()).length > 0
        );
    }, [table]);

    const hasActiveFilters = table.getState().columnFilters.length > 0;

    return (
        <DropdownMenu open={menuOpen} onOpenChange={handleMenuToggle}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={hasActiveFilters ? "default" : "outline"}
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    {menuOpen ? <FilterX className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
                    Filters
                    {hasActiveFilters && <span className="ml-1 rounded-full bg-primary-foreground px-1 text-xs  text-gray-700 font-medium">
                        {table.getState().columnFilters.length}
                    </span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
                <DropdownMenuLabel>Choose Filters

                    {hasActiveFilters && <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => table.resetColumnFilters()}
                    >
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear <CircleX />
                    </Button>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filterableColumns.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
                        {filterableColumns.map(column => (
                            <div key={column.id} className="px-1 py-2">
                                <ColumnFilter column={column} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-2 py-2 text-sm text-muted-foreground">
                        No filterable columns available
                    </div>
                )}

            </DropdownMenuContent>
        </DropdownMenu>

    )
}