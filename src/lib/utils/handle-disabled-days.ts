import { Manifest } from '@/lib/types';

export function handleDisabledDays(manifest: Manifest | undefined): {disabledDays: ({from: Date, to: Date} | Date)[], landingDate: Date, maxDate: Date} {
    let disabledDays: ({from: Date, to: Date} | Date)[] = [];
        let landingDate = new Date();
        let maxDate = new Date();
        if (manifest) {
            landingDate = new Date(manifest.landing_date+"T12:00:00")
            maxDate = new Date(manifest.max_date+"T12:00:00")
            let manifestIter = 0;

            for ( let iter = new Date(manifest.landing_date+'T12:00:00'); iter < new Date(manifest.max_date); iter.setDate(iter.getDate() + 1) ) {
                if (iter.toISOString().split('T')[0] === manifest.photos[manifestIter].earth_date) {
                    manifestIter += 1;
                } else {
                    disabledDays.unshift(new Date(iter));
                }
            }
        }
        return { disabledDays, landingDate, maxDate };
}