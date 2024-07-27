import Loader from '@/components/shared/loader';

export default function Loading() {
    return (
        <div className="grid h-screen grid-cols-1 place-items-center">
            <Loader />
        </div>
    );
}
