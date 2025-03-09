"use client"

import { getOligo } from "@/actions/sfold";
import { DataTable } from "@/components/tables/datatable";
/* import { getSfold } from "@/actions/sfold";
 */import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { toast } from "sonner";
import { columns } from "./columns";

export const getSfold = async (sequence: string) => {
    const url = process.env.NEXT_PUBLIC_SFOLD_LINK;

    console.log(url);

    try {
        const fullUrl = `${url}run?${new URLSearchParams({ sequence, name: "mygene" })}`;
        console.log(fullUrl);

        const res = await fetch(fullUrl, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch ZIP file: ${res.statusText}`);
        }

        // Convert response to Blob
        const blob = await res.blob();
        console.log(blob)
        const zipUrl = window.URL.createObjectURL(blob);

        // Create a temporary link and trigger download
        const link = document.createElement("a");
        link.href = zipUrl;
        link.download = "outputs.zip"; // Set filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the URL to free memory
        window.URL.revokeObjectURL(zipUrl);

        return { success: true };
    } catch (e) {
        console.error("Error fetching sfold zip file: " + e);
        throw new Error("Error downloading ZIP file");
    }
};

function GeneForm() {
    const [data, setData] = useState([])
    const form = useForm({
        defaultValues: {
            sequence: ""
        }
    })

    const onSubmit = async (formdata: any) => {
        const sequence = formdata.sequence
        try {
            const res = await getSfold(sequence)
            const d = await getOligo()
            console.log(d)
            setData(d)
            toast("got res")
        } catch (e) {
            toast("Error fetching sfold")
            console.error(e)
        }
    }
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <label htmlFor="sequence">Input Gene Sequence (min 20 bp)</label>
                <p className="font-sm text-gray-700">e.g. AGCTCAGCTAGCATCGATGCA...</p>
                <Input id="sequence"
                    {...form.register("sequence")}
                    placeholder="Input gene sequence" />
                <Button type="submit">Submit</Button>
            </form>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default GeneForm;