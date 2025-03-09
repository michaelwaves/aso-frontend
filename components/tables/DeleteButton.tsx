"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useReactTable } from "@tanstack/react-table";
//import { toast } from "@/hooks/use-toast";

export default function DeleteButton({
    table, databaseTableName, deleteManyHandler
}: {
    table: ReturnType<typeof useReactTable<any>>,
    databaseTableName: string,
    deleteManyHandler: (ids: string[]) => any
}) {

    const selectedRowIDs = table.getFilteredSelectedRowModel().rows.map((r) => r.original.id);

    const handleDeleteRowIds = async () => {
        try {
            const res = await deleteManyHandler(selectedRowIDs)
            /*  toast({
                 title: `Successfully deleted ${databaseTableName}`
             }) */
        } catch (e) {
            console.error(e)
            /*  toast({
                 title: `Error deleting ${databaseTableName}`
             }) */
        }
    }

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "destructive" })}>

                <span>Delete</span>


            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {databaseTableName}</DialogTitle>
                    <DialogDescription>
                        Are you sure you wish to delete the following {databaseTableName}?

                        <span className="pt-4 flex flex-col gap-2">
                            {selectedRowIDs.map(id => <strong key={id}>{id}</strong>)}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="default" type="button">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={() => handleDeleteRowIds()}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
