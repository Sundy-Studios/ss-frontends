import { useState, useEffect } from "react";
import api from "../api/axios";

export interface Item {
  id: string;
  [key: string]: any;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

// Hook to get all items with pagination
export function useGetAllItems(page: number = 1, pageSize: number = 10) {
  const [data, setData] = useState<PaginatedResult<Item> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<PaginatedResult<Item>>(
        `/Basic?PageNumber=${page}&PageSize=${pageSize}`
      )
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  return { data, loading, error };
}

// Hook to get item by ID
export function useGetItemById(id: string) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<Item>(`/Basic/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { item, loading, error };
}

// Hook to create an item (requires login)
export function useCreateItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = async (payload: Partial<Item>) => {
    setLoading(true);
    try {
      const res = await api.post<Item>("/Basic", payload);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createItem, loading, error };
}

// Hook to update an item (requires login)
export function useUpdateItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateItem = async (id: string, payload: Partial<Item>) => {
    setLoading(true);
    try {
      const res = await api.put<Item>(`/Basic/${id}`, payload);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateItem, loading, error };
}

// Hook to delete an item (requires login)
export function useDeleteItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/Basic/${id}`);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error };
}
