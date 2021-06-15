
interface Channel {
    name: string;
    liveaudio: {
        id: number;
        statkey: string;
        url: string;
    };
    tagline: string;
    image: string;
}

interface Channels {
    copyright: string;
    channels: Channel[];
    pagination: {
        nextpage: string;
        page: number;
        size: number;
        totalhits: number;
        totalpages: number;
    }
}
