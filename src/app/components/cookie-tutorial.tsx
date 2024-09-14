import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function CookieTutorial() {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src="/static/step1.png" alt="Step 1" />
                        <p className="mt-2 text-center">Step 1: Open your browser developer tools after logging in to USIS</p>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src="/static/step2.png" alt="Step 2" />
                        <p className="mt-2 text-center">Step 2: Navigate to the `Application` tab.</p>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src="/static/step3.png" alt="Step 3" />
                        <p className="mt-2 text-center">Step 3: Find the `Cookies` section and locate `JSESSIONID` and `SRVNAME`.</p>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="mx-10" />
            <CarouselNext className="mx-10" />
        </Carousel>
    );
}
