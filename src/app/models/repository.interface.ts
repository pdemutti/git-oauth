export interface Repository {
    id: number;
    name: string;
    description: string;
    private: boolean;
    url: string;
    stargazers: number;
    watchers: number;
    language: string;
    forks: number;
    isFork: boolean;
    ownerPicture: string;
    ownerName: string;
    ownerUrl: string;
}