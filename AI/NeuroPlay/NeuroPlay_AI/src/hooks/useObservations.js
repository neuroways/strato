import { useState, useEffect } from 'react';
import { pb } from '@/lib/pb';

export function useObservations(userId) {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    const controller = new AbortController();
    
    pb.collection('observations')
      .getList(1, 100, {
        filter: `userId.id = "${userId}"`,
        sort: '-date',
        signal: controller.signal,
      })
      .then(result => {
        setObservations(result.items);
        setLoading(false);
      })
      .catch(err => {
        if (err?.isAbort || err?.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [userId]);

  const addObservation = async (data) => {
    try {
      const newObs = await pb.collection('observations').create({
        ...data,
        userId: userId,
      });
      setObservations(prev => [newObs, ...prev]);
      return newObs;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { observations, loading, error, addObservation };
}

export function useFavorites(userId) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    const controller = new AbortController();
    
    pb.collection('favorites')
      .getList(1, 100, {
        filter: `userId.id = "${userId}"`,
        expand: 'activityId',
        signal: controller.signal,
      })
      .then(result => {
        setFavorites(result.items);
        setLoading(false);
      })
      .catch(err => {
        if (err?.isAbort || err?.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [userId]);

  const toggleFavorite = async (activityId) => {
    try {
      const existing = favorites.find(f => f.activityId === activityId);
      if (existing) {
        await pb.collection('favorites').delete(existing.id);
        setFavorites(prev => prev.filter(f => f.id !== existing.id));
      } else {
        const newFav = await pb.collection('favorites').create({
          userId: userId,
          activityId: activityId,
        });
        setFavorites(prev => [...prev, newFav]);
      }
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { favorites, loading, error, toggleFavorite };
}
