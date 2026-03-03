export interface TaskEntry {
    id: string;
    name: string;
    createdAt: Date;

    // 30 day completion tracking. Index 0 = day 1, Index 29 = day 30.
    completions: boolean[];

    // Details tracking
    hoursLogged: number;
    studyNotes: string;
    resourcesUrls: string;
}
