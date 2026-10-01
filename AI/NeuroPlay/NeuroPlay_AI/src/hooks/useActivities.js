import { useState, useEffect } from 'react';
import { pb } from '@/lib/pb';

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    pb.collection('activities')
      .getList(1, 50, {
        sort: '-created',
        signal: controller.signal,
      })
      .then(result => {
        setActivities(result.items);
        setLoading(false);
      })
      .catch(err => {
        if (err?.isAbort || err?.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { activities, loading, error };
}

export function useActivity(id) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const controller = new AbortController();
    
    pb.collection('activities')
      .getOne(id, { signal: controller.signal })
      .then(record => {
        setActivity(record);
        setLoading(false);
      })
      .catch(err => {
        if (err?.isAbort || err?.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { activity, loading, error };
}
