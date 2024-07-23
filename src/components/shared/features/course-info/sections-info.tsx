import { Days, Times } from '@/enums';

import { SectionInfo } from '@/types/usisReponse.type';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function SectionsInfo({ sections }: { sections: SectionInfo[] }) {
    return (
        <>
            {sections.map((section, index) => (
                <TableRow key={index} className={cn({ 'bg-destructive': section.closed })}>
                    <TableCell>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Section</TableHead>
                                    <TableCell>{section.section}</TableCell>
                                    <TableHead></TableHead>
                                    {section.days.map((day, index) => (
                                        <TableHead key={index}>{Days[day]}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Faculty</TableHead>
                                    <TableCell>{section.facultyInitial}</TableCell>
                                    <TableHead>Start</TableHead>
                                    {section.startTime.map((time, index) => (
                                        <TableCell key={index}>{Times[time]}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Room</TableHead>
                                    <TableCell>{section.roomNumber}</TableCell>
                                    <TableHead>End</TableHead>
                                    {section.endTime.map((time, index) => (
                                        <TableCell key={index}>{Times[time]}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
// {sections.map((section, index) => (
//     <TableRow key={index} className={cn({ 'bg-destructive': section.closed })}>
//         <TableCell>
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Section</TableHead>
//                         <TableCell>{section.section}</TableCell>
//                         <TableHead></TableHead>
//                         {section.days.map((day, index) => (
//                             <TableHead key={index}>{Days[day]}</TableHead>
//                         ))}
//                     </TableRow>
//                 </TableHeader>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Faculty</TableHead>
//                         <TableCell>{section.facultyInitial}</TableCell>
//                         <TableHead>Start</TableHead>
//                         {section.startTime.map((time, index) => (
//                             <TableCell key={index}>{Times[time]}</TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHeader>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Room</TableHead>
//                         <TableCell>{section.roomNumber}</TableCell>
//                         <TableHead>End</TableHead>
//                         {section.endTime.map((time, index) => (
//                             <TableCell key={index}>{Times[time]}</TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHeader>
//             </Table>
//         </TableCell>
//     </TableRow>
// ))}
