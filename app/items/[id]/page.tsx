"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Button, Typography, Stack } from "@mui/material";

import { useAuth } from "@/firebase/auth";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { useDeleteItem, useGetItemById } from "@/hooks/useCrud";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const { item, loading, error } = useGetItemById(id);
  const { deleteItem } = useDeleteItem();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!item) {
    return <EmptyState message="Item not found" />;
  }

  const handleDelete = async () => {
    await deleteItem(id);
    router.replace("/items");
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4">{item.name}</Typography>

        <Typography color="text.secondary">
          Location, {item.location}
        </Typography>

        <Typography>
          Date, {new Date(item.date).toLocaleDateString()}
        </Typography>

        {user && (
          <Box>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Item
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
}
