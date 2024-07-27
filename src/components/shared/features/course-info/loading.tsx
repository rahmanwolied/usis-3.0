import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function Loading() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 7, 10];
    console.log(arr);
    return (
        <Table>
            <TableCaption>Class Schedule</TableCaption>
            {arr.map((_, index) => (
                <TableRow key={index}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={5} className="text-center">
                                    <Skeleton className="h-5 w-full"></Skeleton>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                                <TableHead>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableHead>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-5 w-full"></Skeleton>
                                                </TableCell>
                                            </TableRow>
                                        </TableHeader>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableRow>
            ))}
        </Table>
    );
}
