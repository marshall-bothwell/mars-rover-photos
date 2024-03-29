export type RoverPhoto = {
        id: number,
        sol: number,
        camera: {
            id: number,
            name: string,
            rover_id: number,
            full_name: string
        },
        img_src: string,
        earth_date: string,
        rover: {
            id: number,
            name: string,
            landing_date: string,
            launch_date: string,
            status: string,
            max_sol: number,
            max_date: string,
            total_photos: number,
            cameras: {
                name: string,
                full_name: string
            }[]
        }
    };

export type RoverApiResponse = { photos: RoverPhoto[] };

export type Manifest = {
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
    max_sol: number,
    max_date: string,
    total_photos: number,
    photos: {
        sol: number,
        earth_date: string,
        total_photos: number,
        cameras: string[]
    }[]
}

export type ManifestApiResponse = {
    photo_manifest: Manifest
}

export type SavedPhoto = {
    id: string,
    created_at: string,
    user_id: string,
    rover_name: string,
    camera_full_name: string,
    earth_date: string,
    sol: string,
    image_source: string
}

export type ManifestDates = {
    disabledDays: ( 
        Date | 
        {
            from: Date;
            to: Date;
        }
    )[],
    landingDate: Date,
    maxDate: Date,
    enabledDates: string[]
}

export type ManifestDatesCollection = {
    perseverance: ManifestDates,
    curiosity: ManifestDates,
    opportunity: ManifestDates,
    spirit: ManifestDates
}

export type Rover = 'perseverance' | 'curiosity' | 'opportunity' | 'spirit'