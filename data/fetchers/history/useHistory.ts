import { useState, useEffect } from "react";
import useSWR from 'swr';

export interface History {
    source_id: string;
    track: string;
    artist: string;
    format: string;
    url: string;
    thumb: string;
    created_at: Date;
}

export default function useHistory() {
    const [loading, setLoading] = useState(true);
    const { data: history, mutate: mutateHistory } = useSWR<History[]>('/api/history',
        {
            revalidateOnMount: true
        });

    useEffect(() => {
        if (typeof history === 'undefined' && !loading) {
            setLoading(true);
        } else if (loading && history) {
            setLoading(false);
        }

        if (!history && typeof history === 'undefined') {
            mutateHistory();
        }

    }, [history, loading, mutateHistory])

    return { history, loading, mutateHistory }
}