'use client';

import { useEffect, useState } from 'react';
import { Days, Times } from '@/enums';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';

import { CourseInfoType } from '@/types/usisReponse.type';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CourseInfo } from '@/components/shared/features/course-info';

export default function Page() {
    const { status, data: session } = useSession();

    return (
        <div className="mt-10 flex justify-center">
            <CourseInfo />
        </div>
    );
}
