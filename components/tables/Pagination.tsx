import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Pagination({ table }: { table: Table<any> }) {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalEntries = table.getPreFilteredRowModel().rows.length;

    // Ensure default pageSize is 10
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min((pageIndex + 1) * pageSize, totalEntries);

    return (
        <div className="flex justify-between items-center w-full mt-4">
            {/* Left side: Showing X - Y entries out of Z */}
            <div className="text-sm">
                <span>
                    Showing {startIndex} - {endIndex} of {totalEntries} entries
                </span>
            </div>

            {/* Right side: Pagination controls */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8"
                >
                    {'<<'}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8"
                >
                    {'<'}
                </Button>

                <div className="flex items-center gap-2 text-xs">
                    <span>Page:</span>
                    <Input
                        className="w-12"
                        value={pageIndex + 1}
                        onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
                    />
                    <span>/{table.getPageCount()}</span>
                </div>

                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-8"
                >
                    {'>'}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-8"
                >
                    {'>>'}
                </Button>

                <select
                    value={pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="h-8 text-xs"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Pagination;
