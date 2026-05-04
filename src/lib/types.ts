export type RoverPhoto = {
    id: number;
    imageid: string;
    sol: number;
    date_taken_utc: string;
    date_taken_mars: string;
    date_received: string | null;
    image_files: {
        full_res: string;
        large: string;
        small: string;
    };
    title: string | null;
    caption: string | null;
    credit: string | null;
    site: number | null;
    drive: number | null;
    attitude: string | null;
    camera: {
        id: number;
        name: string;
        full_name: string;
        rover_id: number;
    };
    camera_filter_name: string | null;
    camera_position: string | null;
    camera_vector: string | null;
    rover: {
        id: number;
        name: string;
        landing_date: string | null;
        launch_date: string | null;
        status: string;
    };
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
    id: string;
    created_at: string;
    user_id: string;
    rover_name: string;
    camera_full_name: string;
    earth_date: string;
    sol: string;
    image_source: string;
}

export type ManifestDates = {
    landingDate: Date;
    maxDate: Date;
    enabledDates: string[];
};

export type ManifestDatesCollection = {
    perseverance: ManifestDates;
    curiosity: ManifestDates;
};

export type Rover = 'perseverance' | 'curiosity'