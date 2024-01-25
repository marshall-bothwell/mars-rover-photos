import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function RoverPhotoListSkeleton() {
    const skeletonCard = (
        <Card className="w-full sm:w-2/3 lg:w-1/4 m-4 shadow">
        <CardHeader>
            <CardTitle><Skeleton className="w-full h-[24px]" /></CardTitle>
            <CardDescription className="space-y-[5px]">
                <Skeleton className="w-1/2 h-[12px]" />
                <Skeleton className="w-1/3 h-[12px]" />
                <Skeleton className="w-1/4 h-[12px]" />
            </CardDescription>
        </CardHeader>
        <CardContent className="container w-full h-full">
            <Skeleton className="w-full h-80" />
        </CardContent>
        </Card>
    )
    return (
        <div className="flex flex-col items-center w-full">
            <Skeleton className="w-2/3 h-8"/>
            <div className="flex flex-wrap justify-center w-full">
                {skeletonCard}
                {skeletonCard}
                {skeletonCard}
            </div>
        </div>
    )
}