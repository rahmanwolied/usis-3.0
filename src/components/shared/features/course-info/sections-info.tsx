import { Days, Times } from '@/enums';

import { SectionInfo } from '@/types/usisReponse.type';
import { cn } from '@/lib/utils';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function SectionsInfo({ sections }: { sections: SectionInfo[] }) {
    return (
        <TableBody>
            {sections.map((section, index) => (
                <TableRow key={index} className={cn({ 'bg-destructive': section.closed })}>
                    <TableCell className="text-center">{section.section}</TableCell>
                    <TableCell className="text-center">{section.days.map((day) => Days[day]).join(', ')}</TableCell>
                    <TableCell className="text-center">{Times[section.startTime[0]]}</TableCell>
                    <TableCell className="text-center">{Times[section.endTime[0]]}</TableCell>
                    <TableCell className="text-center">{section.facultyInitial}</TableCell>
                    <TableCell className="text-center">{section.roomNumber}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}
